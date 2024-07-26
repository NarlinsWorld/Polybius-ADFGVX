tpKeyChange = function () {//pick the 1st 20 unique letters from the phrase in the order so given by them.
  let tp = document.getElementById('tpKey').value;
  let rgx = /\W|_/g   //and this line really does that
  let mystring = tp.toUpperCase(); //change all case to upper   
  let nstr = mystring.replace(rgx, ''); //removes everything matched in the rgx.
  console.log('nstr=', nstr);
  //let charArray = nstr.split("");
  // let uniqueChars = [...new Set(charArray)];
  // //console.log('The unique characters in key=',mystr,' are',uniqueChars.join(""))
  // nstr = uniqueChars.join("");
  // nstr = truncateString(nstr, 20);
  document.getElementById('tpEcho').innerHTML = nstr;
}


//not yet called (22 july 2024)
//create letter columns that go with nstr
//the intent is to make an array named cols[][]
// row zero is the transposition phrase
// rows 1, 2, and 3 are the columns below that as seen on screen in HTML
createCols = function (nstr, codestr) {
  let cols = [[]];
  for (let i = 0; i < 20; i++) {
    cols[i] = [codestr[i], 0];
  }

  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 4; j++) {
      if (j == 0) {
        cols[i][j] = nstr[i];
      } else {
        cols[i][j] = codestr[i + (j - 1) * 20];
      }
    }
  }
  return cols;
}; //end function

columnCode = function () {  //executed when 'arrange into columuns' button is clicked
  let codetext = makeCode();
  let nstr = document.getElementById('tpEcho').innerHTML;
  if (nstr.length == 0) { tpKeyChange(); }
  let s = '';
  for (let i = 0; i < nstr.length; i++) {
    if (i < 10) {
      s = 'he' + '0' + i.toString();
    } else {
      s = 'he' + i.toString();
    }
    document.getElementById(s).innerHTML = nstr[i];
  }

  s = '';
  console.log('len=', codetext.length)
  for (let i = 0; i < codetext.length; i++) {
    if (i < 10) {
      s = 'h' + '0' + i.toString();
    } else {
      s = 'h' + i.toString();
    }
    //console.log(s,i, codetext[i]);
    document.getElementById(s).innerHTML = codetext[i];
  } //end for
  let col = document.getElementsByName('mid');
  for (let i = 0; i < col.length; i++) {
    col[i].style.width = '30px';
  }
}  //end function columnCode