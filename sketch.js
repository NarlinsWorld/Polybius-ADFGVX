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



let num = 6;
let userkey = document.getElementById('alphaKey').value;
if (num == 5 ^ num == 8) { document.getElementById('container').style.visibility = "hidden"; }
let ps6 = new Polybius(num, userkey); //Do not change the variable name 'ps6' It is used in routines ps6.s is the string version alphabet and ps6.a is the array square alphabet.
console.table(ps6.a);

if (num == 6) { //additional ADFGVX coding only for when a 6x6 square is employed
    SetUpListeners();
}
displayHTML_Table('data.json'); //example call t display json data as table.




    
   


//Pack my box with five dozen liquor jugs
