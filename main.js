const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const pointer = {
    posV: 0,
    posH: 0
}
class Field {
    constructor(field) {
        this._field = field;
        this._endGame = false;
    }
    clearConsole() {
        console.clear(); // clear the console for a clean start with no header
    }

    printField() { // prints the field
        for (let i = 0; i < this._field.length; i++) {
            console.log(this._field[i].join(""))
        };
    }




    startGame() { //A method to handle asking and accepting user input, and updating the current location.
        let cta;
        cta = prompt("Which way?(u,d,l,r)")

        switch (cta) {
            case "u":
                pointer.posV--; // move up
                break;
            case "d":
                pointer.posV++; // move down
                break;
            case "l":
                pointer.posH--; // move left
                break;
            case "r":
                pointer.posH++; // move right
                break;
            default:
                break;
        }
        

    };

    evaluate() { // Methods to test whether the current location results in win (user is on the hat) or a loss (user is on a hole or out-of-bounds).
        try {// going out of the field on the vertical axis throws and error. This try...catch statement handles it.
            let newPosition = this._field[pointer.posV][pointer.posH]; // store array coordinates in a variable
            console.log(`newPosition: ${newPosition}`);
            switch (newPosition) {
                case hat:
                    this._endGame = true;
                    prompt("You found your hat!!");
                    break;
                case hole:
                    this._endGame = true;
                    prompt("You fell through a hole!! GAME OVER");
                    break;
                case fieldCharacter:
                    this._field[pointer.posV][pointer.posH] = pathCharacter; //updates curson new possition with *
                    break;
                case undefined:
                    this._endGame = true;
                    prompt("You fell out of the field!! GAME OVER");
                    break;
                case pathCharacter:
                    this._endGame = true;
                    prompt("You got lost!! GAME OVER")
                default:
                    break;
            }
        } catch (e) {
           this._endGame = true;
           prompt("You fell out of the field!! Error GAME OVER");
            
        }
        
    };

    runGame() {
        // Loop will run until game is win or loose
        while (this._endGame === false) {
            this.clearConsole();
            this.printField();
            this.startGame();
            this.evaluate();      
        }
        
    }

}


const myField = new Field([
    ['*', '░', '░'],
    ['░', 'O', '░'],
    ['░', '^', '░']
]);

myField.runGame();