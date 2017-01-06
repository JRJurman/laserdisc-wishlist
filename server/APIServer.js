// APIServer.js
// Exposes a function to kick off an express server given a db client
// Created by Jesse Jurman
"use strict";

const chalk = require('chalk');
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('isomorphic-fetch');

function startExpress(dbclient, host, proof) {
  const app = express();
  app.use(bodyParser.json());

  function verifyAccess(listId, accessToken, res, callback) {
    if (!accessToken) {res.status(401).send({err:'No Access Token'}); return}
    dbclient.getUserId( listId, (err, list) => {
      if (err) {console.error(chalk.bold.red(err))}
      const listUserId = list[0];
      fetch(`https://graph.facebook.com/v2.8/me?access_token=${accessToken}&appsecret_proof=${proof(accessToken)}`)
      .then((res) => res.text())
      .then((userString) => {
        const user = JSON.parse(userString);
        if((listUserId === '') || (listUserId === user.id)) {
          callback(user.id);
        } else {
          res.status(401).send({err:'Unauthorized'});
        }
      });
    });
  }

  function getListFromDB(listId, userId, res) {
    dbclient.getList( listId, (err, list) => {
      if (err) {console.error(chalk.bold.red(err))}
      const name = list[0];
      const listUserId = list[1];
      const access = listUserId !== '' ? (listUserId === userId) : 'open';

      const laserDiscs = list.slice(2).map( ld => {
        return {
          lddbNumber: ld.split(': ')[0],
          title: ld.split(': ').slice(1).join(': '),
        };
      });

      res.send({name, access, laserDiscs});
    } );
  }

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", host);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, User, Token");
    next();
  });

  app.get('/', (req, res) => {
    res.send(`Hello! This is the API Server that connects the Static App
      TallyJacket to the Database that powers the data.`);
  });

  app.post('/newList', (req, res) => {
    dbclient.newList( listId => {
      res.send(listId);
    } );
  });

  app.get('/lists/:listId/', (req, res) => {
    getListFromDB(req.params.listId, req.header('User'), res);
  });

  app.post('/lists/:listId/rename', (req, res) => {
    verifyAccess(req.params.listId, req.header('Token'), res, () => {
      dbclient.renameList( req.params.listId, req.body.listName, (err, reply) => {
        if (err) {console.error(chalk.bold.red(err))}
        getListFromDB(req.params.listId, req.header('User'), res);
      } );
    });
  });

  app.post('/lists/:listId/connectUser', (req, res) => {
    verifyAccess(req.params.listId, req.header('Token'), res, (userId) => {
      dbclient.connectUser( req.params.listId, userId, (err, reply) => {
        if (err) {console.error(chalk.bold.red(err))}
        getListFromDB(req.params.listId, req.header('User'), res);
      } );
    });
  });

  app.post('/lists/:listId/disconnectUser', (req, res) => {
    verifyAccess(req.params.listId, req.header('Token'), res, (userId) => {
      dbclient.disconnectUser( req.params.listId, (err, reply) => {
        if (err) {console.error(chalk.bold.red(err))}
        getListFromDB(req.params.listId, req.header('User'), res);
      } );
    });
  });

  app.post('/lists/:listId/addLaserDisc', (req, res) => {
    verifyAccess(req.params.listId, req.header('Token'), res, (userId) => {
      const ldString = `${req.body.lddbNumber}: ${req.body.title}`;
      dbclient.addLaserDisc( req.params.listId, ldString, (err, reply) => {
        if (err) {console.error(chalk.bold.red(err))}
        getListFromDB(req.params.listId, req.header('User'), res);
      } );
    });
  });

  app.post('/lists/:listId/removeLaserDisc', (req, res) => {
    verifyAccess(req.params.listId, req.header('Token'), res, (userId) => {
      const ldString = `${req.body.lddbNumber}: ${req.body.title}`;
      dbclient.removeLaserDisc( req.params.listId, ldString, (err, reply) => {
        if (err) {console.error(chalk.bold.red(err))}
        getListFromDB(req.params.listId, req.header('User'), res);
      } );
    });
  });

  app.post('/lists/:listId/importLDDBList', (req, res) => {
    verifyAccess(req.params.listId, req.header('Token'), res, (userId) => {
      const ldStrings = req.body.laserDiscs.map(ld => {
        return `${ld.ID}: ${ld.Title}`;
      });

      dbclient.importLDDBList( req.params.listId, ldStrings, (err, reply) => {
        if (err) {console.error(chalk.bold.red(err))}
        getListFromDB(req.params.listId, req.header('User'), res);
      } );
    });
  });

  app.listen(8000, () => {
    console.log(chalk.bold.blue('Express Server listening on port 8000!'));
  });

  return app;
}

module.exports = {startExpress};
