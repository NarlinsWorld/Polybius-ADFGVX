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

function SetUpListeners(msg,ff1) {
    let getInput = document.getElementById('alphaKey'); //Input text field for alphabet listener
    getInput.addEventListener("change", ps6.userKeyChange);

    var btn = document.getElementById("msgButton");  //Show Message Button Listener
    btn.addEventListener("click",function () {ff1.getText()},false);

    let encBtn = document.getElementById('codeBtn');  //Encode button listener
    encBtn.addEventListener("click", function () {ff1.makeCode()},false);

    let tp = document.getElementById('tpKey'); // Input text field for column header listener
    tp.addEventListener("change", tpKeyChange); //tp for transposition key

    let colBtn = document.getElementById('makeColsBtn');  //'Put Code Under KeyPhrase' Button Listener
    colBtn.addEventListener("click", columnateTheCode);
}

//Make an alphabet. In num = 6, meaning a 6x6 Polybius square, then we can do ADFGVX code, otherwise no.
let num = 6;
let userkey = document.getElementById('alphaKey').value;
if (num == 5 ^ num == 8) { document.getElementById('container').style.visibility = "hidden"; }
let ps6 = new Polybius(num, userkey); //Do not change the variable name 'ps6' It is used in routines ps6.s is the string version alphabet and ps6.a is the array square alphabet.
//console.table(ps6.a);

//Instantiate the fractionated form class as ff1
if (num == 6) { //additional ADFGVX coding only for when a 6x6 square is employed
    let msg = document.getElementById('mesg').value; //fetch the default from the HTML screen.
    ff1 = new FractionalForm(ps6.a,msg);

    //Set up listeners for input boxes and buttons.
    SetUpListeners(msg,ff1);
 
    //Get the fractioned form code arranged under a keyphrase
      
}
//displayHTML_Table('data.json'); //example call to display json data as table. 
//createTable(array) in HTML-tables.js will output nearly any array to id='showHere' if that id is defined in the HTML. If id='showHere' is the id for a <div> you can position and style it.


//Pack my box with five dozen liquor jugs
