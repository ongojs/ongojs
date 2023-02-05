#!/usr/bin/env node
"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module CLI
 * @kind class
 *
 * @extends Transform
 * @requires Transform
 * @requires createReadStream
 * @requires createWriteStream
 * @requires promises
 *
 * @classdesc CLI class
 */

const Man = require("@mongodb-model/man");
const Couleur = require("@mongodb-model/couleurs");
const Method = require("@mongodb-model/method");


const MongoTransform = require("../");
const Model = require("../src/cli");
const Schema = require("@mongodb-model/schema");
const Migration = require("@mongodb-model/db-migration");
const Migrate = require("@mongodb-model/db-migrate");
const {MethodCommand, MigrationCommand, MigrateCommand, SchemaCommand, ModelCommand} = require('../lib')().Commands()

const { spawn } = require("node:child_process");
const { join } = require("path");
const ErrorNotification = require("@mongodb-model/error");

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
    // this.methodizer(AsyncAwait, Callback, CallbackQuery,CallbackQueryValidator);
    // this.methodizeProperty(require('../lib/command/router'))
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }

  commands(index = 0) {
    return process.argv[index];
  }
  invalidCommand(command = "command") {
    return `
    ----------------------------------------------------

    |${command}
    ----------------------------------------------------`;
  }

  errorNotification(command) {
    let ls;

    if (command !== undefined) {
      if (command.length > 18) {
        ls = spawn("echo", [
          "",
          `\x1b[5m\x1b[31m '${command.slice(
            0,
            18
          )}...' is not a valid command.\x1b[0m\x1b[0m`
        ]);
      } else {
        ls = spawn("echo", [
          "",
          `\x1b[5m\x1b[31m '${command.slice(
            0,
            18
          )}' is not a valid command.\x1b[0m\x1b[0m`
        ]);
      }
      ls.stdout.on("data", (data) => {
        if (command !== undefined) {
          console.log(this.invalidCommand(data));
        }
        console.log();
        console.log(`Some Available Options:
            man - for the man page.
            methods - for available method lists.
            help - for the help page.
            events - for available events.
            database - for connected database.
            model - for available models or collections.
            class - for main class.
                `);
      });

      ls.stderr.on("data", (data) => {});

      ls.on("close", (code) => {});
    } else {
      console.log(`Some Available Options:
            man - for the man page.
            methods - for available method lists.
            help - for the help page.
            events - for available events.
            database - for connected database.
            model - for available models or collections.
            class - for main class.
            `);
    }
  }
  command() {this.init()}
  init() {
    const {BIRed} = new Couleur
    if(!this.commands(2) || this.commands(2).trim().length === 0){
      new Man({ command: this.commands(2) }).man("man");
    }else{
      switch (this.commands(2)) {
        case "h":
          new Man({ command: this.commands(2) }).man("man");
          break;
        case "help":
          new Man({ command: this.commands(2) }).man("man");
          break;
        case "--help":
          new Man({ command: this.commands(2) }).man("man");
          break;
        case "-h":
          new Man({ command: this.commands(2) }).man("man");
          break;
        case "man":
          new Man({ command: this.commands(2) }).man("man");
          break;
        case "--man":
          new Man({ command: this.commands(2) }).man("man");
          break;
        case "method":
          new MethodCommand().method()
          break;
        case "models":
          new ModelCommand().list()
          break;
        case "make:model":
          new ModelCommand().makeModel();
          // console.log('make:model', new ModelCommand);
          break;
        case "make:schema":
          new SchemaCommand().makeSchema();
          break;
        case "make:migration":
          new MigrationCommand().makeMigration()
          break;
        case "migrate":
          new MigrateCommand().migrate();
          break;
        case "--model=":
            console.log('--model=')
          break;
        case "-M":
            console.log('-M')
          break;
        default:
          // new Man({ command: this.commands(2) }).man("man");
          console.log(BIRed(`${this.commands(2)} is not command`));
          break;
      }
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
    return ['init'];
  }
  
}

module.exports = new CLI();
