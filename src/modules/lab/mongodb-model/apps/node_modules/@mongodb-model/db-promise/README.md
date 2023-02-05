# db-promise

db-promise is very simple yet very powerful tool for interacting with
mongodb database and making internal or external API calls. Under the hood db-promise is a wrapper for the 
nodejs mongodb driver. It also extracts away the complexities commonly encountered in NodeJs Mongodb
driver or Mongoose.js. It is also a duplex stream, specifically a Transform stream. It uses
full power of the Nodejs mongodb driver and of the NodeJs Transform Stream API. In other words, everything you can do with mongodb NodeJs driver and NodeJs Native Transform API you can do with db-promise! db-promise is centrally very highly event driven. Its common use is by extension or by using object destruction to get the instance methods needed or by simply using class instantiation.

## Note 
The db-promise object is an ES6 Class with an unlimited constructor parameters. All of the constructor parameters are optional! However, the most important constructor parameter is the first parameter, because it an object that defines your database connection parameters.

## How it works 
Simple and easy! On average you need no more than 3 lines of code for each of your queries or CRUD operations, even with the most complex ones. For event base queries, db-promise emits two events: a ***success*** event and an ***error*** event.

***Success event***:
 The success event name is the name of db-promise method executed in the query.

***Error event***:
 The error event name is the name of db-promise method executed in the query plus the string "-error".

**Explanation** :
 If you use the ***create*** method in your query, model will emit ***success event create*** with the created object or ***error event create-error*** with the error object.

### Installation

```bash
$ yarn add @mongodb-model/db-promise

```
 or 

```bash

$ npm i @mongodb-model/db-promise

```

### Simple Usage Examples



#### constructor parameters: first parameter object 
```javascript
const Model = require('@mongodb-model/db-promise');
                
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


// awaitCreate (create query using ForumUser)
const userData = {firstname: 'John', lastname: 'Doe', email: 'john.doe@mail.com'};

const action = ForumUser.awaitCreate(userData);

 // option 1:
    action.awaitCreate(userData)
        .then(response => console.log(response))
        .catch(error => console.error(error))

// option 2
 ForumUser.on('create', user => console.log('user created user', user))
 ForumUser.on('create-error', error => console.log('user creation error', error))

// option 3
 ForumUser.on('awaitCreate', user => console.log('user created user', user))
 ForumUser.on('awaitCreate-error', error => console.log('user creation error', error))

```



#### constructor parameters: all other parameter objects 
```javascript
const Model = require('@mongodb-model/db-promise');
  
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
const DbCallback = require('@mongodb-model/db-promise');
const db = new DbCallback();
db.apiGet(); //base.apiGet(your api endpoint)
db.on('apiGet', data => console.log(data));
db.on('apiGet-error', error => console.error(error));
```

#### By extension

```javascript
class MyWonderfulClass extends require('@mongodb-model/db-promise') {

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

const DB = require('@mongodb-model/db-promise');
const db = new DB();

// db-promise emits its method names as success events and its method names plus the string "-error" as error events


// create collection 
// awaitCreate (create query using ForumUser)
const userData = {firstname: 'John', lastname: 'Doe', email: 'john.doe@mail.com'};

const action = db.awaitCreate(userData);

 // option 1:
    action.awaitCreate(userData)
        .then(response => console.log(response))
        .catch(error => console.error(error))

// option 2
 db.on('create', user => console.log('user created user', user))
 db.on('create-error', error => console.log('user creation error', error))

// option 3
 db.on('awaitCreate', user => console.log('user created user', user))
 db.on('awaitCreate-error', error => console.log('user creation error', error))
```

#### Available instance methods 
```javascript

const DB = require('@mongodb-model/db-promise');
const db = new DB();

// The following functions are available on db, the DB instance, as methods.

awaitCeateCollection(collectionName = 'users');
awaitDropCollection(collectionName = 'users');
awaitInsertOne(data = {}, collectionName = 'users');
awaitCreate(data = {}, collectionName = 'users');
awaitInsertMany(data = [], collectionName = 'users');
awaitCreateMany(data = [], collectionName = 'users');
awaitFindOne(query = {}, collectionName = 'users');
awaitFirst(query = {}, collectionName = 'users');
awaitFind(query = {}, projection = {}, collectionName = 'users');
awaitAll(query = {}, projection = {}, collectionName = 'users');
awaitSort(query = {},sort = {},projection = {},collectionName = 'users');
awaitDeleteOne(query = {}, collectionName = 'users');
awaitDeleteMany(query = {}, collectionName = 'users');
awaitDropCollection(collectionName = 'collectionName', dbName = 'dbName');
awaitCollectionDrop(dbName = 'dbName', collectionName = 'collectionName');
awaitUpdateOne(query = {}, data = {}, collectionName = 'users');
awaitUpdate(query = {}, data = {}, collectionName = 'users');
awaitUpdateMany(query = {}, data = {}, collectionName = 'users');
awaitLimit(query = {},limit = 1,projection = {},collectionName = 'users');
awaitLetfJoin(collectionOne = "users", collectionTwo = "contacts", localField = "_id", foreignField = "user_id", as = "usersContacts");
awaitFindById(id, collectionName = 'users');
awaitFindByEmail(email, collectionName = 'users');
awaitFirstByEmail(email, collectionName = 'users'); 
awaitFirstByUsername(username, collectionName = 'users');
awaitFirstByPhone(phone, collectionName = 'users');
awaitFirstByFirstName(firstname, collectionName = 'users');
awaitFirstByLastName(lastname, collectionName = 'users');
awaitFindByQuery(query = {}, projection = {}, collectionName = 'users');
awaitFirstByQuery(query = {}, collectionName = 'users');
awaitFirstByToken(token, collectionName = 'users')
```

#### Author's Info
Website|NPM|Github|Gitlab|Blog|LinkedIn|Facebook|Twitter|Instagram|
--- | --- | --- | --- | --- | --- | --- |--- |--- |
[Website](https://www.ericsonsweah.com/dashboard)|[NPM](https://www.npmjs.com/org/mongodb-model)|[Github](https://github.com/ericsonweah)|[Gitlab](https://gitlab.com/ericsonweah)|[Blog](https://www.ericonsweah.dev)|[LinkedIn](https://www.linkedin.com/in/ericson-weah-b03600210)|[Facebook](https://www.facebook.com/Eric.S.Weah)|[Twitter](https://twitter.com/EricsonWeah1)|[Instagram](https://www.instagram.com/ericsonweah/)|

