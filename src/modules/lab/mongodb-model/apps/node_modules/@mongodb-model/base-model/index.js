"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@ericsonweah.dev> <https://github.com/ericsonsweah>  <+1.385.436.1984>
 *
 * @module Model
 * @kind class
 *
 * @extends Base
 * 
 * @requires Base
 * @requires AsyncAwait
 * @requires Callback
 * @requires AsyncAwait
 * @requires Callback
 * @requires CallbackQuery
 * @requires CallbackQueryValidator
 * @requires MongoClient
 *
 * @classdesc Model class
 */


require('dotenv').config()
const { MongoClient } = require("mongodb");
const AsyncAwait = require("@mongodb-model/db-promise");
const Callback = require('@mongodb-model/db-callback');
const CallbackQuery = require('@mongodb-model/db-query');
const CallbackQueryValidator = require('@mongodb-model/db-query-validator');


class Model extends require("./base") {
    constructor(...arrayOfObjects) {

        super({ objectMode: true, encoding: "utf-8", autoDestroy: true });
    
        arrayOfObjects.forEach(option => {
            if(Object.keys(option).length > 0){
                Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
            }
        });
    
        // auto bind methods
        this.autobind(Model);
        // auto invoke methods
        this.autoinvoker(Model);
        // add other classes method if methods do not already exist. Argument order matters!
        this.methodizer(AsyncAwait,Callback, CallbackQuery, CallbackQueryValidator);
        //Set the maximum number of listeners to infinity
        this.setMaxListeners(Infinity);
      }

      populateFromApi(apiEndPoint = 'https://jsonplaceholder.typicode.com/posts', many = true){
        this.apiGet(apiEndPoint)
        this.on('apiGet', data => {
            if(many){
                this.createMany(data);
                this.on('createMany', result => {
                    this.emit('populateFromApi', result)
                })
                this.on('createMany-error', error => {
                    this.emit('populateFromApi-error', error)
                })
            }else{
                this.create(data);
                this.on('create', result => {
                    this.emit('populateFromApi', result)
                })
                this.on('create-error', error => {
                    this.emit('populateFromApi-error', error)
                })
            }
        });
        this.on('apiGet-error', error => {
          this.emit('populateFromApi-error', error)
        })
    }

  /**
   * @name init
   * @function
   *
   *
   * @description makes a database connections using database connection environment variables
   *
   * @return does not return anything
   *
   */
  init() {
    if (!this.collection) this.collection = "users";
    if (!this.url) this.url = `${process.env.DATABASE_URL}`;
    if (!this.uri)
      this.uri = `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`;
    if (!this.db) this.db = process.env.DATABASE_NAME;
    if(this.db) {
      this.uri = `mongodb://localhost:27017/${this.db}`
      if(this.url){
        this.uri = `${this.url}/${this.db}`
      }
    }
   


    this.connect = (fn = () => {}) =>
      MongoClient.connect(
        this.url,
        { useUnifiedTopology: true },
        fn
      );
  }
  command(){return require('./bin')}

  /**
   * @name autoinvoked
   * @function
   *
   * @param {Object|Function|Class} className the class whose methods to be bound to it
   *
   * @description auto sets the list of methods to be auto invoked
   *
   * @return does not return anything
   *
   */

  autoinvoked() {
    return ["init"];
  }

}

module.exports = Model;








