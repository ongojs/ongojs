# Base 

Base is a duplex stream, specifically a Transform stream with some functionalities added. Primarily it uses full power of the NodeJs Transform Stream API. In other words, everything you can do with NodeJs Transform API you can do with base! Base is centrally very highly event driven.

### Installation

```bash
$ yarn add @mongodb-model/base

```
 or 

```bash

$ npm i @mongodb-model/base

```

### Simple Usage Examples


#### Making api request (http request)
```javascript
 const Base = require('@mongodb-model/base');
 const base = new Base();
 base.apiGet(); //base.apiGet(your api endpoint)
 base.on('apiGet', data => console.log(data));
 base.on('apiGet-error', error => console.error(error));
 
```

#### By extension

```javascript
 class MyWonderfulClass extends require('@mongodb-model/base') {

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

#### Author's Info
Website|NPM|Github|Gitlab|Blog|LinkedIn|Facebook|Twitter|Instagram|
--- | --- | --- | --- | --- | --- | --- |--- |--- |
[Website](https://www.ericsonsweah.com/dashboard)|[NPM](https://www.npmjs.com/org/mongodb-model)|[Github](https://github.com/ericsonweah)|[Gitlab](https://gitlab.com/ericsonweah)|[Blog](https://www.ericonsweah.dev)|[LinkedIn](https://www.linkedin.com/in/ericson-weah-b03600210)|[Facebook](https://www.facebook.com/Eric.S.Weah)|[Twitter](https://twitter.com/EricsonWeah1)|[Instagram](https://www.instagram.com/ericsonweah/)|

