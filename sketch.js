/* the 1st argument is the square size.
   and the 2nd argument is the key.
   Duplicate letters from the key are removed.
   Similarly, all spaces are removed.

   For 5x5 squares, i/j is combined and only i is permitted. All letters
   'j' in the key will be changed to 'i', and the letter 'j' will not appear
   in the code. One must infer it from content.

   See Wikipedia heterogram(literature) for key words with no repeats.
   Digits should be inserted after the first occurrences of the letters
    A (2), B (2) to J (0). This too hasn't been done yet.*/

function SetUpListeners(msg, ff1) {
    let getInput = document.getElementById('alphaKey'); //Input text field for alphabet listener
    getInput.addEventListener("change", ps6.userKeyChange); //a method in polybius.js in class Polybius

    var btn = document.getElementById("msgButton");  //Show Message Button Listener
    btn.addEventListener("click", function () { ff1.getText() }, false);

    var getMsg = document.getElementById("messagebox");  //Show Message Button Listener
    getMsg.addEventListener("change", function () { ff1.getText() }, false);

    let encBtn = document.getElementById('codeBtn');  //Encode button listener
    encBtn.addEventListener("click", function () { ff1.makeCode() }, false);

    let tp = document.getElementById('tpKey'); // Input text field for column header listener
    tp.addEventListener("change", tpKeyChange); //tp for transposition key

    let colBtn = document.getElementById('makeColsBtn');  //'Put Code Under KeyPhrase' Button Listener
    colBtn.addEventListener("click", columnateTheCode);

    //Now for the decode listeners
    let btn1 = document.getElementById("decode");  //start the decode program
    btn1.addEventListener("click", idecode);

    //the reset button will restart ADFGVX
    let btn2 = document.getElementById("resetBtn"); //call the ADFGVX function\
    btn2.addEventListener("click",ADFGVX);
    btn2.addEventListener("mouseover", hoverReset);
}

//Make an alphabet. If num = 6, meaning a 6x6 Polybius square, then we can do ADFGVX code, otherwise no.
let num = 6;
let userkey = document.getElementById('alphaKey').value;
if (num == 5 ^ num == 8) { document.getElementById('container').style.visibility = "hidden"; }
let ps6 = new Polybius(num, userkey); //Do not change the variable name 'ps6' It is used in routines ps6.s is the string version alphabet and ps6.a is the array square alphabet.

if (num == 6) { //additional ADFGVX coding only for when a 6x6 square is employed
    ADFGVX();
}

function ADFGVX() {  //only call this if num=6. i.e. a 6x6 polybius square
    //console.table(ps6.a);
    //createTable(this.a,['A','D','F','G','V','X'],['A','D','F','G','V','X'],'showHere');
    //Instantiate the fractionated form class as ff1
    let msg = document.getElementById('mesg').value; //fetch the default from the HTML screen.
    ff1 = new FractionalForm(ps6.a, msg);
    let _ = undefined;

    //Set up listeners for input boxes and buttons.
    SetUpListeners(msg, ff1);
    btn2 = document.getElementById("resetBtn");
    btn2.style.backgroundColor = "green";
}

function hoverReset(){
    btn2 = document.getElementById("resetBtn");
    btn2.style.backgroundColor = "yellow";
}


//Pack my box with five dozen liquor jugs
