
/* *********************************************************************************************************************
function to select and return 1 random item from a list. The list is currently 'ADFGVX' */
function gimme() {  
  let ax = ['A', 'D', 'F', 'G', 'V', 'X'];
  return ax[Math.floor(Math.random() * ax.length)]
}
/* ******************************************************************************************************************** */




/* **********************************************************************************************************************
function tranpose(arr) takes any 'rectangular' array
and transposes it. Starting with a m(row)
x n(col) array, it returns a n(row) x m(col) array.*/

function transpose(arr) {
  let m = arr.length; //number of rows
  let n = arr[0].length; //number of cols
  let tr = new Array(n); //create a transpose receiver
  for (let i = 0; i < n; i++) {
    tr[i] = new Array(m);
  } //finished creating the receiver
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      tr[i][j] = arr[j][i];
    }
  }
  return tr;
}
/* ************************************************************************************************************************/




/* ************************************************************************************************************************************
On Input, the codestring is one long string of uppercase letters using only 'ADFGVX'.
  On Input, the keyphase is a 'string' of uppercase letters with no spaces - usually a memorable phrase
  OUTPUT=> we return a 2d array which is the codestring letters as an array such that there is a column of letters under each keyphase letter.
  Leftover empty spaces are filled with random code letters and will there decode to non-sense.
*/
function codeUnderKeyPhrase(keyphrase, codestring) {
  let L = keyphrase.length.toString();
  let RGX = new RegExp(".{1," + L + "}", "g"); //from codestring, select every letter for the number of letters in keyphrase,repeat
  let arr = [];
  arr = codestring.match(RGX) || []; //arr is a 1d array of codestring letters where each item has n letters. n is the length of keyphrase
  let arr2 = [];
  for (let i = 0; i < arr.length; i++) {
    arr2.push(arr[i]); //we are pushing strings of letters into arr2
  }
  // document.getElementById('showHere').innerHTML = '';
  // createTable(arr2);  //index.html has id='showHere'
  // console.log('rows=',arr2.length);
  // console.log('cols=',arr2[0].length);

  //Add random code characters to fill out the last row.
  //console.log('num of chars in last row is ',arr2[arr2.length-1].length)
  numofcharstoadd = keyphrase.length - arr2[arr2.length - 1].length;
  let s = arr2[arr2.length - 1];              //s is getting the short set of characters on the last row 
  for (let i = 0; i < numofcharstoadd; i++) {
    s = s + gimme();                        //s is being extended with dummy characters
  }
  arr2[arr2.length - 1] = s;                  // the last row is being replaced with the new string, s
  //document.getElementById('showHere').innerHTML = '';
  //createTable(arr2);  //index.html has id='showHere'
  //Done filling out hte last row with random characters
  
  return arr2;
} /* ********************************************************************************************************************************** */



/* ************************************************************************************************************************************
If the keyphrase is changed, the listener comes here and the new keyphrase is by removing all but letters and digits and converting to uppercase.
*/
tpKeyChange = function () {                           //Allows the user change the keyPhrase
  let tp = document.getElementById('tpKey').value;
  let rgx = /\W|_/g                                   //and this line really does that
  let mystring = tp.toUpperCase();                    //change all case to upper   
  let keyphrase = mystring.replace(rgx, '');          //removes everything matched in the rgx.
  //console.log('keyphrase=', keyphrase,' letter count=',keyphrase.length);

  document.getElementById('tpEcho').innerHTML = keyphrase;
  return keyphrase;
} /* ********************************************************************************************************************************** */





/* **********************************************************************************************************************************
Input is a keyphrase in uppercase letters and digits only 
Alphabetize it - remembers that digits sort before uppercase letters
Return a 1d array of digits which are the indices of each letter in the plaintext keyphrase
returned in the alphabetic order.
Example keyphrase = THEOLD47BROWNFOX
Alphabetized = 47BDEFHLNOOORTWX
List Returned = ['6', '7', '8', '5', '2', '13', '1', '4', '12', '3', '10', '14', '9', '0', '11', '15']*/
alphaAnagram = function (keyphrase) {
  let alph = keyphrase.split("").sort().join(""); //alph is keyphrase but in alphabetic order
  console.log('alphabetic phrase =',alph);
  let L1 = []; //put the indices of keyphrase here in the order of alpha
  for (i in alph) {
    for (index in keyphrase) {
      if (alph[i] == keyphrase[index]) {
        L1.push(index);
      }
    }
  }
  let L2 = new Set(L1);
  L1 = Array.from(L2);
  return L1;
}
/* ********************************************************************************************************************************** */





/************************************************************************************************************************
Input is an 1d array where each element is a string, usually all strings would be of the same length.
Output is a 2d array that resembles the 1d array.
Example
(index) (Value)          <= THE INPUT 1D ARRAY OF STRINGS
0        'FVDDGDV'
1        'VVDAAAX'
2        'AVAGVDA'
3        'VDAFAAD'

"The Output 2d Array"
(4) [Array(7), Array(7), Array(7), Array(7)]
0: Array(7)
1: Array(7)
2: Array(7)
3: Array(7)
*/

function make2d(arrIn) {
  let arrOut = [];
  for (let i = 0; i < arrIn.length; i++) {
    //console.log(arr2[i].split(""));
    arrOut.push(arrIn[i].split(""));
    //console.log(arrOut[i]);            //arrOut is a 2d table & each indexed element is a letter.
  }
  return arrOut;
}
/*********************************************************************************************************************************** */





/* *********************************************************************************************************************************
Take in a 2d array and return the rows as strings. */
function make1d(arrIn){
  let arrOut = [];
    for (let i = 0; i < arrIn.length; i++) {
      arrOut[i] = arrIn[i].join("");
    }
    return arrOut;
  }
  /* ********************************************************************************************************************************/






function columnateTheCode() {
  //if the keyphrase and if the codestring are good then call codeUnderKeyPhrase
  let keyphrase = tpKeyChange();
  if (ff1.codestring == undefined ^ ff1.codestring == '') { ff1.makeCode(); }
  let codestring = ff1.codestring;

  let arr2 = codeUnderKeyPhrase(keyphrase, codestring); //write the coded message in columns under the keyphrase
  //console.log("arr2 is fractional form code but arranged in columns under the keyPhrase")
  //console.table(arr2);
 /* ***************************************** */

 /********************************************
  * Take the columnated strings with keyphrase along the top and
  * 1) transpose them so that the keyphrase is down the left side and
  * 2) turn them back into strings and
  * 3) reorder them according to the alphabetized keyphrase and
  */

 let arr3 = make2d(arr2);     //arr3 is a 2d table & each indexed element is a letter.

  //create arr4 which will be the transposed array.
  let arr4 = transpose(arr3);
 
  //turn the 2d array back into strings but now transposed.
 let arr5=make1d(arr4);

  // console.log('Transposed for the first time -keyPhrase would go down left side as a row header')
  // console.table(arr5); //exactly like arr4, except that each row is a string

  /*now switch around the rows to match the alphabetization of the keyphrase
  Sorting a string in JavaScript involves converting it into an array of characters, sorting the array using the sort() method, and then joining the sorted characters back into a string. This arranges the characters in ascending order based on their Unicode values. */
  let L1 = alphaAnagram(keyphrase);
  console.log('keyphrase=', keyphrase)
  console.log('L1=', L1)

  //Build array arr6 which is arr5 with the rows switch around.
  let arr6 = []
  for (i in L1) {
    arr6[i] = arr5[L1[i]];
  }
  // console.log('The rows are switched around according to L1')
  // console.table(arr6);
  

  //now transpose arr6 again so that we have columns
  let arr7 = make2d(arr6);  //arr7 is a 2d table & each indexed element is a letter. 
  arr6 = transpose(arr6);

  //turn the 2d array back into strings but now untransposed.
  arr7 = make1d(arr6);
  
  //console.log('arr7, Transposed again so that the alphabetized keyPhrase would go along the top header')
  //console.table(arr7);
  // document.getElementById('showHere').innerHTML = '';
  // createTable(arr7);

  //now make one long string from arr7 and then break it up into 5 letters, a space, and 5 more letters as the final console output.
  let sst = arr7.join('');
  // tfinal = '';
  // for(i=0; i<sst.length; i++){
  //   tfinal = tfinal + sst.slice(i, i + 5) + ' ';
  // }
  console.log(sst,sst.length);

  let sfinal = '';
  let cnt=0;
  for (i = 0; i < sst.length; i = i + 5) {
    sfinal = sfinal + sst.slice(i, i + 5) + ' ';
    cnt=cnt+1;
    if(cnt%4==0){sfinal=sfinal+' '}
  }


  //also make a string for HTML output
 
  console.log('sfinal=', sfinal);
  //document.getElementById('showHere').innerHTML = '';
  
  document.getElementById('code').innerHTML = 'Transmit This code: '+ sfinal;
}