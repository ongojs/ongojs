"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module Man
 * @kind class
 *
 * @extends Transform
 * @requires Transform
 * @requires createReadStream
 * @requires createWriteStream
 * @requires promises
 *
 * @classdesc Man class
 */

const { createReadStream, createWriteStream, promises } = require("fs");

class Man extends require("./base") {
  constructor(options = {}) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });

    // auto bind methods
    this.autobind(Man);
    // auto invoke methods
    this.autoinvoker(Man);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
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

  man(string){
        
    const commands = {
        '\x1b[36mman\x1b[0m': '                  model man page: [\x1b[36mman\x1b[0m] ',
        '\x1b[36m--help\x1b[0m or \x1b[36m-h\x1b[0m': '         Help: [\x1b[36m--help\x1b[0m|\x1b[36m-h\x1b[0m\x1b[0m\x1b[0m]',
        '\x1b[36m--list\x1b[0m or \x1b[36m-l\x1b[0m ': '        List methods:  [\x1b[36mmethod\x1b[0m\x1b[0m][\x1b[36m--list\x1b[0m|\x1b[36m-l\x1b[0m]',
        '\x1b[36m--name\x1b[0m or \x1b[36m-n\x1b[0m': '         Get method by name: \x1b[36mmethod \x1b[0m[\x1b[36m--name=\x1b[0m\x1b[0m|\x1b[36m--name \x1b[0m]\x1b[0mmethod_name',
        '\x1b[36mmake:model\x1b[0m': '           Make model: [\x1b[36mmake:model\x1b[0m\x1b[0m\x1b[0m] model_name',
        '\x1b[36mmake:migration\x1b[0m': '       Make migration: [\x1b[36mmake:migration\x1b[0m\x1b[0m] migration_name',
        '\x1b[36mmake:schema\x1b[0m': '          Make schema: [\x1b[36mmake:schema\x1b[0m\x1b[0m\x1b[0m] schema_name',
        '\x1b[36m--model\x1b[0m or \x1b[36m-M\x1b[0m ': '       Make model: \x1b[0m[\x1b[36m--model=\x1b[0m|\x1b[36m--model\x1b[0m|\x1b[36m-M\x1b[0m] model_name',
        '\x1b[36m--migration\x1b[0m or \x1b[36m-m\x1b[0m': '    Make migration: [\x1b[36mmake:model\x1b[0m\x1b[0m\x1b[0m|\x1b[36m--model=\x1b[0m|\x1b[36m--model\x1b[0m|\x1b[36m-M\x1b[0m\x1b[0m] model_name \x1b[0m[\x1b[36m--migration\x1b[0m|\x1b[36m-m\x1b[0m]',
        '\x1b[36m--migrate\x1b[0m ': '           Migrate: [\x1b[36m--schema=\x1b[0m|\x1b[36m-s\x1b[0m]schema_name'

 
       
    }

    // let clean = string.split(' ').filter(str => str !== '').join(' ')
 

    if (string  === 'man' || string === ' -h' || string === '--help' ||  string === 'help') {
        console.clear()
                   let centered = `\x1b[36mNAME\x1b[0m
\x1b[36mmodel\x1b[0m - Model and an model's methods details 

\x1b[36mSYPNOSIS\x1b[0m
\x1b[36mmodel\x1b[0m [\x1b[36mman\x1b[0m|\x1b[36m--help\x1b[0m|\x1b[36m-h\x1b[0m|\x1b[36mhelp\x1b[0m]
\x1b[36mmodel\x1b[0m [\x1b[36mmethod\x1b[0m\x1b[0m][\x1b[36m--list\x1b[0m|\x1b[36m-l\x1b[0m]\x1b[0m[\x1b[0m\x1b[36m--name=\x1b[0m|\x1b[36m--name\x1b[0m|\x1b[36m-n\x1b[0m] method_name\x1b[0m [\x1b[36m--info\x1b[0m|\x1b[36m-i\x1b[0m]
\x1b[36mmodel\x1b[0m [\x1b[36mmake:model\x1b[0m|\x1b[36m--model=\x1b[0m|\x1b[36m--model\x1b[0m|\x1b[36m-M\x1b[0m\x1b[0m\x1b[0m\x1b[0m] model_name
\x1b[36mmodel\x1b[0m [\x1b[36mmake:schema\x1b[0m|\x1b[36m--schema=\x1b[0m|\x1b[36m--schema\x1b[0m|\x1b[36m-s\x1b[0m\x1b[0m\x1b[0m] schema_name
\x1b[36mmodel\x1b[0m [\x1b[36mmake:migration\x1b[0m|\x1b[36m--migration=\x1b[0m|\x1b[36m--migration\x1b[0m|\x1b[36m-m\x1b[0m\x1b[0m\x1b[0m] migration_name \x1b[0m
\x1b[36mmodel\x1b[0m [\x1b[36mmigrate\x1b[0m|\x1b[36m--migrate=\x1b[0m|\x1b[36m-m\x1b[0m\x1b[0m\x1b[0m]\x1b[0m[\x1b[36m--schema=\x1b[0m|\x1b[36m-s\x1b[0m] schema_name


\x1b[36mDESCRIPTION\x1b[0m
Model (short for mongodb model) and its usage details. Almost every aspect of model can be viewed or studied right here
from the command line interface. Model is very simple yet very powerful tool for interacting with
mongodb database and making internal or external API calls. Model is not an ORM! Under the hood it is a wrapper for the 
native mongodb nodejs driver. It also extracts away the complexities commonly encountered in mongodb
native nodejs driver or mongoose.js. It is also a duplex stream, specifically  the nodejs native transform stream. It uses the
full power of the mongodb native nodejs driver and of the native nodejs transform stream API. In other words, everything
you can do with native mongodb nodejs driver and native nodejs transform API you can do with model! 
Model is very highly event driven. It is compatible with mongoose.js`
    //this.horizontalLine()
    this.centered(`\x1b[32mMODEL COMMANDS AND USAGE MANUAL\x1b[0m`)
    //this.horizontalLine()
    this.description(centered)
    //this.horizontalLine()
    this.verticalSpace(2)

    let  options = {pad: 13, position: process.stdout.columns, hline: false, keyColor: '36',valueColor: '37'}
    this.texAligner(options, commands)
    console.log()
   
    }
  
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

module.exports = Man;





