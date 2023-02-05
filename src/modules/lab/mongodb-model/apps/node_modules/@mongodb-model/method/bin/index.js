#!/usr/bin/env node

"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module CLI
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc CLI class
 */

const Method = require("../");
class CLI extends require("../base") {
  constructor(...arrayOfObjects) {
    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach((option) => {
      if (Object.keys(option).length > 0) {
        Object.keys(option).forEach((key) => {
          if (!this[key]) this[key] = option[key];
        });
      }
    });

    // auto bind methods
    this.autobind(CLI);
    // auto invoke methods
    this.autoinvoker(CLI);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  command(index = 2) {
    return process.argv[index];
  }
  default(){
    if(!this.command(2)){
      return new Method({command: this.command(2)}).method();
    }else{
      if(this.command(2).startsWith('--name=')){
        if(this.command(2).split('=')[0] === '--name'){
         if(this.command(3) === '--info'){
           return new Method({ command: this.command(2).split('=')[1] }).info(this.command(3));
         }else if(this.command(3) === '-i'){
           return new Method({ command: this.command(2).split('=')[1] }).i(this.command(3));
         }else{
           return console.log('invalid option!')
         }
        }else{
         return console.log('invalid command')
        }
     }else{
       return console.log('invalid command')
     }
    }
    
    
  }
  n(){
    if (this.command(3)) {
      if (this.command(4)) {
        switch (this.command(4)) {
          case "-i":
            new Method({ command: this.command(3) }).i(this.command(4));
            break;
          case "--info":
            new Method({ command: this.command(3) }).info(this.command(4));
            break;
          default:
            console.log(this.command(4), "is not a valid option");
            break;
        }
      } else {
        new Method({ command: this.command(2) }).n(this.command(4));
      }
    } else {
      new Method({ command: this.command(2) }).n();
    }
  }
  name(){
    if (this.command(3)) {
      if (this.command(4)) {
        switch (this.command(4)) {
          case "-i":
            new Method({ command: this.command(3) }).i(this.command(4));
            break;
          case "--info":
            new Method({ command: this.command(3) }).info(this.command(4));
            break;
          default:
            console.log(this.command(4), "is not a valid option");
            break;
        }
      } else {
        new Method({ command: this.command(2) }).n(this.command(4));
      }
    } else {
      new Method({ command: this.command(2) }).n();
    }
  }
  commands() {
    switch (this.command(2)) {
      case "--list":
        new Method({ command: this.command(2) }).list();
        break;
      case "man":
        console.log("make man page");
        break;
      case "-n":
        this.n()
        break;
      case "--name":
       this.name()
        break;
      case "help":
        console.log("help man page");
        break;
      default:
        this.default()
        break;
    }
  }

  init() {
    this.commands();
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
    return ["init"];
  }
}

module.exports = new CLI();
