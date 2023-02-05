"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module CallbackQueryValidator
 * @kind class
 *
 * @extends Base
 * @requires Base
 * @requires MongoClient
 * @requires ObjectId
 * @requires EventEmitter
 * @requires Transform
 *
 * @classdesc CallbackQueryValidator class
 */

const { EventEmitter } = require("events");
const { Transform } = require("stream");
const { MongoClient, ObjectId } = require("mongodb");

require('dotenv').config()
class CallbackQueryValidator extends require("./base") {
    constructor(...arrayOfObjects) {

        super({ objectMode: true, encoding: "utf-8", autoDestroy: true });
    
        arrayOfObjects.forEach(option => {
            if(Object.keys(option).length > 0){
                Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
            }
        });
    
        // auto bind methods
        this.autobind(CallbackQueryValidator);
        // auto invoke methods
        this.autoinvoker(CallbackQueryValidator);
        // add other classes method if methods do not already exist. Argument order matters!
        // this.methodizer(..classList);
        //Set the maximum number of listeners to infinity
        this.setMaxListeners(Infinity);
      }

  /**
   * @name initValidatorConfig
   * @function
   *
   *
   * @description makes a database connections using database connection environment variables
   *
   * @return does not return anything
   *
   */
  initValidatorConfig() {
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
        this.uri,
        { useUnifiedTopology: true },
        fn
      );
  }

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
    return ["initValidatorConfig"];
  }

  /**
   * @name validateQuery
   * @function
   *
   * @param {Object} query mongodb database collection query object
   * @param {String} event EventEmitter event name
   *
   * @description Checks/validates input query
   *
   * @return {EventEmitter|Stream|Transform}  A transform that emits an error event
   *
   */
  validateQuery(query = {}, event = "find") {
    if (query && typeof query !== "object")
      return this.emit(event, { error: "input query must be an object" });
    return this.emit("validatedQuery");
  }

  /**
   * @name validateProjection
   * @function
   *
   * @param {Object} projection mongodb database collection projection object
   * @param {String} event EventEmitter event name
   *
   * @description Checks/validates input query
   *
   * @return {EventEmitter|Stream|Transform}  A transform that emits an error event
   *
   */
  validateProjection(projection = {}, event = "find") {
    if (projection && typeof projection !== "object")
      return this.emit(event, { error: "input projection must an object" });
    return this.emit("validatedProjection");
  }

  /**
   * @name validateData
   * @function
   *
   * @param {Object} data mongodb database collection data object
   * @param {String} event EventEmitter event name
   *
   * @description Checks/validates input query
   *
   * @return {EventEmitter|Stream|Transform}  A transform that emits an error event
   *
   */
  validateData(data = {}, event = "find") {
    if (data && typeof data !== "object")
      return this.emit(event, { error: "input data must an object" });
    return this.emit("validatedData");
  }

  /**
   * @name validateLimit
   * @function
   *
   * @param {Number|Integer} limit mongodb database collection query limiting number
   * @param {String} event EventEmitter event name
   *
   * @description Checks/validates input query
   *
   * @return {EventEmitter|Stream|Transform}  A transform that emits an error event
   *
   */
  validateLimit(limit = 1, event = "find") {
    if (limit && !Number.isInteger(limit))
      return this.emit(event, { error: "input limit must an integer" });
    return this.emit("validatedLimit");
  }

  /**
   * @name validateSort
   * @function
   *
   * @param {Object} sort mongodb database collection query sort object
   * @param {String} event EventEmitter event name
   *
   * @description Checks/validates input query
   *
   * @return {EventEmitter|Stream|Transform}  A transform that emits an error event
   *
   */
  validateSort(sort = {}, event = "find") {
    if (sort && typeof sort !== "object")
      return this.emit(event, { error: "input sort must an object" });
    return this.emit("validatedSort");
  }

  /**
   * @name validateDataArray
   * @function
   *
   * @param {Array} data mongodb database collection query data array
   * @param {String} event EventEmitter event name
   *
   * @description Checks/validates input query
   *
   * @return {EventEmitter|Stream|Transform}  A transform that emits an error event
   *
   */
  validateDataArray(data = [], event = "find") {
    if (data && !Array.isArray(data))
      return this.emit(event, { error: "input data must an array of objects" });
    // if (data && typeof data === 'object')
    //   return this.emit(event, { error: "input data must an array of objects" });
    return this.emit("validatedDataArray");
  }

  /**
   * @name validateCollectionName
   * @function
   *
   * @param {String} collectionName mongodb database collection name
   * @param {String} event EventEmitter event name
   *
   * @description Checks/validates input query
   *
   * @return {EventEmitter|Stream|Transform}  A transform that emits an error event
   *
   */
  validateCollectionName(
    collectionName = this.collectionName,
    event = "dropCollection-error"
  ) {
    if (collectionName && typeof collectionName !== "string")
      return this.emit(event, { error: "input collection name must a string" });
    return this.emit("validatedCollectionName");
  }

  /**
   * @name validateDbName
   * @function
   *
   * @param {String} dbName mongodb database name
   * @param {String} event EventEmitter event name
   *
   * @description Checks/validates input query
   *
   * @return {EventEmitter|Stream|Transform}  A transform that emits an error event
   *
   */
  validateDbName(dbName = this.db, event = "collectionDrop-error") {
    if (dbName && typeof dbName !== "string")
      return this.emit(event, { error: "input database name must a string" });
    return this.emit("validatedDbName");
  }

  /**
   * @name validateLastName
   * @function
   *
   * @param {String} lastname mongodb database collection query lastname property value
   * @param {String} event EventEmitter event name
   *
   * @description Checks/validates input query
   *
   * @return {EventEmitter|Stream|Transform}  A transform that emits an error event
   *
   */
  validateLastName(lastname = "lastname", event = "firstByLastName-error") {
    if (lastname && typeof lastname !== "string")
      return this.emit(event, { error: "input last name must be a string" });
    return this.emit("validatedLastName");
  }
  /**
   * @name validateFirstName
   * @function
   *
   * @param {String} firstname mongodb database collection query firstname property value
   * @param {String} event EventEmitter event name
   *
   * @description Checks/validates input query
   *
   * @return {EventEmitter|Stream|Transform}  A transform that emits an error event
   *
   */
  validateFirstName(firstname = "firstname", event = "firstByLastName-error") {
    if (firstname && typeof firstname !== "string")
      return this.emit(event, { error: "input last name must be a string" });
    return this.emit("validatedFirstName");
  }

  /**
   * @name validateEmail
   * @function
   *
   * @param {String} email mongodb database collection query email property value
   * @param {String} event EventEmitter event name
   *
   * @description Checks/validates input query
   *
   * @return {EventEmitter|Stream|Transform}  A transform that emits an error event
   *
   */
  validateEmail(email = "email", event = "firstByLastName-error") {
    if (email && typeof email !== "string")
      return this.emit(event, { error: "input email must be a string" });
    if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    )
      return this.emit(event, {
        error: "input email must be a valid email address",
      });

    return this.emit("validatedEmail");
  }

  /**
   * @name validateUsername
   * @function
   *
   * @param {String} username mongodb database collection query username property value
   * @param {String} event EventEmitter event name
   *
   * @description Checks/validates input query
   *
   * @return {EventEmitter|Stream|Transform}  A transform that emits an error event
   *
   */
  validateUsername(username = "username", event = "firstByUsername-error") {
    if (username && typeof username !== "string")
      return this.emit(event, {
        error: "input username name must be a string",
      });
    return this.emit("validatedUsername");
  }



  /**
   * @name validateToken
   * @function
   *
   * @param {String} username mongodb database collection query username property value
   * @param {String} event EventEmitter event name
   *
   * @description Checks/validates input query
   *
   * @return {EventEmitter|Stream|Transform}  A transform that emits an error event
   *
   */
   validateToken(token = "token", event = "firstByToken-error") {
    if (token && typeof token !== "string")
      return this.emit(event, {
        error: "input token name must be a string",
      });
    return this.emit("validatedToken");
  }

  /**
   * @name validatePhone
   * @function
   *
   * @param {String} phone mongodb database collection query phone property value
   * @param {String} event EventEmitter event name
   *
   * @description Checks/validates input query
   *
   * @return {EventEmitter|Stream|Transform}  A transform that emits an error event
   *
   */
  validatePhone(phone = "phone", event = "firstByPhone-error") {
    if (phone && typeof phone !== "string")
      return this.emit(event, { error: "input last name must be a string" });
    return this.emit("validatedPhone");
  }

  /**
   * @name validateId
   * @function
   *
   * @param {String} id mongodb database collection query id property value
   * @param {String} event EventEmitter event name
   *
   * @description Checks/validates input query
   *
   * @return {EventEmitter|Stream|Transform}  A transform that emits an error event
   *
   */
  validateId(id = "", event = "findById-error") {
    if (id && !ObjectId.isValid(id))
      return this.emit(event, {
        error: "input document id is invalid",
      });
    return this.emit("validatedId");
  }

  /**
   * @name validateCollectionOne
   * @function
   *
   * @param {String} as mongodb database collection validateCollectionOne name
   * @param {String} event EventEmitter event name
   *
   * @description Checks/validates input query
   *
   * @return {EventEmitter|Stream|Transform}  A transform that emits an error event
   *
   */
  validateCollectionOne(collectionOne = "", event = "letfJoin-error") {
    if (collectionOne && typeof collectionOne !== "string")
      return this.emit(event, { error: "input collection one must an string" });
    return this.emit("validatedCollectionOne");
  }

  /**
   * @name validateCollectionTwo
   * @function
   *
   * @param {String} as mongodb database collection collectionTwo name
   * @param {String} event EventEmitter event name
   *
   * @description Checks/validates input query
   *
   * @return {EventEmitter|Stream|Transform}  A transform that emits an error event
   *
   */
  validateCollectionTwo(collectionTwo = "", event = "letfJoin-error") {
    if (collectionTwo && typeof collectionTwo !== "string")
      return this.emit(event, { error: "input collection two must an string" });
    return this.emit("validatedCollectionTwo");
  }

  /**
   * @name validatelocalField
   * @function
   *
   * @param {String} as mongodb database collection query localField property value on collection two
   * @param {String} event EventEmitter event name
   *
   * @description Checks/validates input query
   *
   * @return {EventEmitter|Stream|Transform}  A transform that emits an error event
   *
   */
  validateLocalField(localField = "", event = "letfJoin-error") {
    if (localField && typeof localField !== "string")
      return this.emit(event, {
        error: "input local field on collection two must an string",
      });
    return this.emit("validatedLocalField");
  }

  /**
   * @name validateForeignField
   * @function
   *
   * @param {String} as mongodb database collection query foreignField property value on collection two
   * @param {String} event EventEmitter event name
   *
   * @description Checks/validates input query
   *
   * @return {EventEmitter|Stream|Transform}  A transform that emits an error event
   *
   */
  validateForeignField(foreignField = "", event = "letfJoin-error") {
    if (foreignField && typeof foreignField !== "string")
      return this.emit(event, {
        error: "input foreign field on collection two must an string",
      });
    return this.emit("validatedForeignField");
  }

  /**
   * @name validateAs
   * @function
   *
   * @param {String} as mongodb database collection query as property value on collection two
   * @param {String} event EventEmitter event name
   *
   * @description Checks/validates input query
   *
   * @return {EventEmitter|Stream|Transform}  A transform that emits an error event
   *
   */
  validateAs(as = "", event = "letfJoin-error") {
    if (as && typeof as !== "string")
      return this.emit(event, {
        error: "input as on collection two must an string",
      });
    return this.emit("validatedAs");
  }

  /**
   * @name validateLeftJoinItems
   * @function
   *
   * @param {String} collectionOne mongodb database collection aggregate query collection one name
   * @param {String} collectionTwo mongodb database collection aggregate query collection two name
   * @param {String} localField mongodb database collection aggregate query local field name on collection two
   * @param {String} foreignField mongodb database collection aggregate query foreign field name on collection two
   * @param {String} as mongodb database collection aggregate query as field name on collection two
   * @param {String} event EventEmitter event name
   *
   * @description Checks/validates input query
   *
   * @return {EventEmitter|Stream|Transform}  A transform that emits an error event
   *
   */
  validateLeftJoinItems(
    collectionOne,
    collectionTwo,
    localField,
    foreignField,
    as,
    event = "letfJoin-error"
  ) {
    // this.validateCollectionOne(collectionOne, event);
    if (collectionOne && typeof collectionOne !== "string")
      return this.emit(event, { error: "input collection one must an string" });
    // this.validateCollectionTwo(collectionTwo, event);
    if (collectionTwo && typeof collectionTwo !== "string")
      return this.emit(event, { error: "input collection two must an string" });
    // this.validatelocalField(localField, event);
    if (localField && typeof localField !== "string")
      return this.emit(event, {
        error: "input local field on collection two must an string",
      });
    // this.validateForeignField(foreignField, event);
    if (foreignField && typeof foreignField !== "string")
      return this.emit(event, {
        error: "input foreign field on collection two must an string",
      });
    // this.validateAs(as, event);

    if (as && typeof as !== "string")
      return this.emit(event, {
        error: "input as on collection two must an string",
      });

    return this.emit("validatedLeftJoinItems");
  }

  /**
   * @name validateCollectionNameDbName
   * @function
   *
   * @param {String} collectionName mongodb database collection name
   * @param {String} dbName mongodb database name
   * @param {String} event EventEmitter event name
   *
   * @description Checks/validates input query
   *
   * @return {EventEmitter|Stream|Transform}  A transform that emits an error event
   *
   */
  validateCollectionNameDbName(
    collectionName = this.collectionName,
    dbName = this.db,
    event = "collectionDrop-error"
  ) {
    // this.validateCollectionName(collectionName, event);
    if (collectionName && typeof collectionName !== "string")
      return this.emit(event, { error: "input collection name must a string" });
    // this.validateDbName(dbName, event);
    if (dbName && typeof dbName !== "string")
      return this.emit(event, { error: "input database name must a string" });
    return this.emit("validatedCollectionNameDbName");
  }

  /**
   * @name validateQueryProjection
   * @function
   *
   * @param {Object} query mongodb database collection query
   * @param {Object} projection mongodb database collection projection query
   * @param {String} event EventEmitter event name
   *
   * @description Checks/validates input query
   *
   * @return {EventEmitter|Stream|Transform}  A transform that emits an error event
   *
   */
  validateQueryProjection(query = {}, projection = {}, event = "find") {
    if (query && typeof query !== "object")
      return this.emit(event, { error: "input query must be a string" });
    if (projection && typeof projection !== "object")
      return this.emit(event, { error: "input projection must an object" });
    return this.emit("validatedQueryProjection");
  }

  /**
   * @name validateQueryProjectionSort
   * @function
   *
   * @param {Object} query mongodb database collection query
   * @param {Object} sort mongodb database collection sort query
   * @param {Object} projection mongodb database collection projection query
   * @param {String} event EventEmitter event name
   *
   * @description Checks/validates input query
   *
   * @return {EventEmitter|Stream|Transform}  A transform that emits an error event
   *
   */
  validateQueryProjectionSort(
    query = {},
    sort = {},
    projection = {},
    event = "find"
  ) {
    // this.validateQuery(query, event);
    if (query && typeof query !== "object")
      return this.emit(event, { error: "input query must be an object" });
    // this.validateProjection(projection, event);
    if (projection && typeof projection !== "object")
      return this.emit(event, { error: "input projection must an object" });
    // this.validateSort(sort, event);
    if (sort && typeof sort !== "object")
      return this.emit(event, { error: "input sort must an object" });
    return this.emit("validatedQueryProjectionSort");
  }

  /**
   * @name validateQueryLimitProjection
   * @function
   *
   * @param {Object} query mongodb database collection query
   * @param {Number|Integer} limit mongodb database collection query limiting number
   * @param {Object} projection mongodb database collection projection query
   * @param {String} event EventEmitter event name
   *
   * @description Checks/validates input query
   *
   * @return {EventEmitter|Stream|Transform}  A transform that emits an error event
   *
   */
  validateQueryLimitProjection(
    query = {},
    limit = 1,
    projection = {},
    event = "find"
  ) {
    // this.validateQuery(query, event);
    if (query && typeof query !== "object")
      return this.emit(event, { error: "input query must be an object" });
    // this.validateData(data, event)
    // this.validateProjection(projection, event);
    if (projection && typeof projection !== "object")
      return this.emit(event, { error: "input projection must an object" });
    // this.validateLimit(limit, event);
    if (limit && !Number.isInteger(limit))
      return this.emit(event, { error: "input limit must an integer" });
    return this.emit("validatedQueryLimitProjection");
  }

  /**
   * @name validateQueryData
   * @function
   *
   * @param {Object} query mongodb database collection query
   * @param {Object} data mongodb database collection input data
   * @param {String} event EventEmitter event name
   *
   * @description Checks/validates input query
   *
   * @return {EventEmitter|Stream|Transform}  A transform that emits an error event
   *
   */
  validateQueryData(query = {}, data = {}, event = "updateMany-error") {
    // this.validateQuery(query, event);
    if (query && typeof query !== "object")
      return this.emit(event, { error: "input query must be an object" });
    // this.validateData(data, event);
    if (data && typeof data !== "object")
      return this.emit(event, { error: "input data must an object" });
    return this.emit("validatedQueryData");
  }

  validate() {
    return "it is working!";
  }
}

module.exports = CallbackQueryValidator;

