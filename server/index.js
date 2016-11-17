// index.js
// Script to start a redis client and connect it to a web server
// Created By Jesse Jurman
"use strict";

const Redis = require('redis');
const RedisClient = require('./RedisClient');
const WebServer = require('./WebServer');

const client = Redis.createClient();

client.on('connect', () => {
    console.log('Redis Client Connected');
});

const redisClient = new RedisClient(client);
WebServer.startExpress(redisClient);
