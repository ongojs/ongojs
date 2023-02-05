"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module Base
 * @kind class
 *
 * @extends Interface
 * @requires Interface
 * @requires createReadStream
 * @requires createWriteStream
 * @requires promises
 * @requires get
 * @requires request
 * @requires parse
 * @classdesc Base class
 */


const { createReadStream, promises } = require("fs");

const util = require("util");
const path = require("path");
const  {get, request} = require('https');
const {parse} = require('url')
const exec = util.promisify(require("child_process").exec);

const {Readable} = require('stream')

class Base extends require("readline").Interface {

  constructor(...arrayOfObjects) {
    super({
        input: process.stdin,
        output: process.stdout,
        prompt: ``,
        historySize: 1000,
        crlfDelay: Infinity,
        removeHistoryDuplicates: false,
        escapeCodeTimeout: 500,
      });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    // auto bind methods
    this.autobind(Base);
    // auto invoke methods
    this.autoinvoker(Base);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  /**
     * @name getFromIterable
     * @function
     *
     * @param {Object|Array} iterable iterable data to absorb
     * @param {Object} options Options provided to new stream.Readable([options]). By default, Readable.from() will set options.objectMode to true, unless this is explicitly opted out by setting options.objectMode to false.
     * 
     * @description creates readable streams out of iterators.


     * 
     * @return {Readable}
     * 
     */

  getFromIterable(
    iterable = {} | [],
    options = { objectMode: true, encoding: "utf-8", autoDestroy: true }
  ) {
    return Readable.from(JSON.stringify(iterable), options);
  }


    /**
     * @name makeFile
     * @function
     *
     * @param {Object|Array} iterable iterable data to absorb
     * @param {Object} options Options provided to new stream.Readable([options]). By default, Readable.from() will set options.objectMode to true, unless this is explicitly opted out by setting options.objectMode to false.
     * 
     * @description creates readable streams out of iterators.


     * 
     * @return {Readable}
     * 
     */

     makeFile(path = __dirname, data  = {}, stringify = true, options = { objectMode: true, encoding: "utf-8", autoDestroy: true }){
        return stringify ? Readable.from(JSON.stringify(data), options).pipe(createReadStream(path,options)): Readable.from(data, options).pipe(createReadStream(path,options))
     }



   /**
   * @name buffer
   * @function
   *
   * @param {Object} data the data to JSON parse
   *
   * @description JSON parses the buffered data
   *
   * @return JSON parsed buffered data;
   *
   */
  buffer(data){
    return JSON.parse(Buffer(data));
  }


   /**
   * @name bufferToString
   * @function
   *
   * @param {Object} data the data to stringify
   *
   * @description Stringifies buffered json parsed data;
   *
   * @return stringified json parsed buffered data
   *
   */
  bufferToString(data){
    return JSON.parse(Buffer(data).toString());
  }

   /**
   * @name apiGet
   * @function
   *
   * @param {String} url the https request api endpoint url
   * @param {Object} options the https request option object
   * @param {Function} fn the callback function 
   * @param {Array} data the resulting object of the https request call;
   *
   * @description makes an https get request to an api endpoint
   *
   * @return stringified json parsed buffered data
   *
   */
   apiGet(url, options = {}, fn = (result, data) => {}, data = []){
      get(url, options, response => {
         response.on('data', chunk => {
            data.push(chunk);
         });
         response.on('error', error => {
            this.emit('apiGet-error', error);
         });
         response.on('end', () => {
            this.emit('apiGet', JSON.parse(Buffer.concat(data).toString()));
            fn(JSON.parse(Buffer.concat(data).toString()), data);
         });
      })
      return this;
   }


   /**
   * @name apiRequest
   * @function
   *
   * @param {String} url the https request api endpoint url
   * @param {Object} options the https request option object
   * @param {Function} fn the callback function 
   * @param {Array} data the resulting object of the https request call;
   *
   * @description makes an https request to an api endpoint
   *
   * @return stringified json parsed buffered data
   *
   */
   apiRequest(url, options, fn = (result, data) => {}, data = []){
        request(url, options, response => {
            response.on('data', chunk => {
                data.push(chunk);
             });
             response.on('error', error => {
                this.emit('apiRequest-error', error.message);
                fn(error.message, error)
             });
             response.on('end', () => {
                this.emit('apiRequest', JSON.parse(Buffer.concat(data).toString()));
                fn(JSON.parse(Buffer.concat(data).toString()), data);
             });
        })
   }


    /**
   * @name post
   * @function
   *
   * @param {String} url the https request api endpoint url
   * @param {Array} data the resulting object of the https request call;
   * @param {Object} headers the https request option object
   * @param {Function} fn the callback function 
   * @param {String} datum the resulting object of the https request call;
  
   *
   * @description makes an https post request to an api endpoint
   *
   * @return stringified json parsed buffered data
   *
   */


   post(url = parse(url), data = JSON.stringify(data), headers = {'Content-Type': 'application/json','Content-Length': data.length
   }, fn = (result, data) => {}, datum = ``){

     const req =  request({...url, method: 'POST', headers}, response => {
        response.on('data', chunk => {
            datum += chunk;
        })
        response.on('end', () => {
            this.emit('post', JSON.parse(datum));
            fn(JSON.parse(datum), datum);
        })
        response.on('error', error => {
            this.emit('error', error.message);
            fn(error.message, error);
        })
     })
     req.write(datum);
     req.end();
   }

   removeDuplicateListeners(event) {
    if (this.rawListeners(event).length > 1) {
      for (let i = 1; i < this.rawListeners(event).length; i++) {
        this.removeListener(event, this.rawListeners(event)[i]);
      }
    }
  }
  eventList() {
    return [
      "man",
      "clear",
      "help",
      "menu",
      "exit",
      "quit",
      "leave",
      "admin",
      "login",
      "stats"
    ];
  }
  async run(command = "ls", options = {}) {
    console.clear();
    // const { stdout, error, stderr} =
    await exec(command, options);
    this.prompt();
  }
  main(string) {
    string =
      typeof string === "string" && string.trim().length > 0
        ? string.trim()
        : false;
    if (string) {
      let commandEvent = false;
      let event = this.eventList().find(
        (event) =>
          string.trim().toLowerCase().indexOf(event) > -1 &&
          string.startsWith(event)
      );

      if (event) {
        commandEvent = true;

        this.emit(event, string);
        return true;
      }
      if (commandEvent === false) {
        this.removeDuplicateListeners("command-not-found");
        return this.emit("command-not-found", {
          error: `'${string}' is not command`,
        });
      }
    } else {
      return;
    }
  }
  // init() {
  //   this.setPrompt(`[\x1b[34m:\x1b[0m`);
  //   console.clear();
  //   this.horizontalLine();

  //   this.centered("\x1b[34mCLI AND SERVER ARE LISTENING ON PORT 3000.\x1b[0m");
  //   this.horizontalLine();


  //   let options = {
  //     pad: 22,
  //     position: process.stdout.columns,
  //     hline: false,
  //     keyColor: "36",
  //     valueColor: "37",
  //   };

  //   // console.log('\x1b[34m%s\x1b[0m', 'CLI and server are running on port 3000.')
  //   // console.log('\x1b[36m%s\x1b[0m', `Type 'help' or 'man' for CLI usage`)
  //   console.log("");
  //   let cmds = {
  //     "FRONT END:":
  //       "\x1b[34mType \x1b[33mfrontend\x1b[0m \x1b[34mor\x1b[0m \x1b[34mnavigate to \x1b[33mhttp://localhost:3000\x1b[0m\x1b[0m \x1b[34m(Safari browser is not supported yet)\x1b[0m",
  //     "CLI:": `\x1b[34mType \x1b[33mman\x1b[0m \x1b[34mor\x1b[0m \x1b[33mhelp\x1b[0m \x1b[34mor\x1b[0m \x1b[33musers\x1b[0m \x1b[34mor\x1b[0m \x1b[33morders\x1b[0m \x1b[34mor\x1b[0m \x1b[33mmenu\x1b[0m\x1b[34m etc. for the corresponding manual\x1b[0m\x1b[0m`,
  //     "CLI ADMIN:":
  //       "\x1b[34musername:\x1b[0m\x1b[33m6122071306\x1b[0m\x1b[34m,\x1b[0m \x1b[34mpassword:\x1b[0m\x1b[33m#20Demaison\x1b[0m \x1b[34m(You must be logged in to have full access)\x1b[0m",
  //     "LOGIN:": `\x1b[34mType \x1b[33mlogin\x1b[0m \x1b[34mfor logging in\x1b[0m`,
  //     "LOGOUT:": `\x1b[34mType \x1b[33mlogout\x1b[0m \x1b[34mfor logging out\x1b[0m`,
  //   };
  //   this.texAligner(options, cmds);
  //   this.verticalSpace();
  //   this.horizontalLine();
  //   this.verticalSpace();
  //   this.prompt();
  //   this.on("line", (string) => {
  //     this.main(string);
  //     this.prompt();
  //   })
  //     .on("pause", () => {
  //       console.log('waiting for you ....')
  //     })
  //     .on("resume", () => {
  //       console.log('resumed ....')
  //     })
  //     .on('SIGINT', () => {
  //         this.question('Are you sure you want to exit? ', (answer) => {
  //           if (answer.match(/^y(es)?$/i)) this.close()
  //         })
  //       })
  //     .on("SIGCONT", () => {
  //       // `prompt` will automatically resume the stream
  //       this.prompt();
  //     })
  //     .on("SIGTSTP", () => {
  //       // This will override SIGTSTP and prevent the program from going to the
  //       // background.
  //       //console.log('Caught SIGTSTP.')
  //     })
  //     .on("close", () => {
  //       console.log(
  //         "\x1b[36m%s\x1b[0m",
  //         "Goodbye. Have a wonderful and lovely one!"
  //       );
  //       process.exit(0);
  //     });
  // }
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
      this.prompt();
      //process.exit(0)
    });

    this.on("error", (data) => {
      console.log();
      console.log(`\x1b[31m${data.error}\x1b[0m`);
      console.log();
      this.prompt();
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

  base() {
    return path.join(__dirname, "../../resources/storage/.data");
  }
  async findAll(path) {
    return await promises.readdir(`${this.base()}/${path}`);
  }
  hash(string) {
    if (typeof string === "string" && string.trim().length > 0) {
      const hash = require("crypto")
        .createHmac("sha256", "HolyMole!IsThisTheHashingSecret?")
        .update(string)
        .digest("hex");
      return hash;
    } else {
      return false;
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


  pluralize(item, quantiy) {
    return quantiy > 1 ? `${item}s` : `${item}`;
  }
  splitter(str, spl) {
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

  removeDuplicateListeners(event) {
    if (this.rawListeners(event).length > 1) {
      for (let i = 1; i < this.rawListeners(event).length; i++) {
        this.removeListener(event, this.rawListeners(event)[i]);
      }
    }
  }
  isNumber(str) {
    return !isNaN(str) === true ? true : false;
  }
  isNotNumber(str) {
    return isNaN(str) === true ? true : false;
  }
  regexes() {
    let phoneregex = /^[0-9]{3}([\- ]?)[0-9]{3}([\- ]?)[0-9]{4}$/gm;
    let hregex = /^[1-9]{1}$|^[1]{1}[0-9]{1}$|^[2]{1}[0-3]{1}$/gm;
    let mregex = /^[1-5]?[0-9]?$/gm;
    let dregex = /^(3[0]|[12][0-9]|[1-9])$/gm;
    let Mregex = /^(1[0-1]|[1-9])$/gm;
    let yregex = /^[0-9]?[0-9]$/gm;
    let Dregex = /^[0-9]?[0-9]$/gm;
    let jsonregex = /^[0-9]?[0-9]$/gm;
    let emailregex =
      /^[A-Za-z0-9_.%+-]+@[A-Za-z0-9_.-]+\.[A-Za-z.].{1,3}\S*$/gm;
    // positive number including zero
    let positivenumber = /^(0|[1-9][0-9]{0,9})$/gm;
    // positive number greater than zero
    let greaterthanzero = /^[1-9][0-9]*$/gm;
    let number = /-?[0-9]{0,10}/gm;
    let passwordregex =
      /^(?=.*[0-9])(?=.*[=#$%^+&*()_\-{}:;',.\`|/~[\])(?=.*[A-Z])(?=.*[a-z])[^ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]{8,15}$/gm;

    return {
      hregex,
      mregex,
      dregex,
      Mregex,
      yregex,
      Dregex,
      jsonregex,
      phoneregex,
      emailregex,
      positivenumber,
      greaterthanzero,
      number,
      passwordregex,
    };
  }
  validate(regex, string) {
    return regex.test(string);
  }
  isValid(regex, string) {
    return this.validate(regex, string) === true ? true : false;
  }
  onvalidateminute(
    minutes,
    errormessage = `Invalid input! Number of minutes must be from 1 to 59.`
  ) {
    let ismOK = this.isValid(this.regexes().mregex, minutes);
    if (ismOK === false || minutes === 0) {
      this.emit("invalid-number-of-minutes");
      console.log();
      return this.emit("error", {
        error: errormessage,
      });
    }
  }
  onvalidateday(
    days,
    errormessage = `Invalid input! Number of days must be from 1 to 30.`
  ) {
    let isdOK = this.isValid(this.regexes().dregex, days);
    if (isdOK === false) {
      return this.emit("error", {
        error: errormessage,
      });
    }
  }

  onarraywalk(searchIn, searchFor, number = false) {
    let result = new Set();
    for (let option of searchFor) {
      if (searchIn.includes(option)) {
        result.add(option);
      }
    }

    let tempresult = Array.from(result).filter((str) => str !== undefined);
    let noNumber = tempresult.filter((str) => Number.isNaN(str));

    return number === true ? noNumber : tempresult;
  }

  exclude(searchIn, searchFor, number = false) {
    let result = new Set();
    for (let option of searchFor) {
      if (!searchIn.includes(option)) {
        result.add(option);
      }
    }

    let tempresult = Array.from(result).filter((str) => str !== undefined);

    let noNumber = tempresult.filter((str) => Number.isNaN(str));
    return number === true ? noNumber : tempresult;
  }
  objectCopy(obj) {
    let copy = Object.create(Object.getPrototypeOf(obj));
    Object.getOwnPropertyNames(obj).forEach((name) => {
      Object.defineProperty(
        copy,
        name,
        Object.getOwnPropertyDescriptor(obj, name)
      );
    });
    return copy;
  }
  matchFinder(searchIn = [], searchFor = []) {
    if (!Array.isArray(searchIn) || !Array.isArray(searchFor)) return;

    let found = [];

    for (let sin of searchIn) {
      for (let sfor of searchFor) {
        if (sin.match(RegExp(sfor))) {
          found.push(sin);
        }
      }
    }
    return found;
  }
  /**
   * @name promisify
   * @function
   *
   * @param {Function|Object} fn the function or object to be promisified
   *
   * @description promisified functions or objects
   * @return {Function|Object} fn, the promisified function
   *
   */
  promisify(fn) {
    return (...args) =>
      new Promise(
        (resolve, reject) => fn(...args),
        (err, data) => (err ? reject(err) : resolve(data))
      );
  }

  /**
   * @name getField
   * @function
   *
   * @param {String|Object} attribute the attribute to extract
   *
   * @description Receive the name of an attribute  and produce a new function that will be able to extract  an attribute from an object
   *
   * @return {Function|Object} object, the function that will be able to extract an attribute from an object
   *
   */
  getField(attribute) {
    return (object) => object[attribute];
  }

  /**
   * @name pluckOff
   * @function
   *
   * @param {Function|Object} fn  the function to bind to object method
   *
   * @description plucks off a method from ANY object and makes that method a completely independent standalone reusable  function.
   *
   *  For instance, if I wanted to make Array.prototype.map method an independent standalone reusable function, I would do something like this: const myArrayMap = pluckOff(Array.prototype.map). Then I would use it like this:
   *
   * const array = [1,2,3,4,5]; const result = myArrayMap(array, x => x * 2); result = [2,4,6,8,10]
   *
   * @return {Function|Object} fn.bind(...args)(), the completely independent standalone reusable function
   *
   */

  pluckOff(fn) {
    return (...args) => fn.bind(...args)();
  }
  /**
     * @name callOnlyNTimes
     * @function
     *
     * @param {Function|Object} f the function to be called only n times
  
     * @param {Number} n number of time the function f() should be called
     *  
     * @description creates a function that calls and runs the function f() n times and only n times no matter how many times the function is called or used in the loop. It calls f() exactly n times. For instance if n = 1 and the function is called 200 times, it would call or execute f() only once (no more than once). If n = 5 and the function is called 200 times, it would call or execute f() exactly 5 times and no more than 5 times.
     * 
     * @return {Function|Object} a function that calls fn() only n times
     * 
     */
  callOnlyNTimes(fn, n = 1) {
    let done = false;
    return (...args) => {
      if (!done) {
        done = true;
        for (let i = 0; i < Math.abs(n); i++) {
          fn(...args);
        }
      }
    };
  }

  /**
   * @name callFirstOnlyNTimes
   * @function
   *
   * @param {Function|Object} f the function to be called only n times
   * @param {Function|Object} g  the function to be called as many times as left after f() is called n times
   * @param {Number} n number of time the function f() should be called
   *
   * @description creates a function that calls and runs the first argument function f() n times and only n times no matter how many times the function is called or used in the loop. It calls f() exactly n times and the rest of the times it calls g(). For instance if n = 1 and the function is called 200 times, it would call or execute f() only once and g() 199 times. If n = 5 and the function is called 200 times, it would call or execute f() exactly 5 times and g() 195 times.
   *
   * @return {Function|Object} a function that calls fn() only n times and g() afterward
   *
   */
  callFirstOnlyNTimes(f = () => {}, g = () => {}, n = 1) {
    let done = false;
    return (...args) => {
      if (!done) {
        done = true;
        if (typeof n !== "number" || n % 1 !== 0) {
          f(...args);
        } else {
          for (let i = 1; i <= Math.abs(n); i++) {
            f(...args);
          }
        }
      } else {
        g(...args);
      }
    };
  }

  /**
   * @name inputsValid
   * @function
   *
   * @param {Function} arr  the array to validate
   * @param {Function} fn  the call back function to validate
   * @param {Number} flat arr flattening depth to validate
   *
   * @description validates inputs
   *
   * @return {Boolean} true if inputs are valid and false if inputs are invalid
   *
   */
  inputsValid(arr = [], fn = () => {}, flat = 1) {
    if (!Array.isArray(arr)) return false;
    if (typeof fn !== "function") return false;
    if (
      typeof flat !== "number" ||
      flat < 0 ||
      (flat % 1 !== 0 && flat !== Infinity)
    )
      return false;
    return true;
  }

  /**
   * @name none
   * @function
   *
   * @param {Array|Object} arr the array to filter
   * @param {Function|Object} fn the predicate
   * @param {Number} flat  the array to filter flattening depth
   *
   * @description filters an array
   *
   * @return {Array|Object} array, the filtered array for which the predicate is true
   *
   */
  none(arr = [], fn = () => false, flat = 0) {
    return this.inputsValid(arr, fn, flat)
      ? arr.flat(flat).every((v) => !fn(v))
      : false;
  }

  /**
   * @name forEachAsync
   * @function
   *
   * @param {Array|Object} arr the array to filter
   * @param {Function|Object} fn the callback function
   * @param {Number} flat  the array to filter flattening depth
   *
   * @description asynchronously  loops an array
   *
   * @return {Promise}  a promise if promise is fulfilled and successful
   *
   */
  forEachAsync(arr = [], fn = () => false, flat = 0) {
    if (this.inputsValid(arr, fn, flat)) {
      return arr
        .flat(flat)
        .reduce(
          (promise, value) => promise.then(() => fn(value)),
          Promise.resolve()
        );
    } else {
      return undefined;
    }
  }

  /**
   * @name mapAsync
   * @function
   *
   * @param {Array|Object} arr the array to loop through
   * @param {Function|Object} fn the callback function
   * @param {Number} flat  the array to filter flattening depth
   *
   * @description asynchronously  maps an array
   *
   * @return {Promise}  a promise if promise is fulfilled and successful
   *
   */
  mapAsync(arr = [], fn = () => [], flat = 0) {
    return this.inputsValid(arr, fn, flat)
      ? Promise.all(arr.flat(flat).map(fn))
      : [];
  }

  /**
   * @name filterAsync
   * @function
   *
   * @param {Array|Object} arr the array to filter
   * @param {Function|Object} fn the callback function
   * @param {Number} flat  the array to filter flattening depth
   *
   * @description asynchronously  filters an array
   *
   * @return {Promise}  a promise if promise is fulfilled and successful
   *
   */

  filterAsync(arr = [], fn = () => [], flat = 0) {
    if (this.inputsValid(arr, fn, flat)) {
      return this.mapAsync(fn, flat).then((array) =>
        arr.flat(flat).filter((v, i) => Boolean(array[i]))
      );
    } else {
      return [];
    }
  }

  /**
   * @name reduceAsync
   * @function
   *
   * @param {Array|Object} arr the array to filter
   * @param {Function|Object} fn the callback function
   * @param {Number} flat  the array to filter flattening depth
   *
   * @description asynchronously  reduces an array
   *
   * @return {Promise}  a promise if promise is fulfilled and successful
   *
   */

  async reduceAsync(arr = [], fn = () => {}, init, flat = 0) {
    if (this.inputsValid(arr, fn, flat)) {
      return Promise.resolve(init).then((accumulator) =>
        this.forEachAsync(arr.flat(flat), async (v, i) => {
          accumulator = fn(accumulator, v, i);
        }).then(() => accumulator)
      );
    } else {
      return 0;
    }
  }
  /**
   * @name filter
   * @function
   *
   * @param {Array|Object} arr the array to filter
   * @param {Function|Object} fn the call back function
   * @param {Number} flat  the array to filter flattening depth
   *
   * @description filters an array
   *
   * @return {Array|Object} array, the filtered array
   *
   */
  filtered(arr = [], fn = () => [], flat = 1) {
    return this.inputsValid(arr, fn, flat)
      ? arr.flat(flat).filter((x) => fn(x))
      : [];
  }

  /**
   * @name filterItems
   * @function
   *
   * @param {Array|Object} arr the array to filter
   * @param {String} query any filtering query
   *
   * @description asynchronously read a query and filter arrays according to the query
   *
   * @return {Array}  the query filtered array
   *
   */
  filterItems(query, arr = []) {
    if (!Array.isArray(arr)) return [];
    return arr.filter(
      (el) => el.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  /**
   * @name some
   * @function
   *
   * @param {Array} arr the array to filter
   * @param {Function} fn the predicate
   * @param {Number} flat  the array to filter flattening depth
   *
   * @description filters an array according to the truthiness of the predicate
   *
   * @return {Boolean} true if at least one of the array items for which the predicate is true if found. false otherwise
   *
   */
  some(arr = [], fn = () => false, flat = 0) {
    return this.inputsValid(arr, fn, flat)
      ? arr.flat(flat).reduce((x, y) => x || fn(y), false)
      : false;
  }

  /**
   * @name every
   * @function
   *
   * @param {Array} arr the array to filter
   * @param {Function} fn the predicate
   * @param {Number} flat  the array to filter flattening depth
   *
   * @description filters an array according to the truthiness  of the predicate
   *
   * @return {Boolean} true if each one of the array items for which the predicate is true if found. false otherwise
   *
   */
  every(arr = [], fn = () => false, flat = 0) {
    if (this.inputsValid(arr, fn, flat)) {
      let result = [];
      arr
        .flat(flat)
        .reduce(
          (x, y) => (x === false && fn(y) ? result.push(y) : result.pop()),
          false
        );
      return result.length === arr.flat(flat).length ? true : false;
    } else {
      return false;
    }
  }

  /**
   * @name forEach
   * @function
   *
   * @param {Array} arr the array to filter
   * @param {Function} fn the call back function
   * @param {Number} flat  the array to filter flattening depth
   *
   * @description performs fn() operation for each of the array elements
   *
   * @return {Function|Object} the resulting object or array or element from the fn() operation
   *
   */

  forEach(arr = [], fn = () => false, flat = 0) {
    if (this.inputsValid(arr, fn, flat)) {
      for (let i = 0; i < arr.flat(flat).length; i++) {
        fn(arr.flat(flat)[i]);
      }
    } else {
      return undefined;
    }
  }

  /**
   * @name filter
   * @function
   *
   * @param {Array} arr the array to filter
   * @param {Function} fn the call back function
   * @param {Number} flat  the array to filter flattening depth
   *
   * @description filters an array according to the truthiness  of the predicate
   *
   * @return {Array} the resulting array
   *
   */

  filter(arr = [], fn = () => false, flat = 0) {
    if (this.inputsValid(arr, fn, flat)) {
      let result;
      result = [];
      for (let i = 0; i < this.flat(flat).length; i++) {
        fn(arr.flat(flat)[i]) ? result.push(arr.flat(flat)[i]) : [];
      }
      return result.length > 0 ? result : [];
    } else {
      return [];
    }
  }

  /**
   * @name flatten
   * @function
   *
   * @param {Array} arr the array to flatten
   *
   * @description flatten an array to whatsoever depth or level it has
   *
   * @return {Array} the resulting flattened array
   *
   */

  flatten(arr = []) {
    const result = [];
    arr.forEach((el) =>
      Array.isArray(el) ? result.push(...flatten(el)) : result.push(el)
    );
    return result;
  }

  /**
   * @name findIndex
   * @function
   *
   * @param {Array} arr the array to filter
   * @param {Function} fn the call back function
   * @param {Number} flat  the array to filter flattening depth
   *
   * @description find the index of an array element
   *
   * @return {Array} the resulting array element
   *
   */
  findIndex(arr = [], fn = () => false, flat = 0) {
    return this.inputsValid(arr, fn, flat)
      ? arr.flat(flat).reduce((x, y, z) => (x === -1 && fn(y) ? z : x), -1)
      : undefined;
  }

  /**
   * @name map
   * @function
   *
   * @param {Array} arr the array to filter
   * @param {Function} fn the call back function
   * @param {Number} flat  the array to filter flattening depth
   *
   * @description maps each element with the resulting operation of the callback function
   *
   * @return {Array} the resulting array
   *
   */
  map(arr = [], fn = () => [], flat = 0) {
    return this.inputsValid(arr, fn, flat)
      ? arr.flat(flat).reduce((x, y) => x.concat(fn(y)), [])
      : [];
  }

  /**
   * @name find
   * @function
   *
   * @param {Array} arr the array to filter
   * @param {Function} fn the predicate
   * @param {Number} flat  the array to filter flattening depth
   *
   * @description find the first array element for which the predicate is true
   *
   * @return {Array} the resulting array element
   *
   */
  find(arr = [], fn = () => false, flat = 0) {
    return this.inputsValid(arr, fn, flat)
      ? arr
          .flat(flat)
          .reduce((x, y) => (x === undefined && fn(y) ? y : x), undefined)
      : undefined;
  }


   /**
   * @name autobinder
   * @function
   *
   * @param {Object|Function|Class} className the class whose methods to be bound to it
   *
   * @description auto sets and auto binds every and all methods for the corresponding class (except the constructor)
   *
   * @return does not return anything
   *
   */

    autobinder(className = {}) {
      for (let method of Object.getOwnPropertyNames(className.prototype)) {
        if (typeof this[method] === "function" && method !== "constructor") {
          this[method] = this[method].bind(this);
        }
      }
    }
  
    /**
     * @name autobind
     * @function
     *
     * @param {Object|Function|Class} className the class whose methods to be bound to it
     *
     * @description auto mounts and auto binds every and all methods for the corresponding class including
     *  itself(itself mounts and self binds)
     *
     * @return does not return anything
     *
     */
  
    autobind(className = {}) {
      this.autobinder = this.autobinder.bind(this);
      this.autobinder(className);
    }
  
    /**
     * @name methodizer
     * @function
     *
     * @param {Object|Array} classNameList the class whose methods to be bound to it
     *
     * @description get methods from all classes with in-class name list array and makes its own
     *
     * @return does not return anything
     *
     */
  
    methodizer(...classNamesList) {
      if (classNamesList.length === 0) return;
      for (let className of classNamesList) {
        for (let method of Object.getOwnPropertyNames(className.prototype)) {
          if (this[method] === undefined || !this[method]) {
            if (typeof className.prototype[method] === "function") {
              this[method] = className.prototype[method];
              // auto bind each method form className class to this
              this[method] = this[method].bind(this);
            }
          }
        }
      }
    }
  
    /**
     * @name autoinvoker
     * @function
     *
     * @param {Object|Function|Class} className the class whose methods to be bound to it
     *
     * @description auto sets and auto invokes every and all methods for the corresponding class
     *
     * @return does not return anything
     *
     */
  
    autoinvoker(className = {}) {
      for (let method of Object.getOwnPropertyNames(className.prototype)) {
        this.autoinvoked().forEach((name) => {
          if (method === name) {
            this[method]();
          }
        });
      }
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
      return ["init", "common", "invalidCommand", "login"];
    }
}
module.exports = Base;

 

