var height = 6; //number of guesses
var width = 5; //length of word

var row = 0;
var col = 0;

var gameOver = false;
var word = "HEART";

window.onload = function(){
    initialize();
}

function initialize(){

    //create game board
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    //listen for key press
    document.addEventListener("keyup", (e) => {
        if (gameOver) return;

        //alert(e.code);
        if("KeyA" <= e.code && e.code <= "KeyZ"){
            if (col < width){
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                if (currTile.innerText == "") {
                    currTile.innerText = e.code[3];
                    col += 1;
                }
            }
        }
        else if (e.code == "Backspace") {
            if (0 < col && col <= width) {
                col -=1;
            }
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            currTile.innerText = "";

        }

        else if (e.code == "Enter"){
            update();
            row += 1; //start new row
            col = 0; //start at 0 new row
        }

        if (!gameOver && row == height) {
            game0ver =true;
            document.getElementById("answer").innerText = word;
        }

    })
}

function update() {
    let correct = 0;
    let letterCount = {}; //KENNY --> K:1 E:1 N:2 Y:1
    for(let i =0; i < word.length; i++){
        letter = word[i];
        if (letterCount[letter]) {
            letterCount[letter] += 1;
        }
        else {
            letterCount[letter] = 1;
        }
    }


    //first iteration, check all correct position?
    for (let c = 0; c < width; c++){
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        //is it in correct position?
        if (word[c] == letter){
            currTile.classList.add("correct");
            correct += 1;
            letterCount[letter] -=1;
        }
        else if (word.includes(letter)){
            currTile.classList.add("present");
        }
        else {
            currTile.classList.add("absent");
        }

        if (correct == width){
            gameOver = true;
        }
    }

    for (let c = 0; c < width; c++){
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        if (!currTile.classList.contains("correct")){
       //Is it in the word?
            if (word.includes(letter) && letterCount[letter] > 0){
                currTile.classList.add("present");
                letterCount[letter] -= 1;
            }
            //not in the word
            else {
                currTile.classList.add("absent");
            }
        
        }
    }





}