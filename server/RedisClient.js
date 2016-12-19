// RedisClient.js
// Decorator around Redis DB Connection
// Created by Jesse Jurman
"use strict";
const shortHash = require('short-hash');

class RedisClient {
  constructor(dbclient) {
    this.dbclient = dbclient;
  }

  /* newList(function callback)
    creates a new list on the database
    callback is a function that takes in a listId
  */
  newList(callback) {
    this.dbclient.dbsize((err, length) => {
      const newListId = shortHash(`${length*7}`);
      const listCallback = callback.bind(this, newListId);

      this.dbclient.exists(newListId, (err, exists) => {
        if (!!exists) { throw `List with id:${newListId} already exists`; }
        this.dbclient.multi()
                      .lpush(newListId, "Untitled List")
                      .exec(listCallback);
      });

    });
  }

  /* getList(string listId, function callback)
    returns the elements in the list
    callback is a function that takes in a list
  */
  getList(listId, callback) {
    this.dbclient.lrange(listId, 0, -1, callback)
  }

  /* renameList(string listId, string newName, function callback)
    renames the list by setting the zeroth value
    callback is a function that takes in a simpleString (usually 'ok')
  */
  renameList(listId, newName, callback) {
    this.dbclient.lset(listId, 0, newName, callback);
  }

  /* addLaserDisc(string listId, string laserDisc, function callback)
    adds laserDisc string to list, should be in the format: 'ID: NAME'
    callback is a function that takes in the final length of the list
  */
  addLaserDisc(listId, laserDisc, callback) {
    this.dbclient.rpushx(listId, laserDisc, callback);
  }

  /* removeLaserDisc(string listId, string laserDisc, function callback)
    removes laserDisc string from list, should be in the format: 'REF: NAME'
    callback is a function that takes in the number of deleted elements
  */
  removeLaserDisc(listId, laserDisc, callback) {
    this.dbclient.lrem(listId, 0, laserDisc, callback);
  }

  /* importLDDBList(string listId, list laserDiscs, function callback)
    adds list of laserDisc strings, should be in the format: 'ID: NAME'
    callback is a function that takes in the final length of the list
  */
  importLDDBList(listId, laserDiscs, callback) {
    laserDiscs.reduce((dbclientBulkPush, ldString) => {
      // keep pushing the ldString, and then execute
      return dbclientBulkPush.rpushx(listId, ldString);
    }, this.dbclient.multi()).exec(callback);
  }

}

module.exports = RedisClient;
