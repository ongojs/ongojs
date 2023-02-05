# Template

Man is the man page for the mongodb model. If you are not building a cli application, then you most likely do not need it. Man is a duplex stream, specifically a Transform stream with some functionalities added. Primarily, it uses full power of the NodeJs Transform Stream API. In other words, everything you can do with NodeJs Transform API you can do with cli! Cli is centrally very highly event driven. Its common use is by extension or by using object destruction to get the instance methods needed.

### Installation

```bash
$ yarn add @mongodb-model/template

```
 or 

```bash

$ npm i @mongodb-model/template

```

### Simple Usage Examples


#### Making api request (http request)
```javascript
const CLI = require('@mongodb-model/template');
const cli = new CLI();
cli.apiGet(); //base.apiGet(your api endpoint)
cli.on('apiGet', data => console.log(data));
cli.on('apiGet-error', error => console.error(error));
 
```

#### By extension

```javascript
class MyWonderfulClass extends require('@mongodb-model/template') {

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

#### Schema template creation example: userSchemaTemplate

```javascript
const Template = require('@mongodb-model/template');

const {schema} = new Template

const userSchemaTemplate = schema({name: 'UserSchema', type: 'object'});

// The resulting userSchemaTemplate contains: 

'use strict';
/*
|--------------------------------------------------------------------------
| UserSchema Schema
|--------------------------------------------------------------------------
|
| Here we you may add more options (keys) to you schema.
|
|
*/
const Schema  = require('@mongodb-model/db-schema');

const {makeSchema}  = new Schema;

 module.exports = makeSchema("UserSchema",{

  property: "string|min:2|max:10",

 }, "object") ;

```
#### Model template creation example: userModelTemplate 
```javascript

const Template = require('@mongodb-model/template');

const {model} = new Template

const userModelTemplate = model({model: 'User', collection: 'users'});

// The resulting userModelTemplate contains: 


'use strict';
/*
|--------------------------------------------------------------------------------
| User Model
|--------------------------------------------------------------------------------
|
| User extends the base model (Model) class and thus has everything
| the base model has including all the basic CRUD methods or operations.
|
|
*/
const Model = require('@mongodb-model/model');

class User extends Model{

    /*
    |----------------------------------------------------------------------------------
    |                                   constructor
    |----------------------------------------------------------------------------------
    |
    | dbOptions: default database options: collection, database url, and database name.
    | options: default model options: any other option  for the model.
    |
    |
    */
    constructor(dbOptions = {collection: 'users', url: 'mongodb://localhost:27017', db: 'app'},...options){
   
    /*
    |-------------------------------------------------------------------------------------
    |                                       super
    |-------------------------------------------------------------------------------------
    |
    | dbOptions: default database options: collection, database url, and database name.
    |
    |
    */

    super(dbOptions);

    /*
    |--------------------------------------------------------------------------------------
    | default database options: in case dbOptions is set but collection and url 
    | keys on the dbOptions are not provided.
    |--------------------------------------------------------------------------------------
    |
    */

    if(!this['hasOwnProperty']['collection']) this.collection = 'users';
    if(!this['hasOwnProperty']['url']) this.url = 'mongodb://localhost:27017';

    /*
    |---------------------------------------------------------------------------------------
    |                                      model options
    |---------------------------------------------------------------------------------------
    | Any other optional options passed to the model.
    |
    */
        options.forEach(option => {
            if(Object.keys(option).length > 0){
                Object.keys(option).forEach(key => {
                    if(!this[key]) this[key] = option[key];
                })
            }
        })
    }

    /*
    |---------------------------------------------------------------------------------------
    |                   Bellow, you may add properties and methods to your model. 
    |---------------------------------------------------------------------------------------
    |
    */


    /**
     * @name sayHello
     * @function
     *
     * @param {Object|String} toMyProject Project name or project object.
     *
     * @description says hello to my project
     *
     * @return does not return anything
     *
     */

    async sayHello(toMyProject) {
        console.log('Hello there', toMyProject, '! I understand you are the new wonderful chick in the neighborhood!');
    }

 }


 /*
 |-----------------------------------------------------------------------------------------------
 |                                       exports model 
 |-----------------------------------------------------------------------------------------------
 |
 */
 module.exports = User;

```

#### Author's Info
Website|NPM|Github|Gitlab|Blog|LinkedIn|Facebook|Twitter|Instagram|
--- | --- | --- | --- | --- | --- | --- |--- |--- |
[Website](https://www.ericsonsweah.com/dashboard)|[NPM](https://www.npmjs.com/org/mongodb-model)|[Github](https://github.com/ericsonweah)|[Gitlab](https://gitlab.com/ericsonweah)|[Blog](https://www.ericonsweah.dev)|[LinkedIn](https://www.linkedin.com/in/ericson-weah-b03600210)|[Facebook](https://www.facebook.com/Eric.S.Weah)|[Twitter](https://twitter.com/EricsonWeah1)|[Instagram](https://www.instagram.com/ericsonweah/)|

