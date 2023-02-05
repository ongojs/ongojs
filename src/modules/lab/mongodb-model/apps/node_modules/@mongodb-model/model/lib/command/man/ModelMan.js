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
 * @module ModelMan
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc ModelMan class
 */


class ModelMan extends require("../../../src/modules/cli") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    // auto bind methods
    this.autobind(ModelMan);
    // auto invoke methods
    this.autoinvoker(ModelMan);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
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

module.exports =  ModelMan;
