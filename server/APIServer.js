// APIServer.js
// Exposes a function to kick off an express server given a db client
// Created by Jesse Jurman
"use strict";

const chalk = require('chalk');
const express = require('express');
const bodyParser = require('body-parser')

function startExpress(dbclient, host) {
  const app = express();
  app.use(bodyParser.json());

  function getListFromDB(listId, res) {
    dbclient.getList( listId, (err, list) => {
      if (err) {console.error(chalk.bold.red(err))}
      const name = list[0];

      const laserDiscs = list.slice(1).map( ld => {
        return {
          lddbNumber: ld.split(': ')[0],
          title: ld.split(': ').slice(1).join(': '),
        };
      });

      res.send({name, laserDiscs});
    } );
  }

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", host);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get('/', (req, res) => {
    res.send(`Hello! This is the API Server that connects the Static App
      MyLaserDisc to the Database that powers the data.`);
  });

  app.post('/newList', (req, res) => {
    dbclient.newList( listId => {
      res.send(listId);
    } );
  });

  app.get('/lists/:listId/', (req, res) => {
    getListFromDB(req.params.listId, res);
  });

  app.post('/lists/:listId/rename', (req, res) => {
    dbclient.renameList( req.params.listId, req.body.listName, (err, reply) => {
      if (err) {console.error(chalk.bold.red(err))}
      getListFromDB(req.params.listId, res);
    } );
  });

  app.post('/lists/:listId/addLaserDisc', (req, res) => {
    const ldString = `${req.body.lddbNumber}: ${req.body.title}`;
    dbclient.addLaserDisc( req.params.listId, ldString, (err, reply) => {
      if (err) {console.error(chalk.bold.red(err))}
      getListFromDB(req.params.listId, res);
    } );
  });

  app.post('/lists/:listId/removeLaserDisc', (req, res) => {
    const ldString = `${req.body.lddbNumber}: ${req.body.title}`;
    dbclient.removeLaserDisc( req.params.listId, ldString, (err, reply) => {
      if (err) {console.error(chalk.bold.red(err))}
      getListFromDB(req.params.listId, res);
    } );
  });

  app.post('/lists/:listId/importLDDBList', (req, res) => {
    const ldStrings = req.body.laserDiscs.map(ld => {
      return `${ld.ID}: ${ld.Title}`;
    });
    dbclient.importLDDBList( req.params.listId, ldStrings, (err, reply) => {
      if (err) {console.error(chalk.bold.red(err))}
      getListFromDB(req.params.listId, res);
    } );
  });

  app.listen(8000, () => {
    console.log(chalk.bold.blue('Express Server listening on port 8000!'));
  });

  return app;
}

module.exports = {startExpress};
