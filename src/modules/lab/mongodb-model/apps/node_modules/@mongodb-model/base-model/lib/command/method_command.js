const Method = require("../../../src/modules/model-method");

exports.command = (index = 2) => process.argv[index];

const {list, method, n, i, info} = new Method({command: this.command(2)})

exports.defaultCommand = () => {
  if(!this.command(2)){
    return method();
  }else{
    if(this.command(2).startsWith('--name=')){
      if(this.command(2).split('=')[0] === '--name'){
        const {i, info} = new Method({ command: this.command(2).split('=')[1] })
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
    //  return console.log('invalid command...')
   }
  }
}
exports.N = () => {
  if (this.command(3)) {
    if (this.command(4)) {
      switch (this.command(4)) {
        case "-i":
          i(this.command(4));
          break;
        case "--info":
          info(this.command(4));
          break;
        default:
          console.log(this.command(4), "is not a valid option");
          break;
      }
    } else {
      n(this.command(4));
    }
  } else {
    n();
  }
}
exports.name = () => {
  if (this.command(3)) {
    if (this.command(4)) {
      switch (this.command(4)) {
        case "-i":
          i(this.command(4));
          break;
        case "--info":
          info(this.command(4));
          break;
        default:
          console.log(this.command(4), "is not a valid option");
          break;
      }
    } else {
      n(this.command(4));
    }
  } else {
    n();
  }
}

module.exports = () => {
    switch (this.command(3)) {
      case "--list":
        list();
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
        this.defaultCommand();
        break;
    }
  }