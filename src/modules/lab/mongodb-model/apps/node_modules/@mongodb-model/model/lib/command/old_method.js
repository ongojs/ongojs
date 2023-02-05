exports.command = (index = 2) => process.argv[index];
  
exports.defaultCommand = () => {
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
  exports.n = () => {
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
  exports.name = () => {
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
  exports.commands = () =>  {
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
