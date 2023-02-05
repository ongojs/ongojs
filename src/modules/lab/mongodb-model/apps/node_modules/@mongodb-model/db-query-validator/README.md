# db-query-validator

db-query-validator is very simple yet very powerful tool for interacting with
mongodb database and making internal or external API calls. Under the hood db-query-validator is a wrapper for the 
nodejs mongodb driver. It also extracts away the complexities commonly encountered in NodeJs Mongodb
driver or Mongoose.js. It is also a duplex stream, specifically a Transform stream. It uses
full power of the Nodejs mongodb driver and of the NodeJs Transform Stream API. In other words, everything you can do with mongodb NodeJs driver, Mongoose.js and NodeJs Transform API you can do with db-query-validator! db-query-validator is centrally very highly event driven. Its common use is by extension or by using object destruction to get the instance methods needed or by simply using class instantiation.

## Note 
The db-query-validator object is an ES6 Class with an unlimited constructor parameters. All of the constructor parameters are optional! However, the most important constructor parameter is the first parameter, because it an object that defines your database connection parameters.

## How it works 
Simple and easy! On average you need no more than 3 lines of code for each of your queries or CRUD operations, even with the most complex ones. For event base queries, db-query-validator emits two events: a ***success*** event and an ***error*** event.

***Success event***:
 The success event name is the name of db-query-validator method executed in the query.

***Error event***:
 The error event name is the name of db-query-validator method second argument.

**Explanation** :
 If you use the ***validateQuery*** method in your query, model will emit ***success event validatedQuery*** with nothing or ***error event*** any second argument with the error object.

### Installation

```bash
$ yarn add @mongodb-model/db-query-validator

```
 or 

```bash

$ npm i @mongodb-model/db-query-validator

```

### Simple Usage Examples



#### constructor parameters: first parameter object 
```javascript
const Model = require('@mongodb-model/db-query-validator');
                
// Usage 
const YourCustomModel = new Model({db: 'your_database_name', collection: 'your_collection_name', url: 'your_database_url'})
                
// No constructor Parameter provided: 
 const User = new Model;
// Default collection is 'users'
// Default database name is your .env DATABASE_NAME 
// Default database url is your .env DATABASE_URL or 'mongodb://localhost:27017'
                
// Constructor first parameter object with only collection key
const User = new Model({collection: 'users'});
// Default database name is your .env DATABASE_NAME 
// Default database url is your .env DATABASE_URL or 'mongodb://localhost:27017'
                
// Connecting to multiple databases
const BlogUser = new Model({db: 'blog', collection: 'users'})
const WorkChat = new Model({db: 'work', collection: 'chats'})
const ArticleUser = new Model({db: 'article', collection: 'users'});
const ForumUser = new Model({db: 'forum', collection: 'users'})

```



#### constructor parameters: all other parameter objects 
```javascript
const Model = require('@mongodb-model/db-query-validator');
  
const User = new Model({},{title: 'Cool Users', age: 25, fullName: () => 'User Full Name', Post: class Post {}});

// The User model now has the following added to its prototype and they are bounded to it: title,age, fullName, post
// So now we can do things like the following: 
            
const title = User.title 
const age = User.age 
const fullname = User.fullName();
const FirstPost = new User.Post 
            
// Or using object destructuring 
const {title, age, fullName, Post} = User

```
#### Making api request (http request)
```javascript
const DbQuery = require('@mongodb-model/db-query-validator');
const db = new DbQuery();
db.apiGet(); //base.apiGet(your api endpoint)
db.on('apiGet', data => console.log(data));
db.on('apiGet-error', error => console.error(error));
```

#### By extension

```javascript
class MyWonderfulClass extends require('@mongodb-model/db-query-validator') {

    constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    this.autobind(MyWonderfulClass);
    this.autoinvoker(MyWonderfulClass);
    this.setMaxListeners(Infinity);
  }
};

```

#### common usage example
```javascript

const DB = require('@mongodb-model/db-query-validator');
const db = new DB();

// db-query-validator emits its method names as success events and its method names plus the string "-error" as error events


// validateQuery
ForumUser.validateQuery({username: 'john.doe'}, 'find');
ForumUser.on('validatedQuery', () => {
    console.log('Good to go!')
})
ForumUser.on('find', console.error)

// validateData
ForumUser.validateData(data = {}, event = "find")
ForumUser.on('validatedData', () => {
    console.log('Good to go!')
})
ForumUser.on('find', console.error)
```



#### Available instance methods 
```javascript

const DB = require('@mongodb-model/db-query-validator');
const db = new DB();

// The following functions are available on db, the DB instance, as methods.

validateQuery(query = {}, event = "find");
validateProjection(projection = {}, event = "find");
validateData(data = {}, event = "find");
validateLimit(limit = 1, event = "find");
validateSort(sort = {}, event = "find");
validateDataArray(data = [], event = "find");
validateCollectionName(collectionName = this.collectionName,event = "dropCollection-error");
validateDbName(dbName = this.db, event = "collectionDrop-error");
validateLastName(lastname = "lastname", event = "firstByLastName-error");
validateFirstName(firstname = "firstname", event = "firstByLastName-error");
validateEmail(email = "email", event = "firstByLastName-error");
validateUsername(username = "username", event = "firstByUsername-error");
validateToken(token = "token", event = "firstByToken-error");
validatePhone(phone = "phone", event = "firstByPhone-error");
validateId(id = "", event = "findById-error");
validateCollectionOne(collectionOne = "", event = "letfJoin-error");
validateCollectionTwo(collectionTwo = "", event = "letfJoin-error");
validateLocalField(localField = "", event = "letfJoin-error");
validateForeignField(foreignField = "", event = "letfJoin-error");
validateAs(as = "", event = "letfJoin-error");
validateLeftJoinItems(collectionOne,collectionTwo,localField,foreignField,as,event = "letfJoin-error");
validateCollectionNameDbName(collectionName = this.collectionName,dbName = this.db,event = "collectionDrop-error");
validateQueryProjection(query = {}, projection = {}, event = "find");validateQueryProjectionSort(query = {},sort = {},projection = {},event = "find");
validateQueryLimitProjection(query = {},limit = 1,projection = {},event = "find");
validateQueryData(query = {}, data = {}, event = "updateMany-error");
```

#### Author's Info
Website|NPM|Github|Gitlab|Blog|LinkedIn|Facebook|Twitter|Instagram|
--- | --- | --- | --- | --- | --- | --- |--- |--- |
[Website](https://www.ericsonsweah.com/dashboard)|[NPM](https://www.npmjs.com/org/mongodb-model)|[Github](https://github.com/ericsonweah)|[Gitlab](https://gitlab.com/ericsonweah)|[Blog](https://www.ericonsweah.dev)|[LinkedIn](https://www.linkedin.com/in/ericson-weah-b03600210)|[Facebook](https://www.facebook.com/Eric.S.Weah)|[Twitter](https://twitter.com/EricsonWeah1)|[Instagram](https://www.instagram.com/ericsonweah/)|

