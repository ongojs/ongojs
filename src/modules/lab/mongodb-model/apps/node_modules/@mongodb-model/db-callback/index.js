"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module Callback
 * @kind class
 *
 * @extends Base
 * @requires Base
 * @requires MongoClient
 * @requires EventEmitter
 *
 * @classdesc Callback class
 */

const { EventEmitter } = require("events");
const { MongoClient } = require("mongodb");
const QueryValidator  = require("@mongodb-model/db-query-validator");
const Query = require("@mongodb-model/db-query");

require('dotenv').config()
class Callback extends require("./base") {
    constructor(...arrayOfObjects) {

        super({ objectMode: true, encoding: "utf-8", autoDestroy: true });
    
        arrayOfObjects.forEach(option => {
            if(Object.keys(option).length > 0){
                Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
            }
        });
    
        // auto bind methods
        this.autobind(Callback);
        // auto invoke methods
        this.autoinvoker(Callback);
        // add other classes method if methods do not already exist. Argument order matters!
        this.methodizer(QueryValidator, Query);
        //Set the maximum number of listeners to infinity
        this.setMaxListeners(Infinity);
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
//mongodb://localhost:27017/
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

  /**
   * @name fieldName
   * @function
   * @param {String} name  collection find query object
   *
   * @description adds a property name with the value name to an object
   *
   * @return {Object}  the modified/updated object
   *
   */

  fieldName(name) {
    const obj = {};
    obj[name] = name;
    return obj;
  }
  createDatabase(databaseName = this.db) {
    this.validateDbName(databaseName, "createDatabase-error");
    const dbFn = (error, db) => {
      if (error) return this.emit("createDatabase-error", error);
      
      this.emit("createDatabase", db);
      db.close();
    };
    MongoClient.connect(
      // `${process.env.DATABASE_URL}${databaseName}`,
      `${this.uri}`,
      { useUnifiedTopology: true },
      dbFn
    );
  }
  /**
   * @name createCollection
   * @function
   *
   * @param {String} collectionName database collection name string
   *
   * @description Creates/adds a database collection
   *
   * @return {EventEmitter}  emits a 'createCollection' (success) or 'createCollection-error' (error)  event
   *
   */
  createCollection(collectionName = this.collection) {
    this.validateCollectionName(collectionName, "createCollection-error");

    const fn = (error, db) => {
      if (error) return this.emit("createCollection-error", error);
      
      const dbs = db.db(this.db);

      const fnc = (err, res) => {
        if (err) {
          db.close();
          return this.emit("createCollection-error", err);
        }

        this.emit("createCollection", res.s.namespace);
        db.close();
      };
      dbs.createCollection(collectionName, fnc);
    };
    this.connect(fn);
  }


   /**
   * @name createCollection
   * @function
   *
   * @param {String} collectionName database collection name string
   *
   * @description Creates/adds a database collection
   *
   * @return {EventEmitter}  emits a 'createCollection' (success) or 'createCollection-error' (error)  event
   *
   */
    dropCollection(collectionName = this.collection) {
      this.validateCollectionName(collectionName, "dropCollection-error");
  
      const fn = (error, db) => {
        if (error) return this.emit("dropCollection-error", error);
        
        const dbs = db.db(this.db);
  
        const fnc = (err, res) => {
          if (err) {
            db.close();
            return this.emit("dropCollection-error", err);
          }
  
          this.emit("dropCollection", res.s.namespace);
          db.close();
        };
        dbs.createCollection(collectionName, fnc);
      };
      this.connect(fn);
    }

  /**
   * @name insertOne
   * @function
   *
   * @param {Object} data query/input document (data) to create/insert
   * @param {String} collectionName database collection name string
   *
   * @description Creates/inserts/adds a document into a collection
   *
   * @return {EventEmitter}  emits a 'insertOne' (success) or 'insertOne-error' (error)  event
   *
   */
  insertOne(data = {}, collectionName = this.collection) {
    this.on("validatedData", () => {
      this.insertOneCallback(data, collectionName);
    });
    this.validateData(data, "insertOne-error");
  }

  /**
   * @name create
   * @function
   *
   * @param {Object} data query/input document (data) to create/insert
   * @param {String} collectionName database collection name string
   *
   * @description Creates/inserts/adds one or more documents into a collection
   *
   * @return {EventEmitter}  emits a 'create' (success) or 'create-error' (error)  event
   *
   */
  create(data = {}, collectionName = this.collection) {
    this.on("validatedData", () => {
      this.createCallback(data, collectionName);
    });
    this.validateData(data, "create-error");
  }

  /**
   * @name insertMany
   * @function
   *
   * @param {Array} data query/input document (data) to create/insert
   * @param {String} collectionName database collection name string
   *
   * @description Creates/inserts/adds one or more documents into a collection
   *
   * @return {EventEmitter}  emits a 'insertMany' (success) or 'insertMany-error' (error)  event
   *
   */
  insertMany(data = [], collectionName = this.collection) {
    this.on("validatedDataArray", () => {
      this.insertManyCallback(data, collectionName);
    });
    this.validateDataArray(data, "insertMany-error");
  }

  /**
   * @name createMany
   * @function
   *
   * @param {Array} data query/input document (data) to create/insert
   * @param {String} collectionName database collection name string
   *
   * @description Creates/inserts/adds one or more document into a collection
   *
   * @return {EventEmitter}  emits a 'createMany' (success) or 'createMany-error' (error)  event
   *
   */
  createMany(data = [], collectionName = this.collection) {
    this.on("validatedDataArray", () => {
      this.createManyCallback(data, collectionName);
    });
    this.validateDataArray(data, "createMany-error");
  }

  /**
   * @name findOne
   * @function
   *
   * @param {Object} data query/input document (data) to create/insert
   * @param {String} collectionName database collection name string
   *
   * @description Finds/fetches/gets first occurrent document in a collection
   *
   * @return {EventEmitter}  emits a 'findOne' (success) or 'findOne-error' (error)  event
   *
   */
  findOne(query = {}, collectionName = this.collection) {
    this.on("validatedQuery", () => {
      this.findOneCallback(query, collectionName);
    });
    this.validateQuery(query, "findOne-error");
  }

  /**
   * @name first
   * @function
   *
   * @param {Object} data query/input document (data) to create/insert
   * @param {String} collectionName database collection name string
   *
   * @description Finds/fetches/gets first occurrent document in a collection
   *
   * @return {EventEmitter}  emits a 'first' (success) or 'first-error' (error)  event
   *
   */
  first(query = {}, collectionName = this.collection) {
    this.on("validatedQuery", () => {
      this.firstCallback(query, collectionName);
    });
    this.validateQuery(query, "first-error");
  }

  /**
   * @name find
   * @function
   *
   * @param {Object} data query/input document (data) to create/insert
   * @param {String} collectionName database collection name string
   *
   * @description Finds/fetches/gets one or more documents from a collection
   *
   * @return {EventEmitter}  emits a 'find' (success) or 'find-error' (error)  event
   *
   */
  find(query = {}, projection = {}, collectionName = this.collection) {
    this.on("validatedQueryProjection", () => {
      this.findCallback(query, projection, collectionName);
    });
    this.validateQueryProjection(query, projection, "find-error");
  }

  /**
   * @name all
   * @function
   *
   * @param {Object} data query/input document (data) to create/insert
   * @param {String} collectionName database collection name string
   *
   * @description Finds/fetches/gets all documents satisfying input query from a collection
   *
   * @return {EventEmitter}  emits a 'all' (success) or 'all-error' (error)  event
   *
   */
  all(query = {}, projection = {}, collectionName = this.collection) {
    this.on("validatedQueryProjection", () => {
      this.allCallback(query, projection, collectionName);
    });
    this.validateQueryProjection(query, projection, "all-error");
  }

  /**
   * @name sort
   * @function
   *
   * @param {Object} data query/input document (data) to create/insert
   * @param {String} collectionName database collection name string
   *
   * @description Finds/fetches/gets all documents satisfying input query from a collection and sorts them
   *
   * @return {EventEmitter}  emits a 'sort' (success) or 'sort-error' (error)  event
   *
   */
  sort(
    query = {},
    sort = {},
    projection = {},
    collectionName = this.collection
  ) {
    this.on("validatedQueryProjectionSort", () => {
      this.sortCallback(query, sort, projection, collectionName);
    });
    this.validateQueryProjectionSort(query, sort, projection, "sort-error");
  }

  /**
   * @name deleteOne
   * @function
   *
   * @param {Object} query query/input document (data) to create/insert
   * @param {String} collectionName database collection name string
   *
   * @description deletes/removes first occurrent document from a collection
   *
   * @return {EventEmitter}  emits a 'deleteOne' (success) or 'deleteOne-error' (error)  event
   *
   */
  deleteOne(query = {}, collectionName = this.collection) {
    this.on("validatedQuery", () => {
      this.deleteOneCallback(query, collectionName);
    });
    this.validateQuery(query, "deleteOne-error");
  }

  /**
   * @name deleteMany
   * @function
   *
   * @param {Object} query query/input document (data) to create/insert
   * @param {String} collectionName database collection name string
   *
   * @description deletes/removes one or more documents from a collection
   *
   * @return {EventEmitter}  emits a 'deleteMany' (success) or 'deleteMany-error' (error)  event
   *
   */
  deleteMany(query = {}, collectionName = this.collection) {
    this.on("validatedQuery", () => {
      this.deleteManyCallback(query, collectionName);
    });
    this.validateQuery(query, "deleteMany-error");
  }

  /**
   * @name dropCollection
   * @function
   *
   * @param {Object} dbName database name string
   * @param {String} collectionName database collection name string
   *
   * @description Drops/deletes/removes a collection by name from a database
   *
   * @return {EventEmitter}  emits a 'dropCollection' (success) or 'dropCollection-error' (error)  event
   *
   */
  dropCollection(collectionName = this.collection, dbName = this.db) {
    this.validateCollectionNameDbName(
      collectionName,
      dbName,
      "dropCollection-error"
    );
    const dbfn = (error, db) => {
      if (error) return this.emit("dropCollection-error", error);
      
      const dbs = db.db(dbName);
      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("dropCollection-error", err);
        }
        if (res)
          this.emit(
            "dropCollection",
            `collection '${collectionName}' dropped from ${dbName}!`
          );
        db.close();
      };
      dbs.collection(collectionName).drop(cfn);
    };
    this.connect(dbfn);
  }

  /**
   * @name collectionDrop
   * @function
   *
   * @param {Object} dbName database name string
   * @param {String} collectionName database collection name string
   *
   * @description Drops/deletes/removes a collection by name from a database
   *
   * @return {EventEmitter}  emits a 'dropCollection' (success) or 'dropCollection-error' (error)  event
   *
   */
  collectionDrop(dbName = this.db, collectionName = this.collection) {
    this.validateCollectionNameDbName(
      collectionName,
      dbName,
      "collectionDrop-error"
    );
    const dbfn = (error, db) => {
      if (error) return this.emit("collectionDrop-error", error);
      
      const dbs = db.db(dbName);
      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("collectionDrop-error", err);
        }
        if (res)
          this.emit(
            "collectionDrop",
            `collection '${collectionName}' dropped from ${dbName}!`
          );
        db.close();
      };
      dbs.dropCollection(collectionName, cfn);
    };
    this.connect(dbfn);
  }

  /**
   * @name updateOne
   * @function
   *
   * @param {Object} query query/input document (data) to create/insert
   * @param {String} collectionName database collection name string
   *
   * @description updates first occurrent document in a collection
   *
   * @return {EventEmitter}  emits a 'updateOne' (success) or 'updateOne-error' (error)  event
   *
   */
  updateOne(query = {}, data = {}, collectionName = this.collection) {
    this.on("validatedQueryData", () => {
      this.updateOneCallback(query, data, collectionName);
    });
    this.validateQueryData(query, data, "updateOne-error");
  }

  /**
   * @name update
   * @function
   *
   * @param {Object} query query/input document (data) to create/insert
   * @param {String} collectionName database collection name string
   *
   * @description updates first occurrent document in a collection
   *
   * @return {EventEmitter}  emits a 'update' (success) or 'update-error' (error)  event
   *
   */
  update(query = {}, data = {}, collectionName = this.collection) {
    this.on("validatedQueryData", () => {
      this.updateCallback(query, data, collectionName);
    });
    this.validateQueryData(query, data, "update-error");
  }

  /**
   * @name updateMany
   * @function
   *
   * @param {Object} query query/input document (data) to create/insert
   * @param {String} collectionName database collection name string
   *
   * @description updates one or more documents in a collection
   *
   * @return {EventEmitter}  emits a 'updateMany' (success) or 'updateMany-error' (error)  event
   *
   */
  updateMany(query = {}, data = {}, collectionName = this.collection) {
    this.on("validatedQueryData", () => {
      this.updateManyCallback(query, data, collectionName);
    });
    this.validateQueryData(query, data, "updateMany-error");
  }

  /**
   * @name limit
   * @function
   *
   * @param {Object} query query/input document (data) to create/insert
   * @param {Number|Integer} limit limiting factor; max quantity
   * @param {String} collectionName database collection name string
   *
   * @description Finds/fetches/gets one or more documents from a collection and limits the number to input limit
   *
   * @return {EventEmitter}  emits a 'limit' (success) or 'limit-error' (error)  event
   *
   */
  limit(
    query = {},
    limit = 1,
    projection = {},
    collectionName = this.collection
  ) {
    this.on("validatedQueryLimitProjection", () => {
      this.limitCallback(query, limit, projection, collectionName);
      limit;
    });
    this.validateQueryLimitProjection(query, limit, projection, "limit-error");
  }

  /**
   * @name leftJoin
   * @function
   *
   * @param {String} collectionOne database collection one name string
   * @param {String} collectionTwo database collection two name string
   * @param {String} localField collection two local field name string
   * @param {String} foreignField collection two foreign field name string
   * @param {String} as aggregation name
   *
   * @description aggregates one or more documents in a collection
   *
   * @return {EventEmitter}  emits a 'leftJoin' (success) or 'leftJoin-error' (error)  event
   *
   */
  letfJoin(
    collectionOne = "users",
    collectionTwo = "contacts",
    localField = "_id",
    foreignField = "user_id",
    as = "usersContacts"
  ) {
    this.on("validatedLeftJoinItems", () => {
      this.letfJoinCallback(
        collectionOne,
        collectionTwo,
        localField,
        foreignField,
        as
      );
    });
    this.validateLeftJoinItems(
      collectionOne,
      collectionTwo,
      localField,
      foreignField,
      as,
      "letfJoin-error"
    );
  }

  /**
   * @name findById
   * @function
   *
   * @param {String} id collection document id
   * @param {String} collectionName database collection name string
   *
   * @description Finds/fetches/gets by id the first occurrent document in a collection
   *
   * @return {EventEmitter}  emits a 'findById' (success) or 'findById-error' (error)  event
   *
   */
  findById(id, collectionName = this.collection) {
    this.on("validatedId", () => {
      this.findByIdCallback(id, collectionName);
    });
    this.validateId(id, "findById-error");
  }

  /**
   * @name findByEmail
   * @function
   *
   * @param {Object} email database collection document email property value
   * @param {String} collectionName database collection name string
   *
   * @description Finds/fetches/gets by email the first occurrent document in a collection
   *
   * @return {EventEmitter}  emits a 'findByEmail' (success) or 'findByEmail-error' (error)  event
   *
   */
  findByEmail(email, collectionName = this.collection) {
    this.on("validatedEmail", () => {
      this.findByEmailCallback(email, collectionName);
    });
    this.validateEmail(email, "findByEmail-error");
  }

  /**
   * @name firstByEmail
   * @function
   *
   * @param {Object} email database collection document email property value
   * @param {String} collectionName database collection name string
   *
   * @description Finds/fetches/gets by email the first occurrent document in a collection
   *
   * @return {EventEmitter}  emits a 'firstByEmail' (success) or 'firstByEmail-error' (error)  event
   *
   */
  firstByEmail(email, collectionName = this.collection) {
    this.on("validatedEmail", () => {
      this.firstByEmailCallback(email, collectionName);
    });
    this.validateEmail(email, "firstByEmail-error");
  }

  /**
   * @name firstByUsername
   * @function
   *
   * @param {Object} username  database collection document username property value
   * @param {String} collectionName database collection name string
   *
   * @description Finds/fetches/gets by username the first occurrent document in a collection
   *
   * @return {EventEmitter}  emits a 'firstByUsername' (success) or 'firstByUsername-error' (error)  event
   *
   */
  firstByUsername(username, collectionName = this.collection) {
    this.on("validatedUsername", () => {
      this.firstByUsernameCallback(username, collectionName);
    });
    this.validateUsername(username, "firstByUsername-error");
  }

  /**
   * @name firstByPhone
   * @function
   *
   * @param {Object} phone database collection document phone property value
   * @param {String} collectionName database collection name string
   *
   * @description Finds/fetches/gets by phone the first occurrent document in a collection
   *
   * @return {EventEmitter}  emits a 'firstByPhone' (success) or 'firstByPhone-error' (error)  event
   *
   */
  firstByPhone(phone, collectionName = this.collection) {
    this.on("validatedPhone", () => {
      this.firstByPhoneCallback(phone, collectionName);
    });
    this.validatePhone(phone, "firstByPhone-error");
  }

  /**
   * @name firstByFirstName
   * @function
   *
   * @param {Object} firstname database collection document firstname property value
   * @param {String} collectionName database collection name string
   *
   * @description Finds/fetches/gets by firstname the first occurrent document in a collection
   *
   * @return {EventEmitter}  emits a 'firstByFirstName' (success) or 'firstByFirstName-error' (error)  event
   *
   */
  firstByFirstName(firstname, collectionName = this.collection) {
    this.on("validatedFirstName", () => {
      this.firstByFirstName(firstname, collectionName);
    });
    this.validateFirstName(firstname, "firstByFirstName-error");
  }

  /**
   * @name firstByLastName
   * @function
   *
   * @param {String} lastname database collection document lastname property value
   * @param {String} collectionName database collection name string
   *
   * @description Finds/fetches/gets by lastname the first occurrent document in a collection
   *
   * @return {EventEmitter}  emits a 'firstByLastName' (success) or 'firstByLastName-error' (error)  event
   *
   */
  firstByLastName(lastname, collectionName = this.collection) {
    this.on("validatedLastName", () => {
      this.firstByLastNameCallback(lastname, collectionName);
    });
    this.validateLastName(lastname, "firstByLastName-error");
  }

  /**
   * @name findByFieldName
   * @function
   *
   * @param {String} fieldname database collection document 'fieldname' property value
   * @param {String} collectionName database collection name string
   *
   * @description Finds/fetches/gets by fieldname the first occurrent document in a collection
   *
   * @return {EventEmitter}  emits a 'findByFieldName' (success) or 'findByFieldName-error' (error)  event
   *
   */
  // findByFieldName(fieldname, collectionName = this.collection) {
  //   if (fieldname && typeof fieldname !== "string") return this.emit("findByFieldName-error", {error: 'input field name must be a string'});
  //   const dbfn = (error, db) => {
  //     if (error) return this.emit("findByFieldName-error", error)
  //     const dbs = db.db(this.db);

  //     const cfn = (err, res) => {
  //       if (err) return this.emit("findByFieldName-error", err)
  //       if(!res || res == undefined) this.emit("findByFieldName", {});
  //       this.emit("findByFieldName", res);
  //       db.close();
  //     };
  //     dbs.collection(collectionName).findOne(this.fieldName(fieldname), cfn);
  //   };
  //   this.connect(dbfn);
  // }

  /**
   * @name findByQuery
   * @function
   *
   * @param {Object} query query/input document (data) to create/insert
   * @param {String} collectionName database collection name string
   *
   * @description Finds/fetches/gets one or more document in a collection
   *
   * @return {EventEmitter}  emits a 'findByQuery' (success) or 'findByQuery-error' (error)  event
   *
   */
  findByQuery(query = {}, projection = {}, collectionName = this.collection) {
    this.on("validatedQueryProjection", () => {
      this.findByQueryCallback(query, projection, collectionName);
    });
    this.validateQueryProjection(query, projection, "findByQuery-error");
  }

  /**
   * @name firstByQuery
   * @function
   *
   * @param {Object} query query/input document (data) to create/insert
   * @param {String} collectionName database collection name string
   *
   * @description Finds/fetches/gets first occurrent document in a collection
   *
   * @return {EventEmitter}  emits a 'firstByQuery' (success) or 'firstByQuery-error' (error)  event
   *
   */
  firstByQuery(query = {}, collectionName = this.collection) {
    this.on("validatedQuery", () => {
      this.firstByQueryCallback(query, collectionName);
    });
    this.validateQuery(query, "firstByQuery-error");
  }




   /**
   * @name firstByToken
   * @function
   *
   * @param {Object} username  database collection document username property value
   * @param {String} collectionName database collection name string
   *
   * @description Finds/fetches/gets by username the first occurrent document in a collection
   *
   * @return {EventEmitter}  emits a 'firstByToken' (success) or 'firstByToken-error' (error)  event
   *
   */
    firstByToken(token, collectionName = this.collection) {
      this.on("validatedToken", () => {
        this.firstByTokenCallback(token, collectionName);
      });
      this.validateToken(token, "firstByToken-error");
    }

}

module.exports = Callback;

