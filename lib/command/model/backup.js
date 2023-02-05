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
 * @module ModelCommand
 * @kind class
 *
 * @extends Cli
 * @requires Cli
 *
 * @classdesc Model class
 */

const { readdirSync, statSync, promises, createReadStream, existsSync } = require('fs');
const { join } = require('path');

const Model = require("../../../src/cli");
const Couleur = require('@mongodb-model/couleurs');
const HTTPController = require("@mongodb-model/http-controller");
const TCPController = require("@mongodb-model/tcp-controller");

const { Green, Red } = new Couleur
class ModelCommand extends require("@mongodb-model/cli") {

  constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
      if (Object.keys(option).length > 0) {
        Object.keys(option).forEach((key) => { if (!this[key]) this[key] = option[key]; })
      }
    });

    // auto bind methods
    this.autobind(ModelCommand);
    // auto invoke methods
    this.autoinvoker(ModelCommand);
    // add other classes method if methods do not already exist. Argument order matters!
    // this.methodizer(..classList);
    //Set the maximum number of listeners to infinity
    this.setMaxListeners(Infinity);
  }
  path(path = '', base = join(process.cwd(), './app/models')) {
    return require('path').join(base, path)
  }

  /**
     * @name getFiles
     * @function
     *
     * @param {Object|Array} iterable iterable data to absorb
     * @param {Object} options Options provided to new stream.Readable([options]). By default, Readable.from() will set options.objectMode to true, unless this is explicitly opted out by setting options.objectMode to false.
     * 
     * @description creates readable streams out of iterators.


     * 
     * @return {Base}
     * 
     */
  getFiles(dirPath, arrayOfFiles = []) {
    if (!existsSync(dirPath)) return;
    {
      let files = readdirSync(dirPath)

      if (files) {
        for (let file of files) {
          if (statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = this.getFiles(dirPath + "/" + file, arrayOfFiles)
          } else {
            arrayOfFiles.push(join(__dirname, dirPath, "/", file))
          }
        }
      }
      return arrayOfFiles
    }
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
     * @return {Base}
     * 
     */
  async readdirRecursive(dirPath, files = [], results = [], length = []) {
    try {
      const allFiles = await promises.readdir(dirPath);
      if (allFiles) {
        for await (let file of allFiles) {
          if ((await promises.stat(dirPath + "/" + file)).isDirectory()) {
            files = this.readdirRecursive(dirPath + "/" + file, files, results, length);
          } else {
            // results.push(file)
          }
        }
      }
      return results;
    } catch (error) {
      return error;
    }

  }
  command(index = 0) {
    return process.argv[index];
  }
  methodCommands() {
    return {
      "   --all": "              make model with all: [model_name] [\x1b[36m--all\x1b[0m]",
      "   -a": "                 make model with all: [model_name] [\x1b[36m-a\x1b[0m]",
      "   --controller=": "      make model with model http controller: [model_name] [\x1b[36m--controller=\x1b[0m\x1b[0m]\x1b[4mcontroller_name\x1b[0m",
      "   -c": "                 make model with model http controller: [model_name] [\x1b[36m-c \x1b[0m\x1b[0m]\x1b[4mcontroller_name\x1b[0m",
      "   --tcp": "              make model with model tcp controller: [model_name] [\x1b[36m--controller=\x1b[0m|\x1b[36m-c \x1b[0m\x1b[0m]\x1b[4mcontroller_name\x1b[0m [\x1b[36m--tcp\x1b[0m]",
      "   -t": "                 make model with model tcp controller: [model_name] [\x1b[36m--controller=\x1b[0m|\x1b[36m-c \x1b[0m\x1b[0m]\x1b[4mcontroller_name\x1b[0m [\x1b[36m-t\x1b[0m]",
      "   --migration=": "       make model with model migration: [model_name] [\x1b[36m--migration\x1b[0m]",
      "   -m": "                 make model with model migration: [model_name] [\x1b[36m-m\x1b[0m]",
      "   --schema=": "          make model with model schema: [model_name] [\x1b[36m--schema\x1b[0m]",
      "   -s": "                 make model with model schema: [model_name] [\x1b[36m-s\x1b[0m]",
    };
  }
  man() {
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
  makeModelControllerRouter() {
    switch (this.command(7)) {
      case '--route':
        console.log('--route')
        break;
      case '-t':
        console.log('-r')
        break;
      default:
        console.log('invalid')
        break;
    }
  }
  makeModelControllerTRouter() {
    switch (this.command(7)) {
      case '--route':
        console.log('--route')
        break;
      case '-t':
        console.log('-r')
        break;
      default:
        console.log('invalid')
        break;
    }
  }
  makeModelRouterController() {
    switch (this.command(7)) {
      case '--tcp':
        console.log('--tcp')
        break;
      case '-t':
        console.log('-t')
        break;
      default:
        console.log('invalid')
        break;
    }
  }
  makeModelRouterRController() {
    switch (this.command(7)) {
      case '--tcp':
        console.log('--tcp')
        break;
      case '-t':
        console.log('-t')
        break;
      default:
        console.log('invalid')
        break;
    }
  }
  makeModelController() {
    switch (this.command(6)) {
      case '--tcp':
        if (this.command(7)) {
          this.makeModelControllerRouter()
        } else {
          console.log('--tcp')
        }
        break;
      case '-t':
        if (this.command(7)) {
          this.makeModelControllerTRouter()
        } else {
          console.log('-t')
        }
        break;
      case '--route':
        if (this.command(7)) {
          this.makeModelRouterController()
        } else {
          console.log('--route')
        }
        break;
      case '-r':
        if (this.command(7)) {
          this.makeModelRouterRController()
        } else {
          console.log('-r')
        }
        break;
      default:
        console.log('invalid')
        break;
    }
  }
  makeModelControllerCRouter() {
    switch (this.command(7)) {
      case '--route':
        console.log('--route')
        break;
      case '-r':
        console.log('-r')
        break;
      default:
        console.log('invalid')
        break;
    }
  }
  makeModelControllerCRouterController() {
    switch (this.command(7)) {
      case '--tcp':
        console.log('--tcp')
        break;
      case '-t':
        console.log('-t')
        break;
      default:
        console.log('invalid')
        break;
    }
  }
  makeModelControllerC() {
    switch (this.command(6)) {
      case '--tcp':
        if (this.command(7)) {
          this.makeModelControllerCRouter()
        } else {
          console.log('--tcp')
        }
        break;
      case '-t':
        if (this.command(7)) {
          this.makeModelControllerCRouter()
        } else {
          console.log('-t')
        }
        break;
      case '--route':
        if (this.command(7)) {
          this.makeModelControllerCRouterController()
        } else {
          console.log('--route')
        }
        break;
      case '-r':
        if (this.command(7)) {
          this.makeModelControllerCRouterController()
        } else {
          console.log('-r')
        }
        break;
      default:
        console.log('invalid')
        break;
    }
  }
  makeModelRouterControllerRouter() {
    switch (this.command(7)) {
      case '--route':
        console.log('--route')
        break;
      case '-r':
        console.log('-r')
        break;
      default:
        console.log('invalid')
        break;
    }
  }
  makeModelRouterRouterController() {
    switch (this.command(7)) {
      case '--tcp':
        console.log('--tcp')
        break;
      case '-t':
        console.log('-t')
        break;
      default:
        console.log('invalid')
        break;
    }
  }
  makeModelRouter() {
    switch (this.command(6)) {
      case '--tcp':
        if (this.command(7)) {
          this.makeModelRouterControllerRouter()
        } else {
          console.log('--tcp')
        }
        break;
      case '-t':
        if (this.command(7)) {
          this.makeModelRouterControllerRouter()
        } else {
          console.log('-t')
        }
        break;
      case '--route':
        if (this.command(7)) {
          this.makeModelRouterRouterController()
        } else {
          console.log('--route')
        }
        break;
      case '-r':
        if (this.command(7)) {
          this.makeModelRouterRouterController()
        } else {
          console.log('-r')
        }
        break;
      default:
        console.log('invalid')
        break;
    }
  }
  makeModelRouterCControllerRouter() {
    switch (this.command(7)) {
      case '--route':
        console.log('--route')
        break;
      case '-r':
        console.log('-r')
        break;
      default:
        console.log('invalid')
        break;
    }
  }
  makeModelRouterCRouterController() {
    switch (this.command(7)) {
      case '--tcp':
        console.log('--tcp')
        break;
      case '-t':
        console.log('-t')
        break;
      default:
        console.log('invalid')
        break;
    }
  }
  makeModelRouterC() {
    switch (this.command(6)) {
      case '--tcp':
        if (this.command(7)) {
          this.makeModelRouterCControllerRouter()
        } else {
          console.log('--tcp')
        }
        break;
      case '-t':
        if (this.command(7)) {
          this.makeModelRouterCControllerRouter()
        } else {
          console.log('-t')
        }
        break;
      case '--route':
        if (this.command(7)) {
          this.makeModelRouterCRouterController()
        } else {
          console.log('--route')
        }
        break;
      case '-r':
        if (this.command(7)) {
          this.makeModelRouterCRouterController()
        } else {
          console.log('-r')
        }
        break;
      default:
        console.log('invalid')
        break;
    }
  }
  makeModelCommandFour() {
    switch (this.command(4)) {
      case '--controller':
        if (this.command(6)) {
          this.makeModelController()
        } else {
          const httpController = new HTTPController({ command: this.command(2) })
          httpController.make(`${this.command(3)}sController`)
        }
        break;
      case '-c':
        if (this.command(6)) {
          this.makeModelControllerC()
        } else {
          const httpController = new HTTPController({ command: this.command(2) })
          httpController.make(`${this.command(3)}sController`)
        }
        break;
      case '--tcp':
        if (this.command(6)) {
          this.makeModelController()
        } else {
          const tcpController = new TCPController({ command: this.command(2) })
          tcpController.make(`${this.command(3)}sController`)

        }
        break;
      case '-t':
        if (this.command(6)) {
          this.makeModelController()
        } else {
          const tcpController = new TCPController({ command: this.command(2) })
          tcpController.make(`${this.command(3)}sController`)

        }
        break;
      case '--route':
        if (this.command(6)) {
          this.makeModelRouter()
        } else {
          console.log('--route')
        }
        break;
      case '-r':
        if (this.command(6)) {
          this.makeModelRouterC()
        } else {
          console.log('-r')
        }
        break;
      default:
        console.log(Red('invalid command'))
        break;
    }
  }
  // makeModel() {
  //   if (this.command(3)) {
  //     if(this.command(4)){
  //       const { make } = new Model({ command: this.command(2) });
  //       make(this.command(3));
  //       this.makeModelCommandFour()
  //     }else{
  //       const { make } = new Model({ command: this.command(2) });
  //       make(this.command(3));
  //     }
  //   } else {
  //       console.log(Red('unrecognized command'))
  //   }
  // }

  controllerRouteOption(rCommand = '-r', cCommand = '-c') {
    if (this.command(7)) {
      switch (this.command(7)) {
        case 'h':
          console.log(`${this.command(3)} ${cCommand} ${this.command(5)} ${rCommand} ${this.command(7)}`);
          break;
        case 'http':
          console.log(`${this.command(3)} ${cCommand} ${this.command(5)} ${rCommand} ${this.command(7)}`);
          break;
        case 't':
          console.log(`${this.command(3)} ${cCommand} ${this.command(5)} ${rCommand} ${this.command(7)}`);
          break;
        case 'tcp':
          console.log(`${this.command(3)} ${cCommand} ${this.command(5)} ${rCommand} ${this.command(7)}`);
          break;
        default:
          console.log(Red(`unrecognized argument for ${rCommand} option`))
          break;
      }
    } else {
      console.log(Red(`Valid argument needed for ${rCommand} option`))
    }
  }
  controllerOption(command = '-c') {
    if (this.command(5)) {
      switch (this.command(5)) {
        case 'h':
          if (this.command(6)) {
            switch (this.command(6)) {
              case '-r':
                this.controllerRouteOption('-r', command)
                break;
              case '--route':
                this.controllerRouteOption('--route', command)
                break;
              default:
                console.log(Red('unrecognized command'))
                break;
            }
          } else {
            console.log(`${this.command(3)} ${command} h`);
          }
          break;
        case 'http':
          if (this.command(6)) {
            switch (this.command(6)) {
              case '-r':
                this.controllerRouteOption('-r', command)
                break;
              case '--route':
                this.controllerRouteOption('--route', command)
                break;
              default:
                console.log(Red('unrecognized command'))
                break;
            }
          } else {
            console.log(`${this.command(3)} ${command} http`);
          }
          break;
        case 't':
          if (this.command(6)) {
            switch (this.command(6)) {
              case '-r':
                this.controllerRouteOption('-r', command)
                break;
              case '--route':
                this.controllerRouteOption('--route', command)
                break;
              default:
                console.log(Red('unrecognized command'))
                break;
            }
          } else {
            console.log(`${this.command(3)} ${command} t`);
          }
          break;
        case 'tcp':
          if (this.command(6)) {
            switch (this.command(6)) {
              case '-r':
                this.controllerRouteOption('-r', command)
                break;
              case '--route':
                this.controllerRouteOption('--route', command)
                break;
              default:
                console.log(Red('unrecognized command'))
                break;
            }
          } else {
            console.log(`${this.command(3)} ${command} tcp`);
          }
          break;
        default:
          console.log(Red('unrecognized command'))
          break;
      }
    } else {
      console.log(command);
    }
  }
  routeControllerOption(rCommand = '-r', cCommand = '-c') {
    if (this.command(7)) {
      switch (this.command(7)) {
        case 'h':
          console.log(`${this.command(3)} ${cCommand} ${this.command(5)} ${rCommand} ${this.command(7)}`);
          break;
        case 'http':
          console.log(`${this.command(3)} ${cCommand} ${this.command(5)} ${rCommand} ${this.command(7)}`);
          break;
        case 't':
          console.log(`${this.command(3)} ${cCommand} ${this.command(5)} ${rCommand} ${this.command(7)}`);
          break;
        case 'tcp':
          console.log(`${this.command(3)} ${cCommand} ${this.command(5)} ${rCommand} ${this.command(7)}`);
          break;
        default:
          console.log(Red(`unrecognized argument for ${rCommand} option`))
          break;
      }
    } else {
      console.log(Red(`Valid argument needed for ${rCommand} option`))
    }
  }
  routeOption(command = '-r') {
    if (this.command(5)) {
      switch (this.command(5)) {
        case 'h':
          if (this.command(6)) {
            switch (this.command(6)) {
              case '-c':
                this.routeControllerOption('-c', command)
                break;
              case '--controller':
                this.routeControllerOption('--controller', command)
                break;
              default:
                console.log(Red('unrecognized command'))
                break;
            }
          } else {
            console.log(`${this.command(3)} ${command} h`);
          }
          break;
        case 'http':
          if (this.command(6)) {
            switch (this.command(6)) {
              case '-c':
                this.routeControllerOption('-c', command)
                break;
              case '--controller':
                this.routeControllerOption('--controller', command)
                break;
              default:
                console.log(Red('unrecognized command'))
                break;
            }
          } else {
            console.log(`${this.command(3)} ${command} http`);
          }
          break;
        case 't':
          if (this.command(6)) {
            switch (this.command(6)) {
              case '-c':
                this.routeControllerOption('-c', command)
                break;
              case '--controller':
                this.routeControllerOption('--controller', command)
                break;
              default:
                console.log(Red('unrecognized command'))
                break;
            }
          } else {
            console.log(`${this.command(3)} ${command} t`);
          }
          break;
        case 'tcp':
          if (this.command(6)) {
            switch (this.command(6)) {
              case '-c':
                this.routeControllerOption('-c', command)
                break;
              case '--controller':
                this.routeControllerOption('--controller', command)
                break;
              default:
                console.log(Red('unrecognized command'))
                break;
            }
          } else {
            console.log(`${this.command(3)} ${command} tcp`);
          }
          break;
        default:
          console.log(Red('unrecognized command'))
          break;
      }
    } else {
      console.log(command);
    }
  }
  defaultControllerRouteOptions(controllerCommand = 'h') {
    if (this.command(5)) {
      switch (this.command(5)) {
        case '-r':
          if (this.command(6)) {
            switch (this.command(6)) {
              case 'h':
                console.log(`${this.command(3)} --controller ${controllerCommand} -r h`);
                break;
              case 'http':
                console.log(`${this.command(3)} --controller ${controllerCommand} -r http`);
                break;
              case 't':
                console.log(`${this.command(3)} --controller ${controllerCommand} -r  t`);
                break;
              case 'tcp':
                console.log(`${this.command(3)} --controller ${controllerCommand} -r tcp`);
                break;
              default:
                console.log(Red(` Invalid argument for '${this.command(3)} --controller ${controllerCommand} -r'`));
                break

            }
          } else {
            console.log(Red(`${this.command(3)} --controller ${controllerCommand} -r needs a valid option`));
          }
          break;
        case '--route':
          if (this.command(6)) {
            switch (this.command(6)) {
              case 'h':
                console.log(`${this.command(3)} --controller ${controllerCommand} --route h `);
                break;
              case 'http':
                console.log(`${this.command(3)} --controller ${controllerCommand} --route http `);
                break;
              case 't':
                console.log(`${this.command(3)} --controller ${controllerCommand} --route t`);
                break;
              case 'tcp':
                console.log(`${this.command(3)} --controller ${controllerCommand} --route tcp`);
                break;
              default:
                console.log(Red(`Invalid argument for '${this.command(3)} --controller ${controllerCommand} --route'`));
                break
            }
          } else {
            console.log(Red(`'${this.command(3)} --controller ${controllerCommand} --route' needs a valid option`));
          }
          break;
        default:
          console.log(`${this.command(3)} --controller ${controllerCommand} -r `);
          break;
      }
    } else {
      console.log(`${this.command(3)} --controller ${controllerCommand}`);
    }
  }
  defaultRouteControllerOptions(routeCommand = 'h', controllerCommand = '-c'){
    if (this.command(6)) {
      switch (this.command(6)) {
        case 'h':
          console.log(`${this.command(3)} --route=${routeCommand} ${controllerCommand} h`);
          break;
        case 'http':
          console.log(`${this.command(3)} --route=${routeCommand} ${controllerCommand} http`);
          break;
        case 't':
          console.log(`${this.command(3)} --route=${routeCommand} ${controllerCommand} t`);
          break;
        case 'tcp':
          console.log(`${this.command(3)} --route=${routeCommand} ${controllerCommand} tcp `);
          break;
        default:
          console.log(Red(`Invalid argument for '${this.command(3)} --route=${routeCommand} ${controllerCommand}'`));
          break;
      }
    } else {
      console.log(Red(`'${this.command(3)} --route=${routeCommand} ${controllerCommand}' needs a valid option`));
    }
  }
  makeModel() {
    if (this.command(3)) {
      if (this.command(4)) {
        switch (this.command(4)) {
          case '-c':
            this.controllerOption('-c')
            break;
          case '--controller':
            this.controllerOption('--controller')
            break;
          case '-r':
            this.routeOption('-r')
            break;
          case '--route':
            this.routeOption('--route')
            break;
          default:
            if (this.command(4).startsWith('--controller=')) {
              switch (this.command(4).split('--controller=')[1].toLocaleLowerCase()) {
                case 'h':
                  this.defaultControllerRouteOptions()
                  // if(this.command(5)){
                  //   switch (this.command(5)){
                  //     case '-r':
                  //       if(this.command(6)){
                  //          switch (this.command(6)){
                  //           case 'h':
                  //             console.log(`${this.command(3)} --controller h -r h`);
                  //             break;
                  //           case 'http':
                  //             console.log(`${this.command(3)} --controller h -r http`);
                  //             break;
                  //           case 't':
                  //             console.log(`${this.command(3)} --controller h -r  t`);
                  //             break;
                  //           case 'tcp':
                  //             console.log(`${this.command(3)} --controller h -r tcp`);
                  //             break;
                  //           default:
                  //             console.log(Red(` Invalid argument for '${this.command(3)} --controller h -r'`));
                  //             break

                  //          }
                  //       }else{
                  //         console.log(Red(`${this.command(3)} --controller h -r needs a valid option`));
                  //       }
                  //       break;
                  //     case '--route':
                  //       if(this.command(6)){
                  //         switch (this.command(6)){
                  //          case 'h':
                  //            console.log(`${this.command(3)} --controller h --route h `);
                  //            break;
                  //          case 'http':
                  //            console.log(`${this.command(3)} --controller h --route http `); 
                  //            break;
                  //          case 't':
                  //            console.log(`${this.command(3)} --controller h --route t`);
                  //            break;
                  //          case 'tcp':
                  //            console.log(`${this.command(3)} --controller h --route tcp`);
                  //            break;
                  //           default:
                  //             console.log(Red(`Invalid argument for '${this.command(3)} --controller h --route'`));
                  //             break
                  //         }
                  //       }else{
                  //         console.log(Red(`'${this.command(3)} --controller h --route' needs a valid option`));
                  //       }
                  //         break;
                  //     default:
                  //       console.log(`${this.command(3)} --controller h -r `);
                  //       break;
                  //   }
                  // }else{
                  //   console.log(`${this.command(3)} --controller h`);
                  // }

                  break;
                case 'http':
                  this.defaultControllerRouteOptions('http')
                  // if (this.command(5)) {
                  //   switch (this.command(5)) {
                  //     case '-r':
                  //       if (this.command(6)) {
                  //         switch (this.command(6)) {
                  //           case 'h':
                  //             console.log(`${this.command(3)} --controller h -r `);
                  //             break;
                  //           case 'http':
                  //             console.log(`${this.command(3)} --controller h -r `);
                  //             break;
                  //           case 't':
                  //             console.log(`${this.command(3)} --controller h -r `);
                  //             break;
                  //           case 'tcp':
                  //             console.log(`${this.command(3)} --controller h -r `);
                  //             break;
                  //         }
                  //       } else {
                  //         console.log(`${this.command(3)} --controller h -r `);
                  //       }

                  //       break;
                  //     case '--route':
                  //       if (this.command(6)) {
                  //         switch (this.command(6)) {
                  //           case 'h':
                  //             console.log(`${this.command(3)} --controller h -r `);
                  //             break;
                  //           case 'http':
                  //             console.log(`${this.command(3)} --controller h -r `);
                  //             break;
                  //           case 't':
                  //             console.log(`${this.command(3)} --controller h -r `);
                  //             break;
                  //           case 'tcp':
                  //             console.log(`${this.command(3)} --controller h -r `);
                  //             break;
                  //         }
                  //       } else {
                  //         console.log(`${this.command(3)} --controller h -r `);
                  //       }
                  //       break;
                  //     default:
                  //       console.log(`${this.command(3)} --controller h -r `);
                  //       break;
                  //   }
                  // } else {
                  //   console.log(`${this.command(3)} --controller http`);
                  // }
                  break;
                case 't':
                  this.defaultControllerRouteOptions('t')
                  // if (this.command(5)) {
                  //   switch (this.command(5)) {
                  //     case '-r':
                  //       if (this.command(6)) {
                  //         switch (this.command(6)) {
                  //           case 'h':
                  //             console.log(`${this.command(3)} --controller h -r `);
                  //             break;
                  //           case 'http':
                  //             console.log(`${this.command(3)} --controller h -r `);
                  //             break;
                  //           case 't':
                  //             console.log(`${this.command(3)} --controller h -r `);
                  //             break;
                  //           case 'tcp':
                  //             console.log(`${this.command(3)} --controller h -r `);
                  //             break;
                  //         }
                  //       } else {
                  //         console.log(`${this.command(3)} --controller h -r `);
                  //       }
                  //       break;
                  //     case '--route':
                  //       if (this.command(6)) {
                  //         switch (this.command(6)) {
                  //           case 'h':
                  //             console.log(`${this.command(3)} --controller h -r `);
                  //             break;
                  //           case 'http':
                  //             console.log(`${this.command(3)} --controller h -r `);
                  //             break;
                  //           case 't':
                  //             console.log(`${this.command(3)} --controller h -r `);
                  //             break;
                  //           case 'tcp':
                  //             console.log(`${this.command(3)} --controller h -r `);
                  //             break;
                  //         }
                  //       } else {
                  //         console.log(`${this.command(3)} --controller h -r `);
                  //       }
                  //       break;
                  //     default:
                  //       console.log(`${this.command(3)} --controller h -r `);
                  //       break;
                  //   }
                  // } else {
                  //   console.log(`${this.command(3)} --controller t`);
                  // }
                  break;
                case 'tcp':
                  this.defaultControllerRouteOptions('tcp')
                  // if (this.command(5)) {
                  //   switch (this.command(5)) {
                  //     case '-r':
                  //       if (this.command(6)) {
                  //         switch (this.command(6)) {
                  //           case 'h':
                  //             console.log(`${this.command(3)} --controller h -r `);
                  //             break;
                  //           case 'http':
                  //             console.log(`${this.command(3)} --controller h -r `);
                  //             break;
                  //           case 't':
                  //             console.log(`${this.command(3)} --controller h -r `);
                  //             break;
                  //           case 'tcp':
                  //             console.log(`${this.command(3)} --controller h -r `);
                  //             break;
                  //         }
                  //       } else {
                  //         console.log(`${this.command(3)} --controller h -r `);
                  //       }

                  //       break;
                  //     case '--route':
                  //       if (this.command(6)) {
                  //         switch (this.command(6)) {
                  //           case 'h':
                  //             console.log(`${this.command(3)} --controller h -r `);
                  //             break;
                  //           case 'http':
                  //             console.log(`${this.command(3)} --controller h -r `);
                  //             break;
                  //           case 't':
                  //             console.log(`${this.command(3)} --controller h -r `);
                  //             break;
                  //           case 'tcp':
                  //             console.log(`${this.command(3)} --controller h -r `);
                  //             break;
                  //         }
                  //       } else {
                  //         console.log(`${this.command(3)} --controller h -r `);
                  //       }
                  //       break;
                  //     default:
                  //       console.log(`${this.command(3)} --controller h -r `);
                  //       break;
                  //   }
                  // } else {
                  //   console.log(`${this.command(3)} --controller tcp`);
                  // }
                  break;
                default:
                  console.log(Red('unrecognized command'))
                  break;
              }
            } else if (this.command(4).startsWith('--route=')) {
              switch (this.command(4).split('--route=')[1].toLocaleLowerCase()) {
                case 'h':
                  if (this.command(5)) {
                    switch (this.command(5)) {
                      case '-c':
                        this.defaultRouteControllerOptions()
                        // if (this.command(6)) {
                        //   switch (this.command(6)) {
                        //     case 'h':
                        //       console.log(`${this.command(3)} --route=h -c h`);
                        //       break;
                        //     case 'http':
                        //       console.log(`${this.command(3)} --route=h -c http`);
                        //       break;
                        //     case 't':
                        //       console.log(`${this.command(3)} --route=h -c t`);
                        //       break;
                        //     case 'tcp':
                        //       console.log(`${this.command(3)} --route=h -c tcp `);
                        //       break;
                        //     default:
                        //       console.log(Red(`Invalid argument for '${this.command(3)} --route=h -c'`));
                        //       break;
                        //   }
                        // } else {
                        //   console.log(Red(`'${this.command(3)} --route=h -c' needs a valid option`));
                        // }

                        break;
                      case '--controller':
                        this.defaultRouteControllerOptions('--controller')
                        // if (this.command(6)) {
                        //   switch (this.command(6)) {
                        //     case 'h':
                        //       console.log(`${this.command(3)} --route=h --controller h`);
                        //       break;
                        //     case 'http':
                        //       console.log(`${this.command(3)} --route=h --controller http `);
                        //       break;
                        //     case 't':
                        //       console.log(`${this.command(3)} --route=h --controller t`);
                        //       break;
                        //     case 'tcp':
                        //       console.log(`${this.command(3)} --route=h --controller tcp`);
                        //       break;
                        //     default:
                        //         console.log(Red(`Invalid argument for '${this.command(3)} --route=h --controller'`));
                        //         break;
                        //   }
                        // } else {
                        //   console.log(Red(`'${this.command(3)} --route=h --controller' needs a valid option`));
                        // }
                        break;
                      default:
                        console.log(Red(`'${this.command(3)} --route=h --controller' needs a valid option`));
                        break;
                    }
                  } else {
                    console.log(`${this.command(3)} --route=h`);
                  }
                  break;
                case 'http':
                  if (this.command(5)) {
                    switch (this.command(5)) {
                      case '-c':
                        this.defaultRouteControllerOptions('http')
                        // if (this.command(6)) {
                        //   switch (this.command(6)) {
                        //     case 'h':
                        //       console.log(`${this.command(3)} --route=http -c h `);
                        //       break;
                        //     case 'http':
                        //       console.log(`${this.command(3)} --route=http -c http `);
                        //       break;
                        //     case 't':
                        //       console.log(`${this.command(3)} --route=http -c t `);
                        //       break;
                        //     case 'tcp':
                        //       console.log(`${this.command(3)} --route=http -c tcp`);
                        //       break;
                        //     default: 
                        //       console.log(Red(`Invalid argument for '${this.command(3)} --route=http -c'`));
                        //       break
                        //   }
                        // } else {
                        //   console.log(Red(`'${this.command(3)} --route=http -c' needs a valid option`));
                        // }

                        break;
                      case '--controller':
                        this.defaultRouteControllerOptions('http', '--controller')
                        // if (this.command(6)) {
                        //   switch (this.command(6)) {
                        //     case 'h':
                        //       console.log(`${this.command(3)} --route=http --controller h`);
                        //       break;
                        //     case 'http':
                        //       console.log(`${this.command(3)} --route=http --controller http `);
                        //       break;
                        //     case 't':
                        //       console.log(`${this.command(3)}--route=http  --controller t `);
                        //       break;
                        //     case 'tcp':
                        //       console.log(`${this.command(3)} --route=http --controller tcp `);
                        //       break;
                        //     default: 
                        //       console.log(Red(`Invalid argument for '${this.command(3)} --route=http --controller'`));
                        //       break
                        //   }
                        // } else {
                        //   console.log(Red(`'${this.command(3)} --route=http --controller' needs a valid option`));
                        // }
                        break;
                      default:
                        console.log(`${this.command(3)} --controller h -r `);
                        break;
                    }
                  } else {
                    console.log(`${this.command(3)} --route=http`);
                  }

                  // console.log(`${this.command(3)} --route http`);
                  break;
                case 't':
                  if (this.command(5)) {
                    switch (this.command(5)) {
                      case '-c':
                        this.defaultRouteControllerOptions('t')
                        // if (this.command(6)) {
                        //   switch (this.command(6)) {
                        //     case 'h':
                        //       console.log(`${this.command(3)} --route=t -c h `);
                        //       break;
                        //     case 'http':
                        //       console.log(`${this.command(3)} --route=t -c http `);
                        //       break;
                        //     case 't':
                        //       console.log(`${this.command(3)} --route=t -c t `);
                        //       break;
                        //     case 'tcp':
                        //       console.log(`${this.command(3)} --route=t -c tcp `);
                        //       break;
                        //     default: 
                        //       console.log(Red(`Invalid argument for '${this.command(3)} --route=t -c'`));
                        //       break
                        //   }
                        // } else {
                        //   console.log(Red(`'${this.command(3)} --route=t -c' needs a valid option`));
                        // }

                        break;
                      case '--controller':
                        this.defaultRouteControllerOptions('t','--controller')
                        // if (this.command(6)) {
                        //   switch (this.command(6)) {
                        //     case 'h':
                        //       console.log(`${this.command(3)} --route=t --controller h`);
                        //       break;
                        //     case 'http':
                        //       console.log(`${this.command(3)} --route=t --controller http`);
                        //       break;
                        //     case 't':
                        //       console.log(`${this.command(3)} --route=t --controller t`);
                        //       break;
                        //     case 'tcp':
                        //       console.log(`${this.command(3)} --route=t --controller tcp`);
                        //       break;
                        //     default: 
                        //       console.log(Red(`Invalid argument for '${this.command(3)} --route=t --controller'`));
                        //       break
                        //   }
                        // } else {
                        //   console.log(Red(`'${this.command(3)} --route=t --controller' needs a valid option`));
                        // }
                        break;
                      default:
                        console.log(`${this.command(3)} --controller h -r `);
                        break;
                    }
                  } else {
                    console.log(`${this.command(3)} --route=t`);
                  }

             /*      console.log(`${this.command(3)} --route t`); */
                  break;
                case 'tcp':
                  if (this.command(5)) {
                    switch (this.command(5)) {
                      case '-c':
                        this.defaultRouteControllerOptions('tcp')
                        // if (this.command(6)) {
                        //   switch (this.command(6)) {
                        //     case 'h':
                        //       console.log(`${this.command(3)} --route=tcp -c h `);
                        //       break;
                        //     case 'http':
                        //       console.log(`${this.command(3)} --route=tcp -c http `);
                        //       break;
                        //     case 't':
                        //       console.log(`${this.command(3)} --route=tcp -c t `);
                        //       break;
                        //     case 'tcp':
                        //       console.log(`${this.command(3)} --route=tcp -c tcp `);
                        //       break;
                        //     default: 
                        //       console.log(Red(`Invalid argument for '${this.command(3)} --route=tcp -c'`));
                        //       break
                        //   }
                        // } else {
                        //   console.log(Red(`'${this.command(3)} --route=tcp -c' needs a valid option`));
                        // }

                        break;
                      case '--controller':
                        this.defaultRouteControllerOptions('tcp','--controller')
                        // if (this.command(6)) {
                        //   switch (this.command(6)) {
                        //     case 'h':
                        //       console.log(`${this.command(3)} --route=tcp --controller h `);
                        //       break;
                        //     case 'http':
                        //       console.log(`${this.command(3)} --route=tcp --controller http `);
                        //       break;
                        //     case 't':
                        //       console.log(`${this.command(3)} --route=tcp --controller t `);
                        //       break;
                        //     case 'tcp':
                        //       console.log(`${this.command(3)} --route=tcp --controller tcp `);
                        //       break;
                        //     default: 
                        //       console.log(Red(`Invalid argument for '${this.command(3)} --route=tcp --controller'`));
                        //       break
                        //   }
                        // } else {
                        //   console.log(Red(`'${this.command(3)} --route=tcp --controller' needs a valid option`));
                        // }
                        break;
                      default:
                        console.log(`${this.command(3)} --route=tcp --controller h `);
                        break;
                    }
                  } else {
                    console.log(`${this.command(3)} --route=tcp`);
                  }

                  // console.log(`${this.command(3)} --route tcp`);
                  break;
                default:
                  console.log(Red('unrecognized command'))
                  break;
              }
            } else {
              console.log(Red('unrecognized command'))
            }
            break;
        }
      } else {
        console.log(this.command(3))
      }
    } else {
      console.log(Red('unrecognized command'))
    }
  }
  delimiter(string = join(process.cwd(), './app/models/')) {
    return string
  }

  async list() {
    const models = this.getFiles(this.path())
    if (models && models.length) {
      console.log(`\x1b[36m
        MODELS COUNT: ${models.length} 
        =============== \x1b[0m`)
      models.forEach(file => console.log(`\x1b[32m ${file.split(this.delimiter())[1]} \x1b[0m `))
    } else {
      return console.log(Green('There is zero model so far!'))
    }

    //  this.getFiles(this.path()).forEach(file => console.log(`\x1b[32m ${file.split(this.delimiter())[1].split('.js')[0]} \x1b[0m `))
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

module.exports = ModelCommand;
