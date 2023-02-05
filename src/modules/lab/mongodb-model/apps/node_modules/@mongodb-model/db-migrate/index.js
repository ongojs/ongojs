"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module Migrate
 * @kind class
 *
 * @extends Migrate
 * @requires Migrate
 * @requires createReadStream
 * @requires createWriteStream
 *
 * @classdesc Migrate class
 */

 
 
const { createReadStream, createWriteStream, promises,readdirSync,statSync } = require("fs");
const {join } = require('node:path');
const {mkdir} = promises
const {existsSync, lstatSync} = require('fs')
const Model = require('@mongodb-model/base-model')
const Couleurs = require('@mongodb-model/couleurs')
const {Green, Red} = new Couleurs


class Migrate extends require("./base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });
  

    // auto bind methods
    this.autobind(Migrate);
    // auto invoke methods
    this.autoinvoker(Migrate);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }


  types() {
    return [
      'double', 'string', 'object', 'array', 'objectId', 'data', 'bool',
      'null', 'regex', 'int', 'timestamp', 'long', 'decimal', 'uuid', 'bindData',
      'mixed'
    ]
  }
  cmd(cmdCommand = 'User'){ return cmdCommand.endsWith('s') ? cmdCommand.toLowerCase(): `${cmdCommand}s`.toLocaleLowerCase()};

  path(path = '/app/schemas'){return require('path').join(process.cwd(), path); }
  async addDirectory (path = this.path()) {
    if(!existsSync(path)){
      await require('fs').promises.mkdir(path, {recursive: true});
    }
  }
  migrationPath(path = '/database/migrations'){return require('path').join(process.cwd(), path); }

  async addDirectory (path = this.path()) {
    if(!existsSync(path)){
      await require('fs').promises.mkdir(path, {recursive: true});
    }
  }
  checkForInstallation(){
    // exec('npm list mongo-transform', (error, stdout, stderr) => {
    //   if (error) {
    //     exec('npm link mongo-transform', (err, sto, sdi) => {
    //         if(err) return error
    //         if(sto){
    //             console.log(sto)
    //         }
    //     })
    //   }
    // });
  }
  modelPath(command){
    // return console.log(command);
    const paths = command.split('/');
    paths.pop();
    const modelPath = '/app/schemas/'+paths.join('/');
    return this.path(modelPath)
  }
  migrationModelPath(command){
    // return console.log(command);
    const paths = command.split('/');
    paths.pop();
    const modelPath = '/database/migrations/'+paths.join('/');
    return this.migrationPath(modelPath)
  }
  modelName(command) {
    // return console.log(command);
    const paths = command.split('/');
    const name = paths.pop();
    return name.charAt(0).toUpperCase() + name.slice(1);

  }
  collectionName(command){
    const paths = command.split('--schema=')[1]
    const name = paths.split('/').pop();
    return this.cmd(name);
  }

  onCreateCollection (namespace) {
    const {collection} = namespace
    let firstIndex = Array.from(collection).findIndex(str => str == ':');
    let secondIndex = Array.from(collection).findIndex(str => str == ',');
    let string = namespace.collection
    .slice(firstIndex,secondIndex)
    .split(':').filter(str => str.trim().length !== 0).join('')
    .split(`\x1B[32m'`).filter(str => str.trim().length !== 0).join('')
    .split("'")[0]
   
    // return console.log('string', string);
    
    // return console.log(Green(`${ns} migration successfully created!`));
   
    return console.log(Green(`${namespace.db}.${namespace.collection} successfully migrated!`));
}

onCreateCollectionError (error) {
    const {message} = error;
    let firstIndex = Array.from(message).findIndex(str => str == ':');
    let secondIndex = Array.from(message).findIndex(str => str == ',');

    // return console.log('string error', error.message);
    // let string = error.message
    // .slice(firstIndex,secondIndex)
    // .split(':').filter(str => str.trim().length !== 0).join('')
    // .split(`\x1B[32m'`).filter(str => str.trim().length !== 0).join('')
    // .split("'")[0]
    // return console.log('string error', string);
    let string = error.message
     string = error.message.split(' ').slice(1);//.join(' ').trim()
     string.pop();
     string  = string.join(' ').trim()
  return (error && error.codeName === 'NamespaceExists') ? console.log(Red(`${string} migrated!`)): ''
}

schemaName(name = 'User') {
    if(name.startsWith('--schema=')){
      name = name.split('=')[1].trim();
      if(name.length  === 0) return false;
      return name;
    }
    return false
  }
schemaPath(command){
    try{
      return join(this.modelPath(this.schemaName(command)), `${this.modelName(this.schemaName(command))}.js`);
    }catch(error){
      return error;
    }
}
filePath (base = './app', path =  './') {return join(base, path)} 


hasSchema(command, schemasPath = './app/schemas'){
  const name = 'app/schemas/' + command.split('=')[1] + '.js';
  const files = this.getAllFiles(schemasPath);
  
  if(files && files.length  > 0){
     const result = files.find(file => file === name);
     if(result && result !== undefined) return true;
     return false;
  }else{
    return false;
  }
 
}
hasMigration(command, schemasPath = './database/migrations'){
  const name = 'database/migrations/' + command.split('=')[1] + '.js';
  const files = this.getAllFiles(schemasPath);
  
  if(files && files.length  > 0){
     const result = files.find(file => file === name);
     if(result && result !== undefined) return true;
     return false;
  }else{
    return false;
  }
 
}

allSchemaMigration(file, model = new Model){
  //model.on('createCollection', this.onCreateCollection)
  model.createCollection(this.cmd(file.split('/').pop().split('.js').join('')),require(join(process.cwd(),'./'+file)))
  if(model.listenerCount('createCollection') > 1){
      model.removeListener('createCollection',this.onCreateCollection)
  }else{
      model.on('createCollection', this.onCreateCollection)
  }
  if(model.listenerCount('createCollection-error') > 1){
      model.removeListener('createCollection-error',this.onCreateCollectionError)
  }else{
      model.on('createCollection-error', this.onCreateCollectionError)
  }
}

allMigrationMigration(file, model = new Model){
  //model.on('createCollection', this.onCreateCollection)
  model.createCollection(this.cmd(file.split('/').pop().split('.js').join('')),require(join(process.cwd(),'./'+file)))
  if(model.listenerCount('createCollection') > 1){
      model.removeListener('createCollection',this.onCreateCollection)
  }else{
      model.on('createCollection', this.onCreateCollection)
  }
  if(model.listenerCount('createCollection-error') > 1){
      model.removeListener('createCollection-error',this.onCreateCollectionError)
  }else{
      model.on('createCollection-error', this.onCreateCollectionError)
  }
}
schemaMigration(command, model = new Model){
  // const sch = require(join(process.cwd(),'./app/schemas/' + command.split('=')[1] + '.js'));
  // console.log(this.collectionName(command))
  model.on('createCollection', this.onCreateCollection)
  model.createCollection(this.collectionName(command), require(join(process.cwd(),'./app/schemas/' + command.split('=')[1] + '.js')))
  // model.on('createCollection', this.onCreateCollection)
  model.on('createCollection-error', this.onCreateCollectionError)
 
}

migrationMigration(command, model = new Model){
  // const sch = require(join(process.cwd(),'./app/schemas/' + command.split('=')[1] + '.js'));
  // console.log(this.collectionName(command))
  model.on('createCollection', this.onCreateCollection)
  model.createCollection(this.collectionName(command), require(join(process.cwd(),'./database/migrations/' + command.split('=')[1] + '.js')))
  // model.on('createCollection', this.onCreateCollection)
  model.on('createCollection-error', this.onCreateCollectionError)
 
}

async migrateSchema(command, path = './app/schemas'){
   if(this.hasSchema(command)){
    if(existsSync(join(process.cwd(),'./app/schemas/' + command.split('=')[1] + '.js'))){
      this.schemaMigration(command)
    }else{
      console.log('migration schema not found')
    }
   }else{
    console.log('No schema exists for this migration')
   }
}
async migrateMigration(command, path = './database/migrations'){
  if(this.hasMigration(command)){
   if(existsSync(join(process.cwd(),'./database/migrations/' + command.split('=')[1] + '.js'))){
     this.migrationMigration(command)
   }else{
     console.log('migration schema not found')
   }
  }else{
   console.log('No schema exists for this migration')
  }
}
async readdirRecursive(dirPath, files = []) {
  try{
      const allFiles = await promises.readdir(dirPath);
      if(allFiles){
          for await(let file of allFiles){
              if((await promises.stat(dirPath + "/" + file)).isDirectory()){
                files = this.readdirRecursive(dirPath + "/" + file, files);
              }else{
                files.push(join(__dirname, dirPath, "/", file)) 
              }
          }
      }
      return files;
  }catch(error){
      return error;
  }
}

schemaPath(command){
    return join(this.modelPath(this.schemaName(command)), `${this.modelName(this.schemaName(command))}`).split('/mongo-transform/')[1]
  }

getAllFiles (dirPath, arrayOfFiles) {
  let files = readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = this.getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(join(dirPath, "/", file))
    }
  }.bind(this))
  return arrayOfFiles
}
migrateAllMigrations(command, migrationPath = './database/migrations'){
   try{
    const migrationFiles = this.getAllFiles(migrationPath);
    const hasMigrationFiles = () => migrationFiles && migrationFiles.length > 0
    if(hasMigrationFiles()){
      migrationFiles.forEach(migrationFile => {
        if(existsSync('./'+migrationFile)){
          this.allMigrationMigration(migrationFile)
        }
    })
    }else{
      console.log('no migrations available ')
    }
   }catch(error){
    if(error.message.includes('ENOENT: no such file or directory')){
      this.addDirectory (this.migrationPath(migrationPath))
     }else{
      console.log(error.message);
     }
   }
}
migrateAllSchemas(command, schemaPath = './app/schemas'){
  try{
    const schemaFiles = this.getAllFiles(schemaPath);
    const hasChemaFiles = () => schemaFiles && schemaFiles.length > 0
      if(hasChemaFiles()){
        schemaFiles.forEach(schemaFile => {
          if(existsSync('./'+schemaFile)){
            this.allSchemaMigration(schemaFile)
          }
      })
      }else{
        console.log('no schemas available ')
      }
  }catch(error){
    if(error.message.includes('ENOENT: no such file or directory')){
      this.addDirectory (this.path(schemaPath))
     }else{
      console.log(error.message);
     }
  }
}
migrateAll(command, schemaPath = './app/schemas', migrationPath = './database/migrations'){
  if(existsSync(this.migrationPath(migrationPath))){
    this.migrateAllMigrations(command, migrationPath)
  }
  if(existsSync(this.path(schemaPath))){
    this.migrateAllSchemas(command, schemaPath)
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

module.exports = Migrate;
