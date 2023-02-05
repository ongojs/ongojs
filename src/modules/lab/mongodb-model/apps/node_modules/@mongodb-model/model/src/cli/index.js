"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module Model
 * @kind class
 *
 * @extends Transform
 * @requires Transform
 * @requires createReadStream
 * @requires createWriteStream
 * @requires promises
 *
 * @classdesc Model class
 */

const { createReadStream, createWriteStream, promises} = require("fs");
const {join } = require('node:path');
const {existsSync} = require('fs')

const { exec } = require('node:child_process');
const Template  = require('@mongodb-model/template');

const {model} = new Template;

class Model extends require("../../base"){
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });

    // auto bind methods
    this.autobind(Model);
    // auto invoke methods
    this.autoinvoker(Model);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  list(){
    console.log('list all models');
  }
  cmd(cmdCommand = 'User'){ return cmdCommand.endsWith('s') ? cmdCommand.toLowerCase(): `${cmdCommand}s`.toLocaleLowerCase()};

  path(path = '/app/models'){return require('path').join(process.cwd(), path); }
  async addDirectory (path = this.path()) {
    if(!existsSync(path)){
      await require('fs').promises.mkdir(path, {recursive: true});
    }
  }

  // checkForInstallation(){
  //   exec('npm list model', (error, stdout, stderr) => {
  //     if (error) {
  //       exec('npm link model', (err, sto, sdi) => {
  //           if(err) return error
  //           if(sto){
  //               console.log(sto)
  //           }
  //       })
  //     }
  //   });
  // }
  modelPath(command){
    const paths = command.split('/');
    paths.pop();
    const modelPath = '/app/models/'+paths.join('/');
    return this.path(modelPath)
  }
  modelName(command) {
    const paths = command.split('/');
    const name = paths.pop();
    return name.charAt(0).toUpperCase() + name.slice(1);

  }
  collectionName(command){
    const paths = command.split('/');
    const name = paths.pop();
    return this.cmd(name);
  }
  async make(command){
 
    // this.checkForInstallation();
    await this.addDirectory(this.modelPath(command));
    if(!existsSync(join(this.modelPath(command), `${this.modelName(command)}.js`))){
      const writable = this.createWriteStream(join(this.modelPath(command), `${this.modelName(command)}.js`));
      writable.write(model({model: this.modelName(command), collection: this.collectionName(command)}));
      writable.end('');
      console.log(`\x1b[32m${this.modelName(command)} model successfully created!\x1b[0m`);
    }else{
      console.log(`\x1b[32m${this.modelName(command)}\x1b[0m\x1b[31m model already exists!\x1b[0m`);
    }
    
  }
  man(){
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
  methodCommands(){
    return {
        "   -l": " or \x1b[36m--list\x1b[0m        list available methods: \x1b[36m method --list \x1b[0m ",
        "   -n": " or \x1b[36m--name\x1b[0m        method by name: [\x1b[36m-n \x1b[0m|\x1b[36m--name=\x1b[0m]\x1b[4mmethod_name\x1b[0m",
        "   -i": " or \x1b[36m--info\x1b[0m        method info by method name: [\x1b[36m-n \x1b[0m|\x1b[36m--name=\x1b[0m]\x1b[4mmethod_name\x1b[0m[\x1b[36m-i\x1b[0m|\x1b[36m--info\x1b[0m]",
        "   -t": " or \x1b[36m--type\x1b[0m        method type by method name: [\x1b[36m-n \x1b[0m|\x1b[36m--name=\x1b[0m]\x1b[4mmethod_name\x1b[0m[\x1b[36m-t\x1b[0m|\x1b[36m--type\x1b[0m]",
      };
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

module.exports = Model;
