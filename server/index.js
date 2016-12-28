// index.js
// Script to start a redis client and connect it to a web server
// Created By Jesse Jurman
"use strict";

const chalk = require('chalk');
const Redis = require('redis');
const RedisClient = require('./RedisClient');
const APIServer = require('./APIServer');

// generate proof for interacting with FacebookAuth
const app_secret = require('./app_settings').secret;
const crypto = require('crypto');
const proof = function(token) {
  return crypto.createHmac('sha256', app_secret).update(token).digest('hex');
}

// connect to Redis instance
const client = Redis.createClient();
client.on('connect', () => {
    console.log(chalk.bold.blue('Redis Client Connected'));
});
// wrap Redis client with functions for the app
const redisClient = new RedisClient(client);

// start api server (that should expect connections from staticHost)
const staticHost = 'http://localhost:3000';
APIServer.startExpress(redisClient, staticHost, proof);
