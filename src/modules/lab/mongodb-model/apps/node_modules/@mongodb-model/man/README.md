# Man

Man is the man page for the mongodb model. If you are not building a cli application, then you most likely do not need it. Man is a duplex stream, specifically a Transform stream with some functionalities added. Primarily, it uses full power of the NodeJs Transform Stream API. In other words, everything you can do with NodeJs Transform API you can do with cli! Cli is centrally very highly event driven. Its common use is by extension or by using object destruction to get the instance methods needed.

### Installation

```bash
$ yarn add @mongodb-model/man

```
 or 

```bash

$ npm i @mongodb-model/man

```

### Simple Usage Examples


#### Making api request (http request)
```javascript
const CLI = require('@mongodb-model/man');
const cli = new CLI();
cli.apiGet(); //base.apiGet(your api endpoint)
cli.on('apiGet', data => console.log(data));
cli.on('apiGet-error', error => console.error(error));
 
```

#### By extension

```javascript
class MyWonderfulClass extends require('@mongodb-model/man') {

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

#### Basic usage example
```javascript

// in a javascript file: index.js 

const Man = require('@mongodb-model/man');

// get terminal input string values 
const command = (index = 0)  => process.argv[index];

// using object destruction to get the man method on the instance
const {man} = new Man 

// feed the terminal input string values (first command) to the man method.

// if the string values match 'man', 'help', etc., man will ouput mongodb model man page.
man(command(2))

// To see this you have run your file with command like this in your terminal: 'node index.js man'

```

#### Author's Info
Website|NPM|Github|Gitlab|Blog|LinkedIn|Facebook|Twitter|Instagram|
--- | --- | --- | --- | --- | --- | --- |--- |--- |
[Website](https://www.ericsonsweah.com/dashboard)|[NPM](https://www.npmjs.com/org/mongodb-model)|[Github](https://github.com/ericsonweah)|[Gitlab](https://gitlab.com/ericsonweah)|[Blog](https://www.ericonsweah.dev)|[LinkedIn](https://www.linkedin.com/in/ericson-weah-b03600210)|[Facebook](https://www.facebook.com/Eric.S.Weah)|[Twitter](https://twitter.com/EricsonWeah1)|[Instagram](https://www.instagram.com/ericsonweah/)|

