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

  app.post('/newList', (req, res) => {
    dbclient.newList( listId => {
      res.send(listId)
    } );
  });

  app.get('/lists/:listId/', (req, res) => {
    dbclient.getList( req.params.listId, (err, list) => {
      const title = list[0];
      const laserdiscs = list.slice(1).map( ld => {
        return {
          num: ld.split(': ')[0],
          title: ld.split(': ').slice(1)[0]
        };
      });

      res.send({title, laserdiscs});
    } );
  });

  app.post('/lists/:listId/renameList', (req, res) => {
    dbclient.renameList( req.params.listId, req.body.listName, (err, reply) => {
      res.send(`${reply}`)
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
