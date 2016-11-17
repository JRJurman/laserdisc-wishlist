// WebServer.js
// Exposes a function to kick off an express server given a db client
// Created by Jesse Jurman
"use strict";

const express = require('express');
const bodyParser = require('body-parser')

function startExpress(dbclient) {
  const app = express();
  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.get('/lists/:listId/', (req, res) => {
    dbclient.getList( req.params.listId, (err, list) => {
      res.send(list);
    } );
  });

  app.post('/newList', (req, res) => {
    dbclient.newList( listId => {
      res.send(listId)
    } );
  });

  app.post('/lists/:listId/nameList', (req, res) => {
    dbclient.nameList( req.params.listId, req.body.listName, (err, reply) => {
      res.send(`${reply}`)
    } );
  });

  app.post('/lists/:listId/addLaserdisc', (req, res) => {
    const ldString = `${req.body.ldRef}: ${req.body.ldTitle}`;
    dbclient.addLaserdisc( req.params.listId, ldString, (err, reply) => {
      res.send(`${reply}`)
    } );
  });

  app.post('/lists/:listId/removeLaserdisc', (req, res) => {
    const ldString = `${req.body.ldRef}: ${req.body.ldTitle}`;
    dbclient.removeLaserdisc( req.params.listId, ldString, (err, reply) => {
      res.send(`${reply}`)
    } );
  });

  app.listen(3000, () => {
    console.log('Express Server listening on port 3000!')
  });
}


module.exports = {startExpress};
