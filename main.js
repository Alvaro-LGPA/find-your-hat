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
    }

    print() {

        console.clear(); // clear the console for a clean start with no header
        let endGame = false; // Loop will run until game is win or loose

        while (endGame === false) {

            let newPosition = this._field[pointer.posV][pointer.posH]; // store array coordinates in a variable
            console.log(`newposition: ${newPosition}`);
            switch (newPosition) { // Methods to test whether the current location results in win (user is on the hat) or a loss (user is on a hole or out-of-bounds).
                case hat:
                    endGame = true;
                    console.log("You found your hat!!");
                    break;
                case hole:
                    endGame = true;
                    console.log("You fell through a hole!! GAME OVER");
                    break;
                case fieldCharacter:
                    this._field[pointer.posV][pointer.posH] = pathCharacter; //updates curson new possition with *
                    break;
                case undefined:
                    endGame = true;
                    console.log("You fell out of the field!! GAME OVER");
                default:
                    break;
            }

            for (let i = 0; i < this._field.length; i++) {
                console.log(this._field[i].join(""))
            };

            //A method to handle asking and accepting user input, and updating the current location.
            let cta;
            cta = prompt("Which way?(u,d,l,r)")

            switch (cta) {
                case "u":
                    pointer.posV--; // move up
                    console.log(`switch posV after: ${pointer.posV}`);
                    break;
                case "d":
                    pointer.posV++; // move down
                    console.log(`posV after: ${pointer.posV}`);
                    break;
                case "l":
                    pointer.posH--; // move left
                    console.log(`posH after: ${pointer.posH}`);
                    break;
                case "r":
                    pointer.posH++; // move right
                    console.log(`posH after: ${pointer.posH}`);
                    break;
                default:
                    break;
            }
            console.clear(); // refresh the console
        }

        //update position

        //A method to run the main game loop until the game is won or lost.

        //To facilitate this, we also stored a horizontal and vertical player location on the class instance and initialize them in the constructor.
    }






}


const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);

myField.print();
