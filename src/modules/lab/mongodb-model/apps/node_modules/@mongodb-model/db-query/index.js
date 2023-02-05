"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module CallbackQuery
 * @kind class
 *
 * @extends Base
 * @requires Base
 * @requires MongoClient
 * @requires ObjectId
 * @requires EventEmitter
 *
 * @classdesc CallbackQuery class
 */

const { EventEmitter } = require("events");
const { MongoClient, ObjectId } = require("mongodb");

require('dotenv').config()
class CallbackQuery extends require("./base") {
    constructor(...arrayOfObjects) {

        super({ objectMode: true, encoding: "utf-8", autoDestroy: true });
    
        arrayOfObjects.forEach(option => {
            if(Object.keys(option).length > 0){
                Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
            }
        });
    
        // auto bind methods
        this.autobind(CallbackQuery);
        // auto invoke methods
        this.autoinvoker(CallbackQuery);
        // add other classes method if methods do not already exist. Argument order matters!
        // this.methodizer(..classList);
        //Set the maximum number of listeners to infinity
        this.setMaxListeners(Infinity);
      }

  /**
   * @name initCallbackConfig
   * @function
   *
   *
   * @description makes a database connections using database connection environment variables
   *
   * @return does not return anything
   *
   */
  initQueryConfig() {
  
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
    return ["initQueryConfig"];
  }

  /**
   * @name trimmer
   * @function
   *
   * @param {String} methodName method name string
   * @param {String} error error event name string
   * @param {String} condition condition string
   *
   * @description assigns success and error event names
   *
   * @return {String}  success or error event name
   *
   */

  trimmer(methodName, error, condition = "db-query") {
    const nameString = methodName
      .split(" ")
      .filter((str) => str.trim().length !== 0);
    if (nameString.length == 2) {
      if (error) return `${nameString[1]}-${error}`;
      return nameString[1];
    } else if (nameString.length == 1) {
      if (error) return `${nameString}-${error}`;
      return nameString;
    } else {
      if (error) return `${condition}-${error}`;
      return condition;
    }
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

  createDatabaseCallback(databaseName = this.db) {
    const dbFn = (error, db) => {
      if (error) return this.emit("createDatabase-error", error);
      this.emit("createDatabase", db);
      db.close();
    };
    MongoClient.connect(
      this.uri,
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
  createCollectionCallback(collectionName = this.collection) {
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
  insertOneCallback(data = {}, collectionName = this.collection) {
    const dbfn = (error, db) => {
      if (error) return this.emit("insertOne-error", error);
      
      const dbs = db.db(this.db);

      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("insertOne-error", err);
        }

        this.emit("insertOne", res);
        db.close();
      };
      dbs.collection(collectionName).insertOne(data, cfn);
    };
    this.connect(dbfn);
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
  createCallback(data = {}, collectionName = this.collection) {
    const dbfn = (error, db) => {
      if (error) return this.emit("create-error", error);

      const dbs = db.db(this.db);

      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("create-error", err);
        }

        this.emit("create", res);

        db.close();
      };
      dbs.collection(collectionName).insertOne(data, cfn);
    };
    this.connect(dbfn);
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
  insertManyCallback(data = [], collectionName = this.collection) {
    if (!Array.isArray(data)) {
      return this.emit("insertMany-error", {
        error: "input data must be an array of objects",
      });
    }
    const dbfn = (error, db) => {
      if (error) return this.emit("insertMany-error", error);
      
      const dbs = db.db(this.db);

      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("insertMany-error", err);
        }
        this.emit("insertMany", res);

        db.close();
      };
      dbs.collection(collectionName).insertMany(data, cfn);
    };
    this.connect(dbfn);
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
  createManyCallback(data = [], collectionName = this.collection) {
    const dbfn = (error, db) => {
      if (error) return this.emit("createMany-error", error);
      
      const dbs = db.db(this.db);

      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("createMany-error", err);
        }
        this.emit("createMany", res);
        db.close();
      };
      dbs.collection(collectionName).insertMany(data, cfn);
    };
    this.connect(dbfn);
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
  findOneCallback(query = {}, collectionName = this.collection) {
    const dbfn = (error, db) => {
      if (error) return this.emit("findOne-error", error);
      
      const dbs = db.db(this.db);

      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("findOne-error", err);
        }
        if (!res || res === undefined) this.emit("findOne", {});
        this.emit("findOne", res);
        db.close();
      };
      dbs.collection(collectionName).findOne(query, cfn);
    };
    this.connect(dbfn);
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
  firstCallback(query = {}, collectionName = this.collection) {
    const dbfn = (error, db) => {
      if (error) return this.emit("first-error", error);
      
      const dbs = db.db(this.db);

      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("first-error", err);
        }
        if (!res || res === undefined) this.emit("first", {});
        this.emit("first", res);
        db.close();
      };
      dbs.collection(collectionName).findOne(query, cfn);
    };
    this.connect(dbfn);
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
  findCallback(query = {}, projection = {}, collectionName = this.collection) {
    const dbfn = (error, db) => {
      if (error) return this.emit("find-error", error);
      
      const dbs = db.db(this.db);

      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("find-error", err);
        }
        if (!res || res === undefined) this.emit("find", []);
        this.emit("find", res);
        db.close();
      };
      dbs.collection(collectionName).find(query, projection).toArray(cfn);
    };
    this.connect(dbfn);
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
  allCallback(query = {}, projection = {}, collectionName = this.collection) {
    const dbfn = (error, db) => {
      if (error) return this.emit("all-error", error);
      

      const dbs = db.db(this.db);
      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("all-error", err);
        }
        this.emit("all", res);
        db.close();
      };
      dbs.collection(collectionName).find(query, projection).toArray(cfn);
    };
    this.connect(dbfn);
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
  sortCallback(
    query = {},
    sort = {},
    projection = {},
    collectionName = this.collection
  ) {
    const dbfn = (error, db) => {
      if (error) return this.emit("sort-error", error);
      
      const dbs = db.db(this.db);

      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("sort-error", err);
        }
        this.emit("sort", res);
        db.close();
      };
      dbs
        .collection(collectionName)
        .find(query, projection)
        .sort(sort)
        .toArray(cfn);
    };
    this.connect(dbfn);
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
  deleteOneCallback(query = {}, collectionName = this.collection) {
    const dbfn = (error, db) => {
      if (error) return this.emit("deleteOne-error", error);
      
      const dbs = db.db(this.db);
      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("deleteOne-error", err);
        }
        const { result, deletedCount } = res;
        this.emit("deleteOne", { result, deletedCount });
        db.close();
      };
      dbs.collection(collectionName).deleteOne(query, cfn);
    };
    this.connect(dbfn);
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
  deleteManyCallback(query = {}, collectionName = this.collection) {
    const dbfn = (error, db) => {
      if (error) return this.emit("deleteMany-error", error);
      
      const dbs = db.db(this.db);
      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("deleteMany-error", err);
        }
        this.emit("deleteMany", res);
        db.close();
      };
      dbs.collection(collectionName).deleteMany(query, cfn);
    };
    this.connect(dbfn);
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
  dropCollectionCallback(collectionName = this.collection, dbName = this.db) {
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
  collectionDropCallback(dbName = this.db, collectionName = this.collection) {
    const dbfn = (error, db) => {
      if (error)  return this.emit("collectionDrop-error", error);
      
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
  updateOneCallback(query = {}, data = {}, collectionName = this.collection) {
    const dbfn = (error, db) => {
      if (error) return this.emit("updateOne-error", error);
      
      const dbs = db.db(this.db);
      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("updateOne-error", err);
        }
        // this.emit('updateOne', { obj: res.ops[0], insertedCount: res.insertedCount, insertedId: res.insertedId });
        const {
          modifiedCount,
          upsertedId,
          upsertedCount,
          matchedCount,
          result,
        } = res;
        this.emit("updateOne", {
          result,
          modifiedCount,
          upsertedId,
          upsertedCount,
          matchedCount,
        });
        db.close();
      };
      dbs.collection(collectionName).updateOne(query, { $set: data }, cfn);
    };
    this.connect(dbfn);
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
  updateCallback(query = {}, data = {}, collectionName = this.collection) {
    const dbfn = (error, db) => {
      if (error) return this.emit("update-error", error);
      
      const dbs = db.db(this.db);

      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("update-error", err);
        }
        this.emit("update", res);
        db.close();
      };
      dbs.collection(collectionName).updateOne(query, { $set: data }, cfn);
    };
    this.connect(dbfn);
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
  updateManyCallback(query = {}, data = {}, collectionName = this.collection) {
    const dbfn = (error, db) => {
      if (error) return this.emit("updateMany-error", error);
      
      const dbs = db.db(this.db);
      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("updateMany-error", err);
        }
        this.emit("updateMany", res);
        db.close();
      };
      dbs.collection(collectionName).updateMany(query, { $set: data }, cfn);
    };
    this.connect(dbfn);
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
  limitCallback(
    query = {},
    limit = 1,
    projection = {},
    collectionName = this.collection
  ) {
    const dbfn = (error, db) => {
      if (error) return this.emit("limit-error", error);
      
      const dbs = db.db(this.db);

      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("limit-error", err);
        }
        this.emit("limit", res);
        db.close();
      };
      dbs
        .collection(collectionName)
        .find(query, projection)
        .limit(limit)
        .toArray(cfn);
    };
    this.connect(dbfn);
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
  Callback(
    collectionOne = "users",
    collectionTwo = "contacts",
    localField = "_id",
    foreignField = "user_id",
    as = "usersContacts"
  ) {
    const dbfn = (error, db) => {
      if (error) return this.emit("letfJoin-error", error);
      
      const dbs = db.db(this.db);

      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("letfJoin-error", err);
        }
        this.emit("leftJoin", res);
        db.close();
      };
      dbs
        .collection(collectionOne)
        .aggregate([
          {
            $lookup: {
              from: collectionTwo,
              localField,
              foreignField,
              as,
            },
          },
        ])
        // .find(query, projection)
        // .limit(limit)
        .toArray(cfn);
    };
    this.connect(dbfn);
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
  findByIdCallback(id, collectionName = this.collection) {
    const dbfn = (error, db) => {
      if (error) return this.emit("findById-error", error);
      
      const dbs = db.db(this.db);

      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("findById-error", err);
        }
        if (!res || res == undefined) this.emit("findById", {});
        this.emit("findById", res);
        db.close();
      };
      dbs.collection(collectionName).findOne({ _id: ObjectId(id) }, cfn);
    };
    this.connect(dbfn);
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
  findByEmailCallback(email, collectionName = this.collection) {
    const dbfn = (error, db) => {
      if (error) return this.emit("findByEmail-error", error);
      
      const dbs = db.db(this.db);

      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("findByEmail-error", err);
        }
        if (!res || res == undefined) this.emit("findByEmail", {});
        this.emit("findByEmail", res);
        db.close();
      };
      dbs.collection(collectionName).findOne({ email }, cfn);
    };
    this.connect(dbfn);
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
  firstByEmailCallback(email, collectionName = this.collection) {
    const dbfn = (error, db) => {
      if (error) return this.emit("firstByEmail-error", error);
      
      const dbs = db.db(this.db);

      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("firstByEmail-error", err);
        }
        if (!res || res == undefined) this.emit("firstByEmail", {});
        this.emit("firstByEmail", res);
        db.close();
      };
      dbs.collection(collectionName).findOne({ email }, cfn);
    };
    this.connect(dbfn);
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
  firstByUsernameCallback(username, collectionName = this.collection) {
    const dbfn = (error, db) => {
      if (error) return this.emit("firstByUsername-error", error);
      
      const dbs = db.db(this.db);

      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("firstByUsername-error", err);
        }
        if (!res || res == undefined) this.emit("firstByUsername", {});
        this.emit("firstByUsername", res);
        db.close();
      };
      dbs.collection(collectionName).findOne({ username }, cfn);
    };
    this.connect(dbfn);
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
  firstByPhoneCallback(phone, collectionName = this.collection) {
    const dbfn = (error, db) => {
      if (error) return this.emit("firstByPhone-error", error);
      
      const dbs = db.db(this.db);

      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("firstByPhone-error", err);
        }
        if (!res || res == undefined) this.emit("firstByPhone", {});
        this.emit("firstByPhone", res);
        db.close();
      };
      dbs.collection(collectionName).findOne({ phone }, cfn);
    };
    this.connect(dbfn);
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
  firstByFirstNameCallback(firstname, collectionName = this.collection) {
    const dbfn = (error, db) => {
      if (error) return this.emit("firstByFirstName-error", error);
      
      const dbs = db.db(this.db);

      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("firstByFirstName-error", error);
        }
        if (!res || res == undefined) this.emit("firstByFirstName", {});
        this.emit("firstByFirstName", res);
        db.close();
      };
      dbs.collection(collectionName).findOne({ firstname }, cfn);
    };
    this.connect(dbfn);
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
  firstByLastNameCallback(lastname, collectionName = this.collection) {
    const dbfn = (error, db) => {
      if (error) return this.emit("firstByLastName-error", error);
      
      const dbs = db.db(this.db);

      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("firstByLastName-error", error);
        }
        if (!res || res == undefined) this.emit("firstByLastName", {});
        this.emit("firstByLastName", res);
        db.close();
      };
      dbs.collection(collectionName).findOne({ lastname }, cfn);
    };
    this.connect(dbfn);
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
  findByQueryCallback(
    query = {},
    projection = {},
    collectionName = this.collection
  ) {
    const dbfn = (error, db) => {
      if (error) return this.emit("findByQuery-error", error);
      
      const dbs = db.db(this.db);

      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("findByQuery-error", err);
        }
        this.emit("findByQuery", res);
        db.close();
      };
      dbs.collection(collectionName).find(query, projection).toArray(cfn);
    };
    this.connect(dbfn);
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
  firstByQueryCallback(query = {}, collectionName = this.collection) {
    const dbfn = (error, db) => {
      if (error) return this.emit("firstByQuery-error", error);

      const dbs = db.db(this.db);

      const cfn = (err, res) => {
        if (err) {
          db.close();
          return this.emit("firstByQuery-error", err);
        }

        if (!res || res == undefined) this.emit("firstByQuery", {});
        this.emit("firstByQuery", res);
        db.close();
      };
      dbs.collection(collectionName).findOne(query, cfn);
    };
    this.connect(dbfn);
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
     firstByTokenCallback(token, collectionName = this.collection) {
      const dbfn = (error, db) => {
        if (error) return this.emit("firstByTokenCallback-error", error);
        
        const dbs = db.db(this.db);
  
        const cfn = (err, res) => {
          if (err) {
            db.close();
            return this.emit("firstByTokenCallback-error", err);
          }
          if (!res || res == undefined) this.emit("firstByTokenCallback", {});
          this.emit("firstByTokenCallback", res);
          db.close();
        };
        dbs.collection(collectionName).findOne({token: token }, cfn);
      };
      this.connect(dbfn);
    }
}

module.exports = CallbackQuery;


