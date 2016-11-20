// index.js
// Script to start a redis client and connect it to a web server
// Created By Jesse Jurman
"use strict";

const Redis = require('redis');
const RedisClient = require('./RedisClient');
const WebServer = require('./WebServer');
// const ProxyServer = require('./ProxyServer');

const client = Redis.createClient();

client.on('connect', () => {
    console.log('Redis Client Connected');
});

const staticHost = 'http://localhost:3000';
// const proxyHost = 'http://localhost:4000';

const redisClient = new RedisClient(client);
WebServer.startExpress(redisClient, staticHost);
// ProxyServer.startProxy(staticHost);
