// ProxyServer.js
// Server to handle routes that don't actually exist
// Created by Jesse Jurman
"use strict";

const express = require('express');
const proxy = require('proxy-middleware');
const url = require('url');

function startProxy(staticHost) {
  const app = express();
  const urlOptions = url.parse(staticHost);
  const proxyOptions = {
    route: '/',
    preserveHost: true
  };

  const routeProxy = proxy(Object.assign({}, urlOptions, proxyOptions));

  app.use('/', routeProxy);
  app.use('/lists/*', routeProxy);

  app.listen(4000, () => {
    console.log('Proxy Server listening on port 4000!')
  });

  return app;
}

module.exports = {startProxy};
