"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module Method
 * @kind class
 *
 * @extends Transform
 * @requires Transform
 * @requires createReadStream
 * @requires createWriteStream
 * @requires promises
 *
 * @classdesc Method class
 */

const { createReadStream, createWriteStream, promises } = require("fs");
const {inspect} = require('util');
// const MongoTransform = require('./');
const MongoTransform = require('@mongodb-model/base-model');
const native  = require('./lib');
const Callback = require('@mongodb-model/db-callback');
const CallbackQuery = require('@mongodb-model/db-query');
const CallbackQueryValidator = require('@mongodb-model/db-query-validator');

class Method extends require("./base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });
    

    // auto bind methods
    this.autobind(Method);
    // auto invoke methods
    this.autoinvoker(Method);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }


 methodFinder (method = 'method', ClassName){
  return Reflect.has(ClassName.prototype, method) ? Reflect.get(ClassName.prototype, method).toString(): undefined;
 }
 validatorFinder(method = 'method'){
  if(!method || method == undefined) return;
    let index = method.indexOf('.validate');
    let str = '';
    for(let i = index   ; i <  method.length; i++){
        if(method[i] === '(') break;
        str += method[i];
    }
    return str.slice(1)
 }


renderMethodInfo(inputMethod = 'method', callback = Callback, callbackQuery = CallbackQuery, callbackQueryValidator = CallbackQueryValidator){
  const method = this.methodFinder(inputMethod, callback);
  if(!method || method == undefined) return;
  const validator  = this.validatorFinder(method)
  const methodCallback =  this.methodFinder(`${inputMethod}Callback`, callbackQuery);
  const methodValidator =  this.methodFinder(validator, callbackQueryValidator);
  return `
  // ${method}
  // --------------------------------------------------------------------
  // ${methodCallback}
  // ${methodValidator}
  `;
}

isNativeDefined(){

}

  i(command){
    if(command ==  '-i'){
      if(!native(this.command) || native(this.command) === undefined) return  console.log(`\x1b[31m Method "${this.command}" does not exist.\x1b[0m`)
      console.clear();
      // if (command.length !== 8)
      //   return this.emit("error", {
      //     error: `'${string}' is not command.`,
      //   });
     
  
    let centered = `\x1b[36m NAME\x1b[0m
  \x1b[36m method\x1b[0m - Model Method's Details

 \x1b[36mSYNOPSIS \x1b[0m
  \x1b[36m method\x1b[0m [\x1b[36m--list\x1b[0m|\x1b[36m-l\x1b[0m] [\x1b[36m-j\x1b[0m|\x1b[36m--json\x1b[0m][\x1b[36m-j -d \x1b[0m|\x1b[36m-j --depth=\x1b[0m|\x1b[36m--json --depth=\x1b[0m|\x1b[36m--json -d \x1b[0m]\x1b[4mdepth_level\x1b[0m 
  \x1b[36m method\x1b[0m [\x1b[36m-T\x1b[0m|\x1b[36m--type=\x1b[0m]\x1b[4m type\x1b[0m [\x1b[36m-s\x1b[0m|\x1b[36m--sizes\x1b[0m|\x1b[36m-t\x1b[0m|\x1b[36m--toppings\x1b[0m][\x1b[36m-j\x1b[0m|\x1b[36m--json\x1b[0m][\x1b[36m-j -d \x1b[0m|\x1b[36m-j --depth=\x1b[0m|\x1b[36m--json --depth=\x1b[0m|\x1b[36m--json -d \x1b[0m]\x1b[4mdepth_level\x1b[0m 

\x1b[36m DESCRIPTION\x1b[0m
  Application menu and a menu object details. All menu items or a single menu can be viewed in 
  two formats: a tabular form or JSON form. The JSON form has multiple view depths (depth levels)
  depending on how you want to view it. A single menu item is selected by type. A single item
  can also be selected by type by size by price or by type by toppings.

 ${native(this.command)}`;
      this.centered(`\x1b[32m MODEL METHOD USAGE MANUAL\x1b[0m`);
      this.description(centered);
      this.verticalSpace(1);
      let options = {
        pad: 13,
        position: process.stdout.columns,
        hline: false,
        keyColor: "36",
        valueColor: "37",
      };
      // this.texAligner(options, this.methodCommands());
      console.log();
      
      // const Mongo = new MongoTransform;
      // for(let method in Mongo){
      //   console.log(method);
      // }
      // console.log(this.command, command, inspect(Mongo[this.command],{showHidden:true, depth: Infinity, colors:true}));
    }
  }
  info(command){
   


    // return this.renderMethodInfo(this.command);
    if(command == '--info'){

      if(!native(this.command) || native(this.command) === undefined) return  console.log(`\x1b[31m Method "${this.command}" does not exist.\x1b[0m`)

      console.clear();
      // if (command.length !== 8)
      //   return this.emit("error", {
      //     error: `'${string}' is not command.`,
      //   });
     
  
    let centered = `\x1b[36m NAME\x1b[0m
  \x1b[36m method\x1b[0m - Model Method's Details

 \x1b[36mSYNOPSIS \x1b[0m
  \x1b[36m method\x1b[0m [\x1b[36m--list\x1b[0m|\x1b[36m-l\x1b[0m] [\x1b[36m-j\x1b[0m|\x1b[36m--json\x1b[0m][\x1b[36m-j -d \x1b[0m|\x1b[36m-j --depth=\x1b[0m|\x1b[36m--json --depth=\x1b[0m|\x1b[36m--json -d \x1b[0m]\x1b[4mdepth_level\x1b[0m 
  \x1b[36m method\x1b[0m [\x1b[36m-T\x1b[0m|\x1b[36m--type=\x1b[0m]\x1b[4m type\x1b[0m [\x1b[36m-s\x1b[0m|\x1b[36m--sizes\x1b[0m|\x1b[36m-t\x1b[0m|\x1b[36m--toppings\x1b[0m][\x1b[36m-j\x1b[0m|\x1b[36m--json\x1b[0m][\x1b[36m-j -d \x1b[0m|\x1b[36m-j --depth=\x1b[0m|\x1b[36m--json --depth=\x1b[0m|\x1b[36m--json -d \x1b[0m]\x1b[4mdepth_level\x1b[0m 

\x1b[36m DESCRIPTION\x1b[0m
  Application menu and a menu object details. All menu items or a single menu can be viewed in 
  two formats: a tabular form or JSON form. The JSON form has multiple view depths (depth levels)
  depending on how you want to view it. A single menu item is selected by type. A single item
  can also be selected by type by size by price or by type by toppings.

 ${native(this.command)}`;
      this.centered(`\x1b[32m MODEL METHOD USAGE MANUAL\x1b[0m`);
      this.description(centered);
      this.verticalSpace(1);
      let options = {
        pad: 13,
        position: process.stdout.columns,
        hline: false,
        keyColor: "36",
        valueColor: "37",
      };
      // this.texAligner(options, this.methodCommands());
      console.log();
      
      // const Mongo = new MongoTransform;
      // for(let method in Mongo){
      //   console.log(method);
      // }
      // console.log(this.command, command, inspect(Mongo[this.command],{showHidden:true, depth: Infinity, colors:true}));
    }

  }

  corresponding(){
    return {
      'all': 'find(query = {}, projection = {})',
      'create': 'insertOne(query = {})',
      'insertOne': 'insertOne(query = {})',
      'insertMany': 'insertMany(data = [])',
      'createMany': 'insertMany(data = [])',
      'findOne': 'findOne(query = {})',
      'first': 'findOne(query = {})',
      'find': 'find(query = {}, projection = {})',
      'sort': 'find(query = {}, projection = {}).sort',
      'deleteOne': 'deleteOne(query = {})',
      'deleteMany': 'deleteMany(query = {}, cfn = () => {})',
      'dropCollection': 'dropCollection',
      'collectionDrop': 'dropCollection',
      'updateOne': 'updateOne(query, { $set: data }, cfn = () => {})',
      'update': 'updateOne(query, { $set: data }, cfn = () => {})',
      'updateMany': 'updateMany(query, { $set: data }, cfn = () => {})',
      'limit': 'find(query = {}, projection = {}).limit(limit)',
      'letfJoin': 'aggregate',
      'findById': 'findOne(query = {})',
      'findByEmail': 'findOne(query = {})',
      'firstByEmail': 'findOne(query = {})',
      'firstByUsername': 'findOne(query = {})',
      'firstByPhone': 'findOne(query = {})',
      'firstByFirstName': 'findOne(query = {})',
      'firstByLastName': 'findOne(query = {})',
      'findByQuery': 'findOne(query = {})',
      'firstByQuery': 'findOne(query = {})',
      'firstByToken': 'findOne(query = {})',
    }
  }
  methodCommands(){
    return {
        "   -l": " or \x1b[36m--list\x1b[0m        list available methods: \x1b[36m method --list \x1b[0m ",
        "   -n": " or \x1b[36m--name\x1b[0m        method by name: [\x1b[36m-n \x1b[0m|\x1b[36m--name=\x1b[0m]\x1b[4mmethod_name\x1b[0m",
        "   -i": " or \x1b[36m--info\x1b[0m        method info by method name: [\x1b[36m-n \x1b[0m|\x1b[36m--name=\x1b[0m]\x1b[4mmethod_name\x1b[0m[\x1b[36m-i\x1b[0m|\x1b[36m--info\x1b[0m]",
        "   -t": " or \x1b[36m--type\x1b[0m        method type by method name: [\x1b[36m-n \x1b[0m|\x1b[36m--name=\x1b[0m]\x1b[4mmethod_name\x1b[0m[\x1b[36m-t\x1b[0m|\x1b[36m--type\x1b[0m]",
      };
  }

  awaitModelHash(command){
    let hash = {}
    hash["      \x1b[32m1|\x1b[0m"] = "=================== Generic Example ===============";
    hash[`               `] = '';
    hash[`      var CollectionName = new MongoTransform({collection: 'CollectionName'})`] = ": Instantiates the CollectionName model.";
    hash[`                       `] = '';
    hash[`      \x1b[33mListening for '${command}' and '${command}-error' events on CollectionName: \x1b[0m\x1b[36m\x1b[0m`] = '';
    hash[`      CollectionName.\x1b[35m${command}\x1b[0m\x1b[36m()\x1b[0m`] = ": Gets all CollectionName models from the database";
    hash[`      CollectionName.on('\x1b[35m${command}\x1b[0m\x1b[36m', data => console.log(data))\x1b[0m`] = ": Listens for the success event.";
    hash[`      CollectionName.on('\x1b[35m${command}\x1b[0m\x1b[31m-error\x1b[0m\x1b[36m', data => console.error(error))\x1b[0m`] = ": Listens for the error event.";
    hash[`                    `] = '';
    hash[`      \x1b[33mOr async/await CollectionName: \x1b[0m\x1b[36m\x1b[0m`] = '';
    hash[`      const collections = async() =>{const response = await CollectionName.\x1b[35m${command}\x1b[0m\x1b[36m()\x1b[0m}`] =":Gets all CollectionName models.";
    hash[`                   `] = '';

    hash["      \x1b[32m2|\x1b[0m"] = "=================== Specific Example ===============";
    hash[`                  `] = '';
    hash[`      var User = new MongoTransform({collection: 'users'})`] = ": Instantiates the User model.";

    hash[`                          `] = '';
    hash[`      \x1b[33mListening for '${command}' and '${command}-error' events on User: \x1b[0m\x1b[36m\x1b[0m`] = '';
    hash[`      User.\x1b[35m${command}\x1b[0m\x1b[36m()\x1b[0m`] = ": Gets all User models from the database";
    hash[`      User.on('\x1b[35m${command}\x1b[0m\x1b[36m', data => console.log(data))\x1b[0m`] = ": Listens for the success event.";
    hash[`      User.on('\x1b[35m${command}\x1b[0m\x1b[31m-error\x1b[0m\x1b[36m', data => console.error(error))\x1b[0m`] = ": Listens for the error event.";
    hash[`                      `] = '';
    hash[`      \x1b[33mOr async/await User: \x1b[0m\x1b[36m\x1b[0m`] = '';
    hash[`      const collections = async() => {const response = await User.\x1b[35m${command}\x1b[0m\x1b[36m()\x1b[0m}`] =":Gets all User models.";
    hash[`      `] = '';

    return hash;

  }
  callbackModelHash(command){
    let hash = {}
    hash["      \x1b[32m1|\x1b[0m"] = "=================== Generic Example ===============";
    hash[`               `] = '';
    hash[`      var CollectionName = new MongoTransform({collection: 'CollectionName'})`] = ": Instantiates the CollectionName model.";
    hash[`                `] = '';
    hash[`      \x1b[33mListening for '${command}' and '${command}-error' events on CollectionName: \x1b[0m\x1b[36m\x1b[0m`] = '';
    hash[`      CollectionName.\x1b[35m${command}\x1b[0m\x1b[36m()\x1b[0m`] = ": Gets all CollectionName models from the database";
    hash[`      CollectionName.on('\x1b[35m${command}\x1b[0m\x1b[36m', data => console.log(data))\x1b[0m`] = ": Listens for the success event.";
    hash[`      CollectionName.on('\x1b[35m${command}\x1b[0m\x1b[31m-error\x1b[0m\x1b[36m', data => console.error(error))\x1b[0m`] = ": Listens for the error event.";
    hash[`      CollectionName.once('\x1b[35m${command}\x1b[0m\x1b[36m', data => console.log(data))\x1b[0m`] = ": Listens for the success event.";
    hash[`      CollectionName.once('\x1b[35m${command}\x1b[0m\x1b[31m-error\x1b[36m', data => console.error(error))\x1b[0m`] = ": Listens for the error event.";
    hash[`      `] = '';

    hash["      \x1b[32m2|\x1b[0m"] = "=================== Specific Example ===============";
    hash[`                 `] = '';
    hash[`      var User = new MongoTransform({collection: 'users'})`] = ": Instantiates the User model.";
    hash[`                  `] = '';
    hash[`      \x1b[33mListening for '${command}' and '${command}-error' events on User: \x1b[0m\x1b[36m\x1b[0m`] = '';
    hash[`      User.\x1b[35m${command}\x1b[0m\x1b[36m()\x1b[0m`] = ": Gets all User models from the database";
    hash[`      User.on('\x1b[35m${command}\x1b[0m\x1b[36m', data => console.log(data))\x1b[0m`] = ": Listens for the success event.";
    hash[`      User.on('\x1b[35m${command}\x1b[0m\x1b[31m-error\x1b[0m\x1b[36m', data => console.error(error))\x1b[0m`] = ": Listens for the error event.";
    hash[`      User.once('\x1b[35m${command}\x1b[0m\x1b[36m', data => console.log(data))\x1b[0m`] = ": Listens for the success event.";
    hash[`      User.once('\x1b[35m${command}\x1b[0m\x1b[31m-error\x1b[36m', data => console.error(error))\x1b[0m`] = ": Listens for the error event.";
    hash[`      `] = '';
    return hash;
  }
  methodUserExamples(command){

    let hash = {}
    hash["      \x1b[32m1|\x1b[0m"] = "=================== Generic Example ===============";
    hash[`      var CollectionName = new MongoTransform({collection: 'CollectionName'})`] = ": Instantiates the CollectionName model.";
    hash[`      CollectionName.\x1b[35m${command}\x1b[0m\x1b[36m()\x1b[0m`] = ": Gets all CollectionName models from the database";
    hash[`      CollectionName.on('\x1b[35m${command}\x1b[0m\x1b[36m', data => console.log(data))\x1b[0m`] = ": Listens for the success event.";
    hash[`      CollectionName.on('\x1b[35m${command}\x1b[0m\x1b[31m-error\x1b[0m\x1b[36m', data => console.error(error))\x1b[0m`] = ": Listens for the error event.";
    hash[`      CollectionName.once('\x1b[35m${command}\x1b[0m\x1b[36m', data => console.log(data))\x1b[0m`] = ": Listens for the success event.";
    hash[`      CollectionName.once('\x1b[35m${command}\x1b[0m\x1b[31m-error\x1b[36m', data => console.error(error))\x1b[0m`] = ": Listens for the error event.";
    hash[`      `] = '';

    hash["      \x1b[32m2|\x1b[0m"] = "=================== Specific Example ===============";
    hash[  `      var User = new MongoTransform({collection: 'users'})`] = ": Instantiates the User model.";
    hash[`      User.\x1b[35m${command}\x1b[0m\x1b[36m()\x1b[0m`] = ": Gets all User models from the database";
    hash[`      User.on('\x1b[35m${command}\x1b[0m\x1b[36m', data => console.log(data))\x1b[0m`] = ": Listens for the success event.";
    hash[`      User.on('\x1b[35m${command}\x1b[0m\x1b[31m-error\x1b[0m\x1b[36m', data => console.error(error))\x1b[0m`] = ": Listens for the error event.";
    hash[`      User.once('\x1b[35m${command}\x1b[0m\x1b[36m', data => console.log(data))\x1b[0m`] = ": Listens for the success event.";
    hash[`      User.once('\x1b[35m${command}\x1b[0m\x1b[31m-error\x1b[36m', data => console.error(error))\x1b[0m`] = ": Listens for the error event.";
    hash[`      `] = '';
    return hash;
  }


  method(){
    if (true) {
      console.clear();
      // if (command.length !== 8)
      //   return this.emit("error", {
      //     error: `'${string}' is not command.`,
      //   });
     
  
    let centered = `\x1b[36m NAME\x1b[0m
  \x1b[36m method\x1b[0m - Model Method Details

 \x1b[36mSYNOPSIS \x1b[0m
  \x1b[36m method\x1b[0m [\x1b[36m--list\x1b[0m\x1b[0m]
  \x1b[36m method\x1b[0m [\x1b[36m--name=\x1b[0m|\x1b[36m-n \x1b[0m]\x1b[4mmethod_name\x1b[0m [\x1b[36m--info\x1b[0m|\x1b[36m-i\x1b[0m|\x1b[36m--type\x1b[0m|\x1b[36m-t\x1b[0m]
\x1b[36m DESCRIPTION\x1b[0m
   Model method details and method list.

 \x1b[36m  The following options are available: \x1b[0m `;
      this.centered(`\x1b[32m MODEL METHOD USAGE MANUAL\x1b[0m`);
      this.description(centered);
      this.verticalSpace(1);
      let options = {
        pad: 13,
        position: process.stdout.columns,
        hline: false,
        keyColor: "36",
        valueColor: "37",
      };
      this.texAligner(options, this.methodCommands());
      console.log();
    }
 
  }
  list(){
    if(this.command == '--list' || this.command == '-l' ){
       let Mongo = new MongoTransform
       for(let method in Mongo){
        if(typeof(Mongo[method]) === 'function'){
          if(!method.startsWith('validate') && !method.endsWith('Callback')){
            if(Object.getOwnPropertyNames(require('stream').Transform.prototype).includes(method)){
              console.log(`\x1b[36m${method}\x1b[0m`,`\x1b[32m(Transform:Model);\x1b[0m`);
            }
            else if(Object.getOwnPropertyNames(require('stream').Duplex.prototype).includes(method)){
              console.log(`\x1b[36m${method}\x1b[0m`,`\x1b[32m(Duplex:Transform:Model)\x1b[0m`);
            }
            else if(Object.getOwnPropertyNames(require('events').EventEmitter.prototype).includes(method)){
              console.log(`\x1b[36m${method}\x1b[0m`, `\x1b[32m(EventEmitter:Duplex:Transform:Model)\x1b[0m`);
            }
            else {
              console.log(`\x1b[36m${method}\x1b[0m`, `\x1b[34m(Model)\x1b[0m`);
            }
          }
        }
       }
  
    }
  }

  methodUsage(command, exactly = 'find'){
    console.clear();
          // if (command.length !== 8)
          //   return this.emit("error", {
          //     error: `'${string}' is not command.`,
          //   });
         
      
        let centered = `\x1b[36m NAME\x1b[0m
      \x1b[36m ${command}\x1b[0m - Mongo Transform \x1b[36m${command}\x1b[0m method and \x1b[36m${command}\x1b[0m method Details
    
\x1b[36mSYNOPSIS \x1b[0m
      \x1b[36m ${command}\x1b[0m arguments: [\x1b[36m \x1b[0m|\x1b[36m{}\x1b[0m]

\x1b[36m DESCRIPTION\x1b[0m
      Mongo Transform \x1b[36m${command}\x1b[0m method and \x1b[36m${command}\x1b[0m method usage. \x1b[36m${command}\x1b[0m takes no argument or \x1b[36m{}\x1b[0m (an empty object). 
      It takes exactly the same argument as the Mongodb NodeJs driver \x1b[36m${exactly}\x1b[0m.
      So \x1b[36m${command}\x1b[0m does whatsoever \x1b[36m${exactly}\x1b[0m does.
      (see mongodb documentation: https://www.mongodb.com/docs/drivers/node/current):
      \x1b[36mdb.collection.${exactly} or db.collectionName.${exactly} \x1b[0m

     \x1b[32m  The following are some usage examples (2): \x1b[0m `;
          this.centered(`\x1b[32m MONGO TRANSFORM \x1b[36m${command.toUpperCase()}\x1b[0m \x1b[32mMETHOD AND\x1b[0m \x1b[36m${command.toUpperCase()}\x1b[0m \x1b[32mMETHOD USAGE MANUAL\x1b[0m`);
          this.description(centered);
          this.verticalSpace(1);
          let options = {
            pad: 13,
            position: process.stdout.columns,
            hline: false,
            keyColor: "36",
            valueColor: "37",
          };
          if(command.startsWith('await')){
            this.texAligner(options, this.awaitModelHash(command));
          }else{
            this.texAligner(options, this.callbackModelHash(command));
          }
          // this.texAligner(options, this.methodUserExamples(command));
          return console.log();
 
  }
  n(command){

    if(this.command == '-n'){
      // if(command){
      //   let Mongo = new MongoTransform
      //   if(Mongo[command]){
      //     this.methodUsage(command, this.corresponding()[command]);
      //   }else{
      //     console.log(`'${command}' method does not exist.`);
      //   }
      // }else{
      //   console.log('the method name argument is missing.');
      // }
     
    }
  }

  async makeDirectory(absolutePath = '../app', directory = 'models') {
    const projectFolder = join(process.cwd(), absolutePath, directory);
    const dirCreation = await mkdir(projectFolder, { recursive: true });
    console.log(dirCreation);
    return dirCreation;
  }

  texAligner = (...args) => {
    let options = {
      pad: 75,
      position: process.stdout.columns,
      hline: false,
      keyColor: "36",
      valueColor: "33",
    };
    if (args.length > 1) {
      if (typeof args[0] === "object") {
        for (let prop in args[0]) {
          if (options.hasOwnProperty(prop)) {
            options[prop] = args[0][prop];
          }
        }
      }
    }

    let i = args.length > 1 ? 1 : 0;

    for (; i < args.length; i++) {
      if (typeof args[i] === "object") {
        for (let prop in args[i]) {
          let key = `\x1b[${options.keyColor}m${prop}\x1b[0m`;
          let value = `\x1b[${options.valueColor}m${args[i][prop]}\x1b[0m`;
          let padding = options.pad - key.length;

          for (let i = 0; i < padding; i++) {
            key += " ";
          }
          key += value;
          options.hline === true
            ? hline(1, options.position, key)
            : console.log(key);
        }
      } else {
        let key = `\x1b[36mKey\x1b[0m`;
        let value = `\x1b[33m${args[i]}\x1b[0m`;
        let padding = options.pad - key.length;

        for (let i = 0; i < padding; i++) {
          key += " ";
        }
        key += value;
        options.hline === true
          ? hline(1, options.position, key)
          : console.log(key);
      }
    }
  };

  verticalSpace(NumberOfLines) {
    NumberOfLines =
      typeof NumberOfLines === "number" && NumberOfLines > 0
        ? NumberOfLines
        : 1;
    for (let i = 0; i < NumberOfLines; i++) {
      console.log("");
    }
  }
  // horizontal line across the screen
  horizontalLine() {
    const width = process.stdout.columns;
    let line = "";
    for (let i = 0; i < width; i++) {
      line += "-";
    }
    console.log(line);
  }

  // create centered text on the screen
  centered(str) {
    str = typeof str === "string" && str.trim().length > 0 ? str.trim() : "";
    const width = process.stdout.columns;
    // calculate left padding
    const leftPadding = Math.floor((width - str.length) / 2);
    // put in left padding space before the string
    let line = "";
    for (let i = 0; i < leftPadding; i++) {
      line += " ";
    }
    line += str;
    console.log(line);
  }
  // padding (str){
  //     str = typeof (str) === 'string' && str.trim().length > 0 ? str.trim() : ''
  //     const width = process.stdout.columns
  //     // calculate left padding
  //     const leftPadding = Math.floor((width - str.length) / 2)
  //     // put in left padding space before the string
  //     let line = ''
  //     for (let i = 0; i < leftPadding; i++) {
  //         line += ' '
  //     }
  //     line += str
  //     console.log(line)
  // }

  description(str) {
    str = typeof str === "string" && str.trim().length > 0 ? str.trim() : "";
    const width = process.stdout.columns;
    // calculate left padding
    const leftPadding = Math.floor((width - str.length) / 4);
    // put in left padding space before the string
    let line = "";
    for (let i = 0; i < leftPadding; i++) {
      line += " ";
    }
    line += str;
    console.log(line);
  }
  manual(str) {
    str = typeof str === "string" && str.trim().length > 0 ? str.trim() : "";
    const width = process.stdout.columns;
    // calculate left padding
    const leftPadding = Math.floor((width - str.length) / 4);
    // put in left padding space before the string
    let line = "";
    for (let i = 0; i < leftPadding; i++) {
      line += " ";
    }
    line += str;
    console.log(line);
  }

  objectToDisplay(...args) {
    let option = {};
    option.object = {};
    option.options = {};
    if (args.length === undefined || args.length === 0) {
      return option;
    }
    if (args.length >= 1) {
      for (let i = 0; i < args.length; i++) {
        if (typeof args[i] === "object") {
          if (
            !args[i].hasOwnProperty("object") &&
            !args[i].hasOwnProperty("options")
          ) {
            option.object = args[i];
            args[i] = option;
          }
          if (
            args[i].hasOwnProperty("object") &&
            !args[i].hasOwnProperty("options")
          ) {
            option.object = args[i]["object"];
            args[i] = option;
          }
          if (
            !args[i].hasOwnProperty("object") &&
            args[i].hasOwnProperty("options")
          ) {
            option.options = args[i]["options"];
            args[i] = option;
          }
        } else if (typeof args[i] !== "object") {
          if (
            !args[i].hasOwnProperty("object") &&
            args[i].hasOwnProperty("options")
          ) {
            option.object = {
              key: args[i],
            };
            args[i] = option;
          } else {
            option.object = {
              key: args[i],
            };
            args[i] = option;
          }
        }
      }
    }
    return args;
  }
  displayer(...args) {
    let option = {
      showHidden: true,
      depth: 10,
      colors: true,
      showProxy: true,
      maxArrayLength: 100,
      maxArrayLength: Infinity,
      compact: true,
      sorted: true,
    };

    let dargs = {};
    dargs.object = {
      data: "no data",
    };
    dargs.options = option;

    if (args.length === undefined || args.length === 0) {
      console.log(util.inspect(dargs.object, dargs.options));
      return;
    }
    if (args.length >= 1) {
      for (let i = 0; i < args.length; i++) {
        if (typeof args[i] === "object") {
          if (
            args[i].hasOwnProperty("object") &&
            args[i].hasOwnProperty("options")
          ) {
            if (JSON.stringify(args[i]["options"]) !== "{}") {
              for (let prop in args[i]["options"]) {
                if (option.hasOwnProperty(prop)) {
                  option[prop] = args[i]["options"][prop];
                }
              }
            }
            console.log(util.inspect(args[i]["object"], option));
          } else if (
            args[i].hasOwnProperty("object") &&
            !args[i].hasOwnProperty("options")
          ) {
            console.log(util.inspect(args[i]["object"], option));
          } else if (!args[i].hasOwnProperty("object")) {
            console.log(util.inspect(dargs.object, dargs.options));
          }
        } else {
          console.log(args[i], "here");
        }
      }
    }
  }
  display(object) {
    this.displayer(...this.objectToDisplay(object));
  }
  padding(...args) {
    let options = {
      string: "-",
      number: process.stdout.columns,
      color: 37,
    };
    if (args.length === undefined || args.length === 0) {
      // calculate left padding
      let padding = Math.floor(
        (process.stdout.columns - options.string.length) / options.number
      );
      // put in left padding space before the string
      let line = "";
      for (let i = 0; i < padding; i++) {
        line += " ";
      }
      line += `\x1b[${options.color}m${options.string}\x1b[0m`;
      console.log(line);
      return;
    }

    for (let i = 0; i < args.length; i++) {
      if (typeof args[i] === "object") {
        for (let prop in args[i]) {
          let checkProp = prop === "number" && args[i][prop] <= 0 ? 1 : prop;
          if (options.hasOwnProperty(checkProp)) {
            options[checkProp] = args[i][checkProp];
          }
        }
      } else {
        // calculate left padding
        let padding = Math.floor(
          (process.stdout.columns - options.string.length) / options.number
        );
        // put in left padding space before the string
        let line = "";
        for (let i = 0; i < padding; i++) {
          line += " ";
        }
        line += `\x1b[${options.color}m${options.string}\x1b[0m`;
        console.log(line);
      }
      // calculate left padding
      let padding = Math.floor(
        (process.stdout.columns - options.string.length) / options.number
      );
      // put in left padding space before the string
      let line = "";
      for (let i = 0; i < padding; i++) {
        line += " ";
      }
      line += `\x1b[${options.color}m${options.string}\x1b[0m`;
      console.log(line);
    }
  }

  elapsed(start = new Date(), end = new Date()) {
    if (!util.types.isDate(start)) {
      start = new Date();
    }
    if (!util.types.isDate(end)) {
      end = new Date();
    }

    let result = {};
    // Get the time difference
    let delatt = (end - start) / 1000;

    let ymod = delatt / (60 * 60 * 24 * 365);
    let years = Math.trunc(delatt / (60 * 60 * 24 * 365));
    let mmod = 12 * (ymod - years);
    let months = Math.trunc(mmod);
    let dmod = (365 * (mmod - months)) / 12;
    let days = Math.trunc(dmod);

    let hmod = 24 * (dmod - days);

    let hours = Math.trunc(hmod);

    let minmod = 60 * (hmod - hours);

    let minutes = Math.trunc(minmod);

    let smod = 60 * (minmod - minutes);

    let seconds = Math.trunc(smod);

    result.years = years;
    result.months = months;
    result.days = days;
    result.hours = hours;
    result.minutes = minutes;
    result.seconds = seconds;

    return result;
  }

  pluralize(item, quantity) {
    return quantity > 1 ? `${item}s` : `${item}`;
  }
  spliter(str, spl) {
    if (str === undefined || spl === undefined) return [];
    return str
      .split(spl)
      .filter((string) => string != "")
      .map((st) => st.trim());
  }
  clean(string) {
    return string
      .split(" ")
      .filter((str) => str != "")
      .map((str) => str.trim())
      .join(" ");
  }
  onfromthelasttime(date) {
    return this.elapsed(new Date(date), new Date());
  }

  completer(line) {
    const completions = ".help .error .exit .quit .q".split(" ");
    const hits = completions.filter((c) => c.startsWith(line));
    // Show all completions if none found
    return [hits.length ? hits : completions, line];
  }
  common() {
    this.on("clear", () => {
      console.clear();
    });
    this.on("exit", () => {
      this.close();
    });
    this.on("leave", () => {
      this.close();
    });
    this.on("quit", () => {
      this.close();
    });
  }
  invalidCommand() {
    this.on("command-not-found", (data) => {
      console.log();
      console.log(`\x1b[31m${data.error}\x1b[0m`);
      console.log();
      //   this.prompt();
      //process.exit(0)
    });

    this.on("error", (data) => {
      console.log();
      console.log(`\x1b[31m${data.error}\x1b[0m`);
      console.log();
      //   this.prompt();
      // process.exit(0)
    });
    this.on("success", (data) => {
      console.log(`\x1b[36m${data.message}\x1b[0m`);
    });
  }

  infos(object, depth = 1) {
    console.log(
      util.inspect(object, {
        showHidden: true,
        colors: true,
        depth: depth,
      })
    );
  }
  usage(command){
    return `
    ----------------------------------------------------
    |${command}----------------------------------------------------`
  }

  addDefault() {
    if (!this.createWriteStream) this.createWriteStream = createWriteStream;
    if (!this.createReadStream) this.createReadStream = createReadStream;
    if (!promises) this.promises = promises;
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
    return ["addDefault"];
  }


}

module.exports = Method;

