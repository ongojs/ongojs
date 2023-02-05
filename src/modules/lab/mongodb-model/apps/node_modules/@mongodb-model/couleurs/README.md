# Couleurs

Couleurs helps in styling,coloring text (string), and terminals. Couleurs is a duplex stream, specifically a Transform stream with some functionalities added. It uses full power of the NodeJs Native Transform Stream API. In other words, everything you can do with NodeJs Native Transform API you can do with couleurs! Couleurs is very highly event driven. Its common use is by extension or by using object destruction to get the instance methods needed. "Couleurs" is the french word for "colors".

### Installation

```bash
$ yarn add @mongodb-model/couleurs

```
 or 

```bash

$ npm i @mongodb-model/couleurs

```

### Simple Usage Examples


#### Making api request (http request)
```javascript
const Couleurs = require('@mongodb-model/couleurs');
const couleur = new Couleurs();
couleur.apiGet(); //base.apiGet(your api endpoint)
couleur.on('apiGet', data => console.log(data));
couleur.on('apiGet-error', error => console.error(error));
```
#### By extension

```javascript
class MyWonderfulClass extends require('@mongodb-model/couleurs') {

    constructor(...arrayOfObjects) {

    super({ objectMode: true, encoding: "utf-8", autoDestroy: true });

    arrayOfObjects.forEach(option => {
        if(Object.keys(option).length > 0){
          Object.keys(option).forEach((key) => { if(!this[key]) this[key] = option[key];})
        }
    });

    this.autobind(MyWonderfulClass);
    this.autoinvoker(MyWonderfulClass);
    this.setMaxListeners(Infinity);
  }
};

```

#### Couleurs methods usage example
```javascript

const Couleurs = require('@mongodb-model/couleurs');

// You may use object destruction to get methods needed from the instance.
const {Color_Off,Green,BBlue,Blinker,Bold,SetColor,Underline} = new Couleurs

// output green text
console.log(Green('I am green and I like it!'))

// output bold blue text
console.log(BBlue('I am Bold Blue and I like it!'))

// output blinking text (depending on bash shell version it may not work. It may not work on older bash versions)
console.log(Blinker('I am blinking and I like it!'))

// output bold  text
console.log(Bold('I am bold and I like it!'))

// output underline text
console.log(Underline('I am underline and I like it!'))

// reset text style to default and outputs it
console.log(Color_Off('I am reset to my default style and I like it!'))

```


#### Available Couleurs methods 
```javascript

    // Reset text style to default
    Color_Off(string = 'coloring?');       // Text Reset

    // Regular Colors
    Black(string = 'coloring?');        // Black
    Red(string = 'coloring?');          // Red
    Green(string = 'coloring?');        // Green
    Yellow(string = 'coloring?');       // Yellow
    Blue(string = 'coloring?');         // Blue
    Purple(string = 'coloring?');       // Purple
    Cyan(string = 'coloring?');         // Cyan
    White(string = 'coloring?');        // White
    
    // Bold
    BBlack (string = 'coloring?');       // Black
    BRed(string = 'coloring?');         // Red
    BGreen(string = 'coloring?');       // Green
    BYellow(string = 'coloring?');      // Yellow
    BBlue(string = 'coloring?');        // Blue
    BPurple(string = 'coloring?');      // Purple
    BCyan(string = 'coloring?');        // Cyan
    BWhite(string = 'coloring?');       // White
    
    // Underline
    UBlack(string = 'coloring?');       // Black
    URed(string = 'coloring?');         // Red
    UGreen(string = 'coloring?');       // Green
    UYellow(string = 'coloring?');      // Yellow
    UBlue(string = 'coloring?');        // Blue
    UPurple(string = 'coloring?');      // Purple
    UCyan(string = 'coloring?');        // Cyan
    UWhite(string = 'coloring?');       // White
    
    // Background
    On_Black(string = 'coloring?');       // Black
    On_Red(string = 'coloring?');         // Red
    On_Green(string = 'coloring?');       // Green
    On_Yellow(string = 'coloring?');      // Yellow
    On_Blue(string = 'coloring?');        // Blue
    On_Purple(string = 'coloring?');      // Purple
    On_Cyan(string = 'coloring?');        // Cyan
    On_White(string = 'coloring?');       // White
    
    // High Intensity
    IBlack(string = 'coloring?');       // Black
    IRed(string = 'coloring?');         // Red
    IGreen(string = 'coloring?');       // Green
    IYellow(string = 'coloring?');      // Yellow
    IBlue(string = 'coloring?');        // Blue
    IPurple(string = 'coloring?');      // Purple
    ICyan(string = 'coloring?');        // Cyan
    IWhite(string = 'coloring?');       // White
    
    // Bold High Intensity
    BIBlack(string = 'coloring?');      // Black
    BIRed(string = 'coloring?');        // Red
    BIGreen(string = 'coloring?');      // Green
    BIYellow(string = 'coloring?');     // Yellow
    BIBlue(string = 'coloring?');       // Blue
    BIPurple(string = 'coloring?');     // Purple
    BICyan(string = 'coloring?');       // Cyan
    BIWhite(string = 'coloring?');      // White
    
    // High Intensity backgrounds
    On_IBlack(string = 'coloring?');   // Black
    On_IRed(string = 'coloring?');     // Red
    On_IGreen(string = 'coloring?');   // Green
    On_IYellow(string = 'coloring?');  // Yellow
    On_IBlue(string = 'coloring?');    // Blue
    On_IPurple(string = 'coloring?');  // Purple
    On_ICyan(string = 'coloring?');    // Cyan
    On_IWhite(string = 'coloring?');   // White

    // Intensity
    Reset(string = 'coloring?');
    Bright(string = 'coloring?');
    Dim(string = 'coloring?');
    Underscore(string = 'coloring?');
    Blink(string = 'coloring?');
    Reverse(string = 'coloring?');
    Hidden(string = 'coloring?');
    
    // Foreground
    FgBlack(string = 'coloring?');
    FgRed(string = 'coloring?');
    FgGreen(string = 'coloring?');
    FgYellow(string = 'coloring?');
    FgBlue(string = 'coloring?');
    FgMagenta(string = 'coloring?');
    FgCyan(string = 'coloring?');
    FgWhite(string = 'coloring?');
    
    // Gackground
    BgBlack(string = 'coloring?');
    BgRed(string = 'coloring?');
    BgGreen(string = 'coloring?');
    BgYellow(string = 'coloring?');
    BgBlue(string = 'coloring?');
    BgMagenta(string = 'coloring?');
    BgCyan(string = 'coloring?');
    BgWhite(string = 'coloring?');

    // Reset
    SetColor( string ='coloring!', R = 30, G = 2, B = 208);

    // Styling 
    Underline(string ='coloring!', R = 30, B = 208);
    Strikethrough(string ='coloring!', R = 30, B = 208);
    Bold(string ='coloring!', R = 30, B = 208);
    Italic(string ='coloring!', R = 30, B = 208);
    Highlight(string ='coloring!', R = 30, B = 208);

    //Hide
    Hide(string ='coloring!', R = 30, B = 208);

    // Blinking
    Blinker(string ='coloring!', R = 30, G = 2);
```

#### Author's Info
Website|NPM|Github|Gitlab|Blog|LinkedIn|Facebook|Twitter|Instagram|
--- | --- | --- | --- | --- | --- | --- |--- |--- |
[Website](https://www.ericsonsweah.com/dashboard)|[NPM](https://www.npmjs.com/org/mongodb-model)|[Github](https://github.com/ericsonweah)|[Gitlab](https://gitlab.com/ericsonweah)|[Blog](https://www.ericonsweah.dev)|[LinkedIn](https://www.linkedin.com/in/ericson-weah-b03600210)|[Facebook](https://www.facebook.com/Eric.S.Weah)|[Twitter](https://twitter.com/EricsonWeah1)|[Instagram](https://www.instagram.com/ericsonweah/)|

