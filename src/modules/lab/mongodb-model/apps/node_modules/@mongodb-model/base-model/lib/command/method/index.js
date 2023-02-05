#!/usr/bin/env node

"use strict";

/**
 * Author
 *  @name Ericson S. Weah  
 *  @email afrosintech@gmail.com
 *  @website https://www.afrosintech.com
 *  @github https://github.com/afrosintech
 *  @gitlab https://gitlab.com/afrosintech
 *  @npm https://www.npmjs.com/~afrosintech
 *  @phone +1.385.204.5167
 *
 * @module MethodCommand
 * @kind class
 *
 * @extends Cli
 * @requires Cli
 *
 * @classdesc MethodCommand class
 */


 const Method = require("@mongodb-model/method");

//  exports.command = (index = 2) => process.argv[index];
 


class MethodCommand extends require("@mongodb-model/cli") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    // auto bind methods
    this.autobind(MethodCommand);
    // auto invoke methods
    this.autoinvoker(MethodCommand);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  command(index = 0) {
    return process.argv[index];
  }
  methodCommands(){
    return {
        "   --all":"              make model with all: [model_name] [\x1b[36m--all\x1b[0m]",
        "   -a":"                 make model with all: [model_name] [\x1b[36m-a\x1b[0m]",
        "   --controller=":"      make model with model http controller: [model_name] [\x1b[36m--controller=\x1b[0m\x1b[0m]\x1b[4mcontroller_name\x1b[0m",
        "   -c":"                 make model with model http controller: [model_name] [\x1b[36m-c \x1b[0m\x1b[0m]\x1b[4mcontroller_name\x1b[0m",
        "   --tcp":"              make model with model tcp controller: [model_name] [\x1b[36m--controller=\x1b[0m|\x1b[36m-c \x1b[0m\x1b[0m]\x1b[4mcontroller_name\x1b[0m [\x1b[36m--tcp\x1b[0m]",
        "   -t":"                 make model with model tcp controller: [model_name] [\x1b[36m--controller=\x1b[0m|\x1b[36m-c \x1b[0m\x1b[0m]\x1b[4mcontroller_name\x1b[0m [\x1b[36m-t\x1b[0m]",
        "   --migration=":"       make model with model migration: [model_name] [\x1b[36m--migration\x1b[0m]",
        "   -m":"                 make model with model migration: [model_name] [\x1b[36m-m\x1b[0m]",
        "   --schema=":"          make model with model schema: [model_name] [\x1b[36m--schema\x1b[0m]",
        "   -s":"                 make model with model schema: [model_name] [\x1b[36m-s\x1b[0m]",
      };
  }
  man(){
    if (true) {
      console.clear();
      // if (command.length !== 8)
      //   return this.emit("error", {
      //     error: `'${string}' is not command.`,
      //   });
     
  
      // \x1b[36m make:model\x1b[0m model_path //[\x1b[36m--list\x1b[0m\x1b[0m]
    let centered = `\x1b[36m NAME\x1b[0m
  \x1b[36m make:model \x1b[0m - Model make:model command details

 \x1b[36mSYNOPSIS \x1b[0m
  \x1b[36m make:model\x1b[0m [model_name] [\x1b[36m--all\x1b[0m|\x1b[36m-a\x1b[0m] | [model_name] [\x1b[36m--migration\x1b[0m|\x1b[36m-m\x1b[0m|\x1b[36m--schema\x1b[0m|\x1b[36m-s\x1b[0m] [\x1b[36m--controller=\x1b[0m|\x1b[36m-c \x1b[0m]\x1b[4mcontroller_name\x1b[0m [\x1b[36m--tcp\x1b[0m|\x1b[36m-t\x1b[0m]

\x1b[36m DESCRIPTION\x1b[0m
   Model method details and method list.

 \x1b[36m  The following options are available: \x1b[0m `;
      this.centered(`\x1b[32m MODEL MAKE:MODEL COMMAND USAGE MANUAL\x1b[0m`);
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

defaultCommand () {
  const {i, info, method} = new Method({ command: this.command(2).split('=')[1] })
  if(!this.command(2)){
    return method();
  }else{
    if(this.command(2).startsWith('--name=')){
      if(this.command(2).split('=')[0] === '--name'){
       
       if(this.command(3) === '--info'){
         return info(this.command(3));
       }else if(this.command(3) === '-i'){
         return i(this.command(3));
       }else{
         return console.log('invalid option!')
       }
      }else{
       return console.log('invalid command..')
      }
   }else{
    return method();
   }
  }
}
N() {
  const {n, i, info} = new Method({command: this.command(4)})
  if (this.command(3)) {
    if (this.command(4)) {
      switch (this.command(5)) {
        case "-i":
          i(this.command(5));
          break;
        case "--info":
          info(this.command(5));
          break;
        default:
          this.man()
          break;
      }
    } else {
      n(this.command(4));
    }
  } else {
    n();
  }
}
name(){
  const { n, i, info} = new Method({command: this.command(4)})
  // return console.log(this.command(4), this.command(5))
  if (this.command(3)) {
    if (this.command(4)) {
      switch (this.command(5)) {
        case "-i":
          i(this.command(5));
          break;
        case "--info":
          info(this.command(5));
          break;
        default:
          //  console.log(this.command(4), this.command(5))
          this.man()
          break;
      }
    } else {
      n(this.command(4));
    }
  } else {
    n();
  }
}

nameEqual(){
 
  let command = this.command(3).split('--name=').filter(cmd => cmd.trim().length !== 0);
  command = [...command, this.command(4)]
  const { n, i, info} = new Method({command: command[0]})
  if (this.command(3)) {
    if (command[0]) {
      switch (command[1]) {
        case "-i":
          i(command[1]);
          break;
        case "--info":
          info(command[1]);
          break;
        default:
          this.man()
          break;
      }
    } else {
      n(command[1]);
    }
  } else {
    n();
  }
}

method(){
  const {list} = new Method({command: this.command(3)})
  switch (this.command(3)) {
    case "-l":
      list()
      break;
    case "--list":
      list()
      break;
    case "man":
      console.log("make man page");
      break;
    case "-n":
      this.N();
      break;
    case "--name":
      this.name();
      break;
    case "help":
      console.log("help man page");
      break;
    default:
      if(this.command(3).startsWith('--name=')){
        return this.nameEqual();
      }else{
        this.defaultCommand();
      }
      break;
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
      return [];
    }

}

module.exports =  MethodCommand;