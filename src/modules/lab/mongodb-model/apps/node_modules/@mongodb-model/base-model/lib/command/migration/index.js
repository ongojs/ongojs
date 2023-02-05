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
 * @module MigrationCommand
 * @kind class
 *
 * @extends Base
 * @requires Base
 *
 * @classdesc MigrationCommand class
 */

// const Migration = require("@mongodb-model/db-migration");
class MigrationCommand extends require("@mongodb-model/cli") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
            Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    // auto bind methods
    this.autobind(MigrationCommand);
    // auto invoke methods
    this.autoinvoker(MigrationCommand);
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
  makeMigration() {
    if (this.command(3)) {
      if (this.command(4)) {
        return new Migration({ command: this.command(3) }).makeMigration(
          this.command(3),
          this.command(4)
        );
      } else {
        return new Migration({ command: this.command(3) }).makeMigration(
          this.command(3)
        );
      }
    } else {
      this.man();
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

module.exports =  MigrationCommand;
