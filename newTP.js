function gimme() {  //return one random letter from 'ADFGVX'
  let ax = ['A', 'D', 'F', 'G', 'V', 'X'];
  return ax[Math.floor(Math.random() * ax.length)]
}

/*function tranpose(arr) takes any 'rectangular' array
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

function codeUnderKeyPhrase(keyphrase, codestring) {
  let L = keyphrase.length.toString();
  let RGX = new RegExp(".{1," + L + "}", "g");
  let arr = [];
  arr = codestring.match(RGX) || [];
  let arr2 = [];
  for (let i = 0; i < arr.length; i++) {
    arr2.push(arr[i]);
  }
  // document.getElementById('showHere').innerHTML = '';
  // createTable(arr2);  //index.html has id='showHere'
  // console.log('rows=',arr2.length);
  // console.log('cols=',arr2[0].length);
  return arr2;
}

tpKeyChange = function () {//Lets the user change the keyPhrase
  let tp = document.getElementById('tpKey').value;
  let rgx = /\W|_/g   //and this line really does that
  let mystring = tp.toUpperCase(); //change all case to upper   
  let keyphrase = mystring.replace(rgx, ''); //removes everything matched in the rgx.
  //console.log('keyphrase=', keyphrase,' letter count=',keyphrase.length);

  document.getElementById('tpEcho').innerHTML = keyphrase;
  return keyphrase;
}

function columnateTheCode() {
  //if the keyphrase and if the codestring are good then call codeUnderKeyPhrase
  let keyphrase = tpKeyChange();
  if (ff1.codestring == undefined ^ ff1.codestring == '') { ff1.makeCode(); }
  let codestring = ff1.codestring;

  let arr2 = codeUnderKeyPhrase(keyphrase, codestring);

  //Add random characters to fill out the last row.
  //console.log('num of chars in last row is ',arr2[arr2.length-1].length)
  numofcharstoadd = keyphrase.length - arr2[arr2.length - 1].length;
  let s = arr2[arr2.length - 1];              //s is getting the short set of characters on the last row 
  for (let i = 0; i < numofcharstoadd; i++) {
    s = s + gimme();                        //s is being extended with dummy characters
  }
  arr2[arr2.length - 1] = s;                  // the last row is being replaced with the new string, s
  document.getElementById('showHere').innerHTML = '';
  //createTable(arr2);  //index.html has id='showHere'
  //Done filling out hte last row with random characters
  console.log("fractional form code but arranged under the keyPhrase")
  console.table(arr2);

  let arr3 = [];
  for (let i = 0; i < arr2.length; i++) {
    arr3[i] = arr2[i].split("");
    //console.log(arr3[i]);            //arr3 is a 2d table & each indexed element is a letter.
  }

  document.getElementById('showHere').innerHTML = '';
  //createTable(arr3);

  //create arr4 which will be the transposed array.
  let arr4 = transpose(arr3);
  //document.getElementById('showHere').innerHTML = '';
  //turn the 2d array back into strings but now transposed.
  let arr5 = [];
  for (let i = 0; i < arr4.length; i++) {
    arr5[i] = arr4[i].join("");
  }
  //createTable(arr5);
  console.log('Transposed for the first time -keyPhrase would go down left side as a row header')
  console.table(arr5); //exactly like arr4, except that each row is a string

  /*now switch around the rows to match the alphabetization of the keyphrase
  Sorting a string in JavaScript involves converting it into an array of characters, sorting the array using the sort() method, and then joining the sorted characters back into a string. This arranges the characters in ascending order based on their Unicode values. */
  console.log('keyphrase=', keyphrase)
  let alph = keyphrase.split("").sort().join(""); //alph is keyphrase but in alphabetic order
  let L1 = []; //put the indices of keyphase here in the order of alpha
  for (i in alph) {
    for (index in keyphrase) {
      if (alph[i] == keyphrase[index]) {
        L1.push(index);
      }
    }
  }
  let L2 = new Set(L1);
  L1 = Array.from(L2);
  console.log('L1=',L1)

  //Build array arr6 which is arr5 with the rows switch around.
  let arr6=[]
  for(i in L1){
    arr6[i] = arr5[L1[i]];
  }
  console.log('The rows are switched around according to L1')
  console.table(arr6);

  //now transpose arr6 again so that we have columns
  let arr7=[];
  for (let i = 0; i < arr6.length; i++) {
    arr7[i] = arr6[i].split("");
    //console.log(arr7[i]);            //arr7 is a 2d table & each indexed element is a letter.
  }
  for (let i = 0; i < arr7.length; i++) {
    arr6[i] = arr7[i].join("");
  }
  arr6 = transpose(arr6);
  //turn the 2d array back into strings but now untransposed.
  arr7 = [];
  for (let i = 0; i < arr6.length; i++) {
    arr7[i] = arr6[i].join("");
  }
  console.log('Transposed again so that the alphabetized keyPhrase would go along the top header')
  console.table(arr7);
  createTable(arr7);

  //now make one long string from arr7 and then break it up into 5 letters, a space, and 5 more letters as the final output.
  let sst = arr7.join('');
  let sfinal='';
  for(i=0; i<sst.length; i=i+5){
  sfinal=sfinal+sst.slice(i,i+5)+' ';
  }
  console.log('sfinal=',sfinal);
}