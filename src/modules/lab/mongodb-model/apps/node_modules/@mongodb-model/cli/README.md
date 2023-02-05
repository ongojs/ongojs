# CLI

Cli helps in building CLIs and styling terminals. If you are not building a cli application, then you most likely do not need it. Cli is a duplex stream, specifically a Transform stream with some functionalities added. Primarily, it uses full power of the NodeJs Transform Stream API. In other words, everything you can do with NodeJs Transform API you can do with cli! Cli is centrally very highly event driven. Its common use is by extension or by using object destruction to get the instance methods needed.

### Installation

```bash
$ yarn add @mongodb-model/cli

```
 or 

```bash

$ npm i @mongodb-model/cli

```

### Simple Usage Examples


#### Making api request (http request)
```javascript
const CLI = require('@mongodb-model/cli');
const cli = new CLI();
cli.apiGet(); //base.apiGet(your api endpoint)
cli.on('apiGet', data => console.log(data));
cli.on('apiGet-error', error => console.error(error));
 
```

#### By extension

```javascript
class MyWonderfulClass extends require('@mongodb-model/cli') {

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

#### cli methods usage example
```javascript

const CLI = require('@mongodb-model/cli');

// You may use object destruction to get methods needed from the instance.
const { centered, description,verticalSpace,texAligner} = new CLI

// example man page commands with their definitions
const manCommand = () => ({
  man: "Example App Command Line Interface (CLI) Manual",
  help: 'Alias of the "man" command',
  methods: "List all methods on Example App",
  events: "Events emitted by Example App",
})

// man function 
const man = () => {
  console.clear();
  const docs = `\x1b[36mNAME\x1b[0m
\x1b[36mman\x1b[0m - Example App Command Line Interface (CLI) Manual 

\x1b[36mSYPNOSIS\x1b[0m
\x1b[36mman\x1b[0m [\x1b[36mman\x1b[0m|\x1b[36mhelp\x1b[0m|\x1b[36mmethods\x1b[0m|\x1b[36mevent\x1b[0m|\x1b[36mclass\x1b[0m] 

\x1b[36mDESCRIPTION\x1b[0m
Example App Command Line Interface (CLI) Manual.
`;

// use instance methods for styling 
  centered(`\x1b[32mEXAMPLE APP COMMAND LINE INTERFACE AND USAGE MANUAL\x1b[0m`);
  description(docs);
  verticalSpace(2);

  const options = {
    pad: 22,
    position: process.stdout.columns,
    hline: false,
    keyColor: "36",
    valueColor: "37",
  };
  texAligner(options, manCommand());
  console.log();
}

// ran function to ouput example man page in your terminal
man()
```

#### Author's Info
Website|NPM|Github|Gitlab|Blog|LinkedIn|Facebook|Twitter|Instagram|
--- | --- | --- | --- | --- | --- | --- |--- |--- |
[Website](https://www.ericsonsweah.com/dashboard)|[NPM](https://www.npmjs.com/org/mongodb-model)|[Github](https://github.com/ericsonweah)|[Gitlab](https://gitlab.com/ericsonweah)|[Blog](https://www.ericonsweah.dev)|[LinkedIn](https://www.linkedin.com/in/ericson-weah-b03600210)|[Facebook](https://www.facebook.com/Eric.S.Weah)|[Twitter](https://twitter.com/EricsonWeah1)|[Instagram](https://www.instagram.com/ericsonweah/)|

