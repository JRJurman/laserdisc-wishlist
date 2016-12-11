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

  /* addLaserdisc(string listId, string laserdisc, function callback)
    adds laserdisc string to list, should be in the format: 'REF: NAME'
    callback is a function that takes in the final length of the list
  */
  addLaserdisc(listId, laserdisc, callback) {
    this.dbclient.rpushx(listId, laserdisc, callback);
  }

  /* removeLaserdisc(string listId, string laserdisc, function callback)
    removes laserdisc string from list, should be in the format: 'REF: NAME'
    callback is a function that takes in the number of deleted elements
  */
  removeLaserdisc(listId, laserdisc, callback) {
    this.dbclient.lrem(listId, 0, laserdisc, callback);
  }

}

module.exports = RedisClient;
