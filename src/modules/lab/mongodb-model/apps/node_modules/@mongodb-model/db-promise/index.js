"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module AsyncAwait
 * @kind class
 *
 * @extends Base
 * @requires Base
 * @requires Env
 * @requires MongoClient
 * @requires ObjectId
 *
 * @classdesc AsyncAwait class
 */

const { MongoClient, ObjectId } = require("mongodb");

require('dotenv').config()
class AsyncAwait extends require("./base") {
    constructor(...arrayOfObjects) {

        super({ objectMode: true, encoding: "utf-8", autoDestroy: true });
    
        arrayOfObjects.forEach(option => {
            if(Object.keys(option).length > 0){
                Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
            }
        });
    
        // auto bind methods
        this.autobind(AsyncAwait);
        // auto invoke methods
        this.autoinvoker(AsyncAwait);
        // add other classes method if methods do not already exist. Argument order matters!
        // this.methodizer(..classList);
        //Set the maximum number of listeners to infinity
        this.setMaxListeners(Infinity);
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
   * @name awaitInsertOne
   * @function
   *
   * @param {Object} data query/input document (data) to create/insert
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description Creates/adds/inserts a document in a collection
   *
   * @return {Object}  The result of inserting a document into a database collection
   *
   */

  async awaitInsertOne(
    data = {},
    dbName = this.db,
    collectionName = this.collection,
    client = new MongoClient(this.uri, { useUnifiedTopology: true })
  ) {
    if (data && typeof data !== "object") {
      this.emit("awaitInsertOne-error", {
        error: "input data must be an object",
      });
      this.emit("insertOne-error", {
        error: "input data must be an object",
      });
      return { error: "input data must be an object" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.insertOne(data);

      this.emit("awaitInsertOne", response);
      this.emit("insertOne", response);
      return response;
    } catch (error) {
      this.emit("awaitInsertOne-error", error);
      this.emit("insertOne-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitInsertMany
   * @function
   *
   * @param {Object} data query/input document (data) to create/insert
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description creates/adds/inserts one or more documents in a collection
   *
   * @return {Object}  The result of inserting one or more documents into database collection
   *
   */
  async awaitInsertMany(
    data = {},
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.uri, { useUnifiedTopology: true })
  ) {
    if (!data || !Array.isArray(data)) {
      this.emit("awaitInsertMany-error", {
        error: "input data must be an array of objects",
      });
      this.emit("insertMany-error", {
        error: "input data must be an array of objects",
      });
      return { error: "input data must be an array of objects" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.insertOne(data);

      this.emit("awaitInsertMany", response);
      this.emit("insertMany", response);
      return response;
    } catch (error) {
      this.emit("awaitInsertMany-error", error);
      this.emit("insertMany-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitCreateMany
   * @function
   *
   * @param {Object} data query/input document (data) to create/insert
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description creates/adds/inserts one or more documents in a collection
   *
   * @return {Object}  The result of inserting one or more documents into database collection
   *
   */
  async awaitCreateMany(
    data = {},
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.uri, { useUnifiedTopology: true })
  ) {
    if (!data || !Array.isArray(data)) {
      this.emit("awaitCreateMany-error", {
        error: "input data must be an array of objects",
      });
      this.emit("createMany-error", {
        error: "input data must be an array of objects",
      });
      return { error: "input data must be an array of objects" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.insertOne(data);

      this.emit("awaitCreateMany", response);
      this.emit("createMany", response);
      return response;
    } catch (error) {
      this.emit("awaitCreateMany-error", error);
      this.emit("createMany-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitCreate
   * @function
   *
   * @param {Object} data query/input document (data) to create/insert
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description creates/adds/inserts one or more documents in a collection
   *
   * @return {Object}  The result of inserting one or more documents into database collection
   *
   */
  async awaitCreate(
    data = {},
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.uri, { useUnifiedTopology: true })
  ) {
    if (data && typeof data !== "object") {
      this.emit("awaitCreate-error", { error: "input data must be an object" });
      this.emit("create-error", { error: "input data must be an object" });
      return { error: "input data must be an object" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.insertOne(data);

      this.emit("awaitCreate", response);
      this.emit("create", response);
      return response;
    } catch (error) {
      this.emit("awaitCreate-error", error);
      this.emit("create-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitFindOne
   * @function
   *
   * @param {Object} query query data
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description finds/fetches the first document satisfying the input query in a collection
   *
   * @return {Object}  The document object found in a collection as a result of the query search
   *
   */

  async awaitFindOne(
    query = {},
    dbName = this.db,
    collectionName = this.collection,
    client = new MongoClient(this.uri, { useUnifiedTopology: true })
  ) {
    if (query && typeof query !== "object") {
      this.emit("awaitFindOne-error", {
        error: "input query must be an object",
      });
      this.emit("findOne-error", {
        error: "input query must be an object",
      });
      return { error: "input data must be an object" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.findOne(query);

      this.emit("awaitFindOne", response);
      this.emit("findOne", response);
      return response;
    } catch (error) {
      this.emit("awaitFindOne-error", error);
      this.emit("findOne-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitFirst
   * @function
   *
   * @param {Object} query query data
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description finds/fetches the first document satisfying the input query in a collection
   *
   * @return {Object}  The document object found in a collection as a result of the query search
   *
   */
  async awaitFirst(
    query = {},
    dbName = this.db,
    collectionName = this.collection,
    client = new MongoClient(this.uri, { useUnifiedTopology: true })
  ) {
    if (query && typeof query !== "object") {
      this.emit("awaitFirst-error", { error: "input query must be an object" });
      this.emit("first-error", { error: "input query must be an object" });
      return { error: "input data must be an object" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.findOne(query);

      this.emit("awaitFirst", response);
      this.emit("first", response);
      return response;
    } catch (error) {
      this.emit("awaitFirst-error", error);
      this.emit("first-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitFind
   * @function
   *
   * @param {Object} query query data
   * @param {Object} projection database collection document search projection object
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description finds one or more documents satisfying the input query in a collection
   *
   * @return {Object}  The document objects found in a collection as a result of the query search
   *
   */
  async awaitFind(
    query = {},
    projection = {},
    dbName = this.db,
    collectionName = this.collection,
    client = new MongoClient(this.uri, { useUnifiedTopology: true })
  ) {
    if (query && typeof query !== "object") {
      this.emit("awaitFind-error", { error: "input query must be an object" });
      this.emit("find-error", { error: "input query must be an object" });
      return { error: "input query must be an object" };
    }
    if (projection && typeof projection !== "object") {
      this.emit("awaitFind-error", {
        error: "projection query must be an object",
      });
      this.emit("find-error", {
        error: "projection query must be an object",
      });
      return { error: "projection query must be an object" };
    }

    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.find(query, projection).toArray();

      this.emit("awaitFind", response);
      this.emit("find", response);
      return response;
    } catch (error) {
      this.emit("awaitFind-error", error);
      this.emit("find-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitAll
   * @function
   *
   * @param {Object} query query data
   * @param {Object} projection database collection document search projection object
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description finds one or more documents satisfying the input query in a collection
   *
   * @return {Object}  The document objects found in a collection as a result of the query search
   *
   */
  async awaitAll(
    query = {},
    projection = {},
    dbName = this.db,
    collectionName = this.collection,
    client = new MongoClient(this.uri, { useUnifiedTopology: true })
  ) {
    if (query && typeof query !== "object") {
      this.emit("awaitAll-error", { error: "input query must be an object" });
      this.emit("all-error", { error: "input query must be an object" });
      return { error: "input query must be an object" };
    }
    if (projection && typeof projection !== "object") {
      this.emit("awaitAll-error", {
        error: "projection query must be an object",
      });
      this.emit("all-error", {
        error: "projection query must be an object",
      });
      return { error: "projection query must be an object" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.find(query, projection).toArray();

      this.emit("awaitAll", response);
      this.emit("all", response);
      return response;
    } catch (error) {
      this.emit("awaitAll-error", error);
      this.emit("all-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitSort
   * @function
   *
   * @param {Object} query query data
   * @param {Object} projection database collection document search projection object
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description finds/fetches and sorts one or more documents satisfying the input query in a collection
   *
   * @return {Object}  The document objects found in a collection as a result of the query search
   *
   */
  async awaitSort(
    query = {},
    sort = {},
    projection = {},
    dbName = this.db,
    collectionName = this.collection,
    client = new MongoClient(this.uri, { useUnifiedTopology: true })
  ) {
    if (query && typeof query !== "object") {
      this.emit("awaitSort-error", { error: "input query must be an object" });
      this.emit("sort-error", { error: "input query must be an object" });
      return { error: "input query must be an object" };
    }
    if (sort && typeof sort !== "object") {
      this.emit("awaitSort-error", { error: "sort query must be an object" });
      this.emit("sort-error", { error: "sort query must be an object" });

      return { error: "sort query must be an object" };
    }
    if (projection && typeof projection !== "object") {
      this.emit("awaitSort-error", {
        error: "projection query must be an object",
      });
      this.emit("sort-error", {
        error: "projection query must be an object",
      });
      return { error: "projection query must be an object" };
    }

    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.find(query, projection).sort(sort).toArray();

      this.emit("awaitSort", response);
      this.emit("sort", response);
      return response;
    } catch (error) {
      this.emit("awaitSort-error", error);
      this.emit("sort-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitDeleteOne
   * @function
   *
   * @param {Object} query query data
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description deletes/removes first occurrence document satisfying the input query in a collection
   *
   * @return {Object}  The resulting object of a document deletion/removal from a collection as a result of the query
   *
   */
  async awaitDeleteOne(
    query = {},
    dbName = this.db,
    collectionName = this.collection,
    client = new MongoClient(this.uri, { useUnifiedTopology: true })
  ) {
    if (query && typeof query !== "object") {
      this.emit("awaitDeleteOne-error", {
        error: "input query must be an object",
      });
      this.emit("deleteOne-error", {
        error: "input query must be an object",
      });
      return { error: "input query must be an object" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.deleteOne(query);

      this.emit("awaitDeleteOne", response);
      this.emit("deleteOne", response);
      return response;
    } catch (error) {
      this.emit("awaitDeleteOne-error", error);
      this.emit("deleteOne-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitDeleteMany
   * @function
   *
   * @param {Object} query query data
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description deletes/removes one or more documents satisfying the input query in a collection
   *
   * @return {Object}  The resulting object of one or more documents deletion/removal from a collection as a result of the query
   *
   */
  async awaitDeleteMany(
    query = {},
    dbName = this.db,
    collectionName = this.collection,
    client = new MongoClient(this.uri, { useUnifiedTopology: true })
  ) {
    if (query && typeof query !== "object") {
      this.emit("awaitDeleteMany-error", {
        error: "input query must be an object",
      });
      this.emit("deleteMany-error", {
        error: "input query must be an object",
      });
      return { error: "input query must be an object" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.deleteMany(query);

      this.emit("awaitDeleteMany", response);
      this.emit("deleteMany", response);
      return response;
    } catch (error) {
      this.emit("awaitDeleteMany-error", error);
      this.emit("deleteMany-error", error);
      return response;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitDropCollection
   * @function
   *
   * @param {String} collectionName database collection name string
   * @param {String} dbName database name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description drops/deletes/removes a database collection by collection name
   *
   * @return {Object}  the result of dropping a database collection
   *
   */
  async awaitDropCollection(
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.uri, { useUnifiedTopology: true })
  ) {
    if (collectionName && typeof collectionName !== "string") {
      this.emit("waitDropCollection-error", {
        error: "collection name must a string",
      });
      this.emit("dropCollection-error", {
        error: "collection name must a string",
      });
      return { error: "collection name must a string" };
    }

    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.drop();

      if (response) {
        this.emit(
          "awaitDropCollection",
          `collection ${collectionName} dropped from ${dbName}!`
        );
        this.emit(
          "dropCollection",
          `collection ${collectionName} dropped from ${dbName}!`
        );
        return `collection ${collectionName} dropped from ${dbName}!`;
      } else {
        this.emit("awaitDropCollection-error", { error: "Nothing happened" });
        this.emit("dropCollection-error", { error: "Nothing happened" });
        return { error: "Nothing happened" };
      }
    } catch (error) {
      this.emit("awaitDropCollection-error", error);
      this.emit("dropCollection-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitCollectionDrop
   * @function
   *
   * @param {String} collectionName database collection name string
   * @param {String} dbName database name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description drops/deletes/removes a database collection by collection name
   *
   * @return {Object}  the result of dropping a database collection
   *
   */

  async awaitCollectionDrop(
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.uri, { useUnifiedTopology: true })
  ) {
    if (collectionName && typeof collectionName !== "string") {
      this.emit("awaitCollectionDrop-error", {
        error: "collection name must a string",
      });
      this.emit("collectionDrop-error", {
        error: "collection name must a string",
      });
      return { error: "collection name must a string" };
    }

    try {
      await client.connect();
      const database = client.db(dbName);
      const response = await database.dropCollection(collectionName);
      if (response) {
        this.emit(
          "awaitCollectionDrop",
          `collection ${collectionName} dropped from ${dbName}!`
        );
        this.emit(
          "collectionDrop",
          `collection ${collectionName} dropped from ${dbName}!`
        );
        return `collection ${collectionName} dropped from ${dbName}!`;
      } else {
        this.emit("awaitCollectionDrop-error", { error: "Nothing happened" });
        this.emit("collectionDrop-error", { error: "Nothing happened" });
        return { error: "Nothing happened" };
      }
    } catch (error) {
      this.emit("awaitCollectionDrop-error", error);
      this.emit("collectionDrop-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  /**
   * @name awaitCreateCollection
   * @function
   *
   * @param {String} collectionName database collection name string
   * @param {String} dbName database name string
   * @param {Object} options an object representing a collection schema
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description creates/adds a collection from optional input schema object
   *
   * @return {Object|Stream}  a database collection
   *
   */
  async awaitCreateCollection(
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.uri, { useUnifiedTopology: true })
  ) {
    if (collectionName && typeof collectionName !== "string") {
      this.emit("awaitCreateCollection-error", {
        error: "collection name must a string",
      });
      this.emit("createCollection-error", {
        error: "collection name must a string",
      });
      return { error: "collection name must a string" };
    }

    try {
      await client.connect();
      const database = client.db(dbName);
      const response = await database.createCollection(collectionName);

      if (response) {
        this.emit(
          "awaitCreateCollection",
          `collection ${collectionName} created for ${dbName}!`
        );
        this.emit(
          "createCollection",
          `collection ${collectionName} created for ${dbName}!`
        );
        return `collection ${collectionName} created for ${dbName}!`;
      } else {
        this.emit("awaitCreateCollection-error", "Nothing happened.");
        this.emit("createCollection-error", "Nothing happened.");
        return "Nothing happened.";
      }
    } catch (error) {
      this.emit("awaitCreateCollection-error", error);
      this.emit("createCollection-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitUpdateOne
   * @function
   *
   * @param {Object} query query object
   * @param {Object} data new data object as replacement for a collection document
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description updates first occurrent document satisfying the input query in a collection
   *
   * @return {Object}  The resulting object of a document update from a collection as a result of the query
   *
   */
  async awaitUpdateOne(
    query = {},
    data = {},
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.uri, { useUnifiedTopology: true })
  ) {
    if (query && typeof query !== "object") {
      this.emit("awaitUpdateOne-error", {
        error: "input query must be an object",
      });
      this.emit("updateOne-error", {
        error: "input query must be an object",
      });
      return { error: "input query must be an object" };
    }
    if (data && typeof data !== "object") {
      this.emit("awaitUpdateOne-error", {
        error: "input data must be an object",
      });
      this.emit("updateOne-error", {
        error: "input data must be an object",
      });
      return { error: "input data must be an object" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.updateOne(query, { $set: data });

      this.emit("awaitUpdateOne", response);
      this.emit("updateOne", response);
      return response;
    } catch (error) {
      this.emit("awaitUpdateOne-error", error);
      this.emit("updateOne-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
    k;
  }

  /**
   * @name awaitUpdate
   * @function
   *
   * @param {Object} query query object
   * @param {Object} data new data object as replacement for a collection document
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description updates first occurrent document satisfying the input query in a collection
   *
   * @return {Object}  The resulting object of a document update from a collection as a result of the query
   *
   */

  async awaitUpdate(
    query = {},
    data = {},
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.uri, { useUnifiedTopology: true })
  ) {
    if (query && typeof query !== "object") {
      this.emit("awaitUpdate-error", {
        error: "input query must be an object",
      });
      this.emit("update-error", {
        error: "input query must be an object",
      });
      return { error: "input query must be an object" };
    }
    if (data && typeof data !== "object") {
      this.emit("awaitUpdate-error", { error: "input data must be an object" });
      this.emit("update-error", { error: "input data must be an object" });
      return { error: "input data must be an object" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.updateOne(query, { $set: data });

      this.emit("awaitUpdate", response);
      this.emit("update", response);
      return response;
    } catch (error) {
      this.emit("awaitUpdate-error", error);
      this.emit("update-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitUpdateMany
   * @function
   *
   * @param {Object} query query object
   * @param {Object} data new data object as replacement for a collection document
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description updates one or more documents satisfying the input query in a collection
   *
   * @return {Object}  The resulting objects of one or more documents update from a collection as a result of the query
   *
   */
  async awaitUpdateMany(
    query = {},
    data = {},
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.uri, { useUnifiedTopology: true })
  ) {
    if (query && typeof query !== "object") {
      this.emit("awaitUpdateMany-error", {
        error: "input query must be an object",
      });
      this.emit("updateMany-error", {
        error: "input query must be an object",
      });
      return { error: "input query must be an object" };
    }

    if (data && !Array.isArray(data) && typeof data !== "object") {
      this.emit("awaitUpdateMany-error", {
        error: "input data must be an array or an object",
      });
      this.emit("updateMany-error", {
        error: "input data must be an array or an object",
      });
      return { error: "input data must be an array or an object" };
    }
    if (data && Array.isArray(data)) {
      for (let datum of data) {
        if (typeof datum !== "object") {
          this.emit("awaitUpdateMany-error", {
            error: "each element of input data must be an object",
          });
          this.emit("updateMany-error", {
            error: "each element of input data must be an object",
          });
          return { error: "each element of input data must be an object" };
        }
      }
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.updateMany(query, { $set: data });

      this.emit("awaitUpdateMany", response);
      this.emit("updateMany", response);
      return response;
    } catch (error) {
      this.emit("awaitUpdateMany-error", error);
      this.emit("updateMany-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitLimit
   * @function
   *
   * @param {Object} query query object
   * @param {Number|Integer} limit limiting number for the total number of documents fetched from the collection
   * @param {Object} data new data object as replacement for a collection document
   * @param {Object} projection database collection document search projection object
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description finds/fetches/gets all documents satisfying the input query in a collection  and limit the number by input limit
   *
   * @return {Object}  The resulting objects of all documents fetched from a collection as a result of the query
   *
   */
  async awaitLimit(
    query = {},
    limit = 1,
    projection = {},
    dbName = this.db,
    collectionName = this.collection,
    client = new MongoClient(this.uri, { useUnifiedTopology: true })
  ) {
    if (query && typeof query !== "object") {
      this.emit("awaitLimit-error", { error: "input query must be an object" });
      this.emit("limit-error", { error: "input query must be an object" });
      return { error: "input query must be an object" };
    }
    if (limit && !Number.isInteger(limit)) {
      this.emit("awaitLimit-error", {
        error: "limit input must be an integer",
      });
      this.emit("limit-error", {
        error: "limit input must be an integer",
      });
      return { error: "limit input must be an integer" };
    }
    if (projection && typeof projection !== "object") {
      this.emit("awaitLimit-error", {
        error: "projection query must be an object",
      });
      this.emit("limit-error", {
        error: "projection query must be an object",
      });
      return { error: "projection query must be an object" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model
        .find(query, projection)
        .limit(limit)
        .toArray();

      this.emit("awaitLimit", response);
      this.emit("limit", response);
      return response;
    } catch (error) {
      this.emit("awaitLimit-error", error);
      this.emit("limit-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitFirstById
   * @function
   *
   * @param {Object|String} id the id of the collection document to fetch
   * @param {Object} data new data object as replacement for a collection document
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description finds/fetches/gets by id the first occurrent document satisfying the input query in a collection
   *
   * @return {Object}  The resulting object of first occurrent document by id fetched from a collection as a result of the query
   *
   */
  async awaitFirstById(
    id,
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.uri, { useUnifiedTopology: true })
  ) {
    if (id && typeof id !== "string" && !Number.isInteger(id)) {
      this.emit("awaitFirstById-error", {
        error: "input id must be a string or a number",
      });
      this.emit("firstById-error", {
        error: "input id must be a string or a number",
      });
      return { error: "input id must be a string or a number" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);

      const response = await model.findOne({ _id: ObjectId(id) });

      this.emit("awaitFirstById", response);
      this.emit("firstById", response);
      return response;
    } catch (error) {
      this.emit("awaitFirstById-error", error);
      this.emit("firstById-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitFirstByEmail
   * @function
   *
   * @param {Object|String} email the email of the collection document to fetch
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description Finds/fetches/gets by email the first occurrent document satisfying the input query in a collection
   *
   * @return {Object}  The resulting object of first occurrent document by email fetched from a collection as a result of the query
   *
   */
  async awaitFirstByEmail(
    email,
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.uri, { useUnifiedTopology: true })
  ) {
    if (email && typeof email !== "string") {
      this.emit("awaitFirstByEmail-error", {
        error: "input email must be a string",
      });
      this.emit("firstByEmail-error", {
        error: "input email must be a string",
      });
      return { error: "input email must be a string" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.findOne({ email });

      this.emit("awaitFirstByEmail", response);
      this.emit("firstByEmail", response);
      return response;
    } catch (error) {
      this.emit("awaitFirstByEmail-error", error);
      this.emit("firstByEmail-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitFindByEmail
   * @function
   *
   * @param {Object|String} email the email of the collection document to fetch
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description Finds/fetches/gets by email the first occurrent document satisfying the input query in a collection
   *
   * @return {Object}  The resulting object of first occurrent document by email fetched from a collection as a result of the query
   *
   */
  async awaitFindByEmail(
    email,
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.uri, { useUnifiedTopology: true })
  ) {
    if (email && typeof email !== "string") {
      this.emit("awaitFindByEmail-error", {
        error: "input email must be a string",
      });
      this.emit("findByEmail-error", {
        error: "input email must be a string",
      });
      return { error: "input email must be a string" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.findOne({ email });

      this.emit("awaitFindByEmail", response);
      this.emit("findByEmail", response);
      return response;
    } catch (error) {
      this.emit("awaitFindByEmail-error", error);
      this.emit("findByEmail-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitFirstByUsername
   * @function
   *
   * @param {Object|String} username the username of the collection document to fetch
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description Finds/fetches/gets by username the first occurrent document satisfying the input query in a collection
   *
   * @return {Object}  The resulting object of first occurrent document by username fetched from a collection as a result of the query
   *
   */

  async awaitFirstByUsername(
    username,
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.uri, { useUnifiedTopology: true })
  ) {
    if (username && typeof username !== "string") {
      this.emit("awaitFirstByUsername-error", {
        error: "input username must be a string",
      });
      this.emit("firstByUsername-error", {
        error: "input username must be a string",
      });
      return { error: "input username must be a string" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.findOne({ username });

      this.emit("awaitFirstByUsername", response);
      this.emit("firstByUsername", response);
      return response;
    } catch (error) {
      this.emit("awaitFirstByUsername-error", error);
      this.emit("firstByUsername-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitFirstByFirstName
   * @function
   *
   * @param {Object|String} firstname the firstname of the collection document to fetch
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description Finds/fetches/gets by firstname the first occurrent document satisfying the input query in a collection
   *
   * @return {Object}  The resulting object of first occurrent document by firstname fetched from a collection as a result of the query
   *
   */

  async awaitFirstByFirstName(
    firstname,
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.uri, { useUnifiedTopology: true })
  ) {
    if (firstname && typeof firstname !== "string") {
      this.emit("awaitFirstByFirstName-error", {
        error: "input first name must be a string",
      });
      this.emit("firstByFirstName-error", {
        error: "input first name must be a string",
      });
      return { error: "input first name must be a string" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.findOne({ firstname });

      this.emit("awaitFirstByFirstName", response);
      this.emit("firstByFirstName", response);
      return response;
    } catch (error) {
      this.emit("awaitFirstByFirstName-error", error);
      this.emit("firstByFirstName-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitFirstByLastName
   * @function
   *
   * @param {Object|String} lastname the lastname of the collection document to fetch
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description Finds/fetches/gets by lastname the first occurrent document satisfying the input query in a collection
   *
   * @return {Object}  The resulting object of first occurrent document by lastname fetched from a collection as a result of the query
   *
   */

  async awaitFirstByLastName(
    lastname,
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.uri, { useUnifiedTopology: true })
  ) {
    if (lastname && typeof lastname !== "string") {
      this.emit("awaitFirstByLastName-error", {
        error: "input last name must be a string",
      });
      this.emit("firstByLastName-error", {
        error: "input last name must be a string",
      });
      return { error: "input last name must be a string" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.findOne({ lastname });

      this.emit("awaitFirstByLastName", response);
      this.emit("firstByLastName", response);
      return response;
    } catch (error) {
      this.emit("awaitFirstByLastName-error", error);
      this.emit("firstByLastName-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  /**
   * @name awaitFirstByPhone
   * @function
   *
   * @param {Object|String} phone the phone of the collection document to fetch
   * @param {String} dbName database name string
   * @param {String} collectionName database collection name string
   * @param {Object|Function|Stream} client Mongo Client instance
   *
   * @description Finds/fetches/gets by phone the first occurrent document satisfying the input query in a collection
   *
   * @return {Object}  The resulting object of first occurrent document by phone fetched from a collection as a result of the query
   *
   */

  async awaitFirstByPhone(
    phone,
    collectionName = this.collection,
    dbName = this.db,
    client = new MongoClient(this.uri, { useUnifiedTopology: true })
  ) {
    if (phone && typeof phone !== "string") {
      this.emit("awaitFirstByLastName-error", {
        error: "input phone must be a string",
      });
      this.emit("firstByLastName-error", {
        error: "input phone must be a string",
      });
      return { error: "input phone must be a string" };
    }
    try {
      await client.connect();
      const database = client.db(dbName);
      const model = database.collection(collectionName);
      const response = await model.findOne({ phone });

      this.emit("awaitFirstByLastName", response);
      this.emit("firstByLastName", response);
      return response;
    } catch (error) {
      this.emit("awaitFirstByLastName-error", error);
      this.emit("firstByLastName-error", error);
      return error;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  initAsyncAwaitConfig() {
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
    // this.connect = (fn = () => {}) =>
    //   MongoClient.connect(
    //     this.url,
    //     { useUnifiedTopology: true },
    //     fn
    //   );
    
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
    return ["initAsyncAwaitConfig"];
  }
}

module.exports = AsyncAwait;






