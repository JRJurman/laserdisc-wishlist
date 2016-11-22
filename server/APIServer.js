// APIServer.js
// Exposes a function to kick off an express server given a db client
// Created by Jesse Jurman
"use strict";

const express = require('express');
const bodyParser = require('body-parser')

function startExpress(dbclient, host) {
  const app = express();
  app.use(bodyParser.json());

  function getListFromDB(listId, res) {
    dbclient.getList( listId, (err, list) => {
      const name = list[0];
      const laserdiscs = list.slice(1).map( ld => {
        return {
          num: ld.split(': ')[0],
          title: ld.split(': ').slice(1)[0]
        };
      });

      res.send({name, laserdiscs});
    } );
  }

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", host);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get('/', (req, res) => {
    res.send(`Hello! This is the API Server that connects the Static App
      Laserdisc-Wishlist to the Database that powers the data.`);
  });

  app.post('/newList', (req, res) => {
    dbclient.newList( listId => {
      res.send(listId)
    } );
  });

  app.get('/lists/:listId/', (req, res) => {
    getListFromDB(req.params.listId, res);
  });

  app.post('/lists/:listId/rename', (req, res) => {
    dbclient.renameList( req.params.listId, req.body.listName, (err, reply) => {
      getListFromDB(req.params.listId, res);
    } );
  });

  app.post('/lists/:listId/addLaserdisc', (req, res) => {
    const ldString = `${req.body.num}: ${req.body.title}`;
    dbclient.addLaserdisc( req.params.listId, ldString, (err, reply) => {
      res.send(`${reply}`)
    } );
  });

  app.post('/lists/:listId/removeLaserdisc', (req, res) => {
    const ldString = `${req.body.num}: ${req.body.title}`;
    dbclient.removeLaserdisc( req.params.listId, ldString, (err, reply) => {
      res.send(`${reply}`)
    } );
  });

  app.listen(8000, () => {
    console.log('Express Server listening on port 8000!')
  });

  return app;
}

module.exports = {startExpress};
