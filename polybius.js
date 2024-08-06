class Polybius {
  constructor(squareSize, ky) {
    /* a squareSize example is '5', meaning 5x5. We only allow square sizes of 5, 6, and 8.  A key(ky) can be any sequence containing only the symbols that will be used in the square if it were constructed withouta key.  The key will be used to fill the square first (in rows order) and then the remaining letters will be put in in alphabetic order. Numbers are ASCII 48 to 47. Capital Letters are ASCII 65 to 90. lower case letters are 97 to 122. Syntax is String.fromCharCode(number) */

    this.n = squareSize;
    ky = this.removeKeyDuplicates(ky);
    this.ky = ky

    this.a = [];
    this.s = ''; //eventually (after addkey) it is the alphabet as a string

    if (this.n == 5) {
      this.g5();
    }
    if (this.n == 6) {
      this.g6();
    }
    if (this.n == 8) {
      this.g8();
    }
    this.addkey(); // your key phrase less spaces and duplicate letters is added to the polybius square
  } // end constructor

  userKeyChange() {
    let userkey = document.getElementById('alphaKey').value;
    //console.log(userkey.toUpperCase())
    //ps6.ky=userkey.toUpperCase();
    userkey = ps6.removeKeyDuplicates(userkey);
    ps6.ky = userkey;
    document.getElementById('echoKey').innerHTML = 'Unique key: ' + ps6.ky;
    if (num == 6) {
      ps6.g6();
    }
    ps6.addkey();
  }

  removeKeyDuplicates(mystr) {
    //let tempstr = mystr.replace(/\s/g, ''); //remove all spaces
    let tempstr = mystr.replace(/\W|_/g, "");
    if (this.n == 6) { tempstr = tempstr.toUpperCase(); }
    if (this.n == 5) {
      tempstr = tempstr.toLowerCase();
      tempstr = tempstr.replace(/i/g, 'i'); //replace any i with i
      tempstr = tempstr.replace(/j/g, 'i'); //replace any j with i
    }

    let charArray = tempstr.split("");
    let uniqueChars = [...new Set(charArray)];
    //console.log('The unique characters in key=', mystr, ' are', uniqueChars.join(""))
    return uniqueChars.join("");
  }

  g5() {// there shall be no 'j'
    //the key word is conditioned already to have no j
    this.a = [
      ["a", "b", "c", "d", "e"],
      ["f", "g", "h", "i", "k"],
      ["l", "m", "n", "o", "p"],
      ["q", "r", "s", "t", "u"],
      ["v", "w", "x", "y", "z"],
    ];

    //this.display56(this.n);
  } //end method g5

  g6() {
    this.a = [
      ["0", "1", "2", "3", "4", "5"],
      ["6", "7", "8", "9", "A", "B"],
      ["C", "D", "E", "F", "G", "H"],
      ["I", "J", "K", "L", "M", "N"],
      ["O", "P", "Q", "R", "S", "T"],
      ["U", "V", "W", "X", "Y", "Z"],
    ];
    //this.display56(this.n);
  } //end method g6

  g8() {
    this.a = [
      ["0", "1", "2", "3", "4", "5", "6", "7"],
      ["8", "9", "A", "B", "C", "D", "E", "F"],
      ["G", "H", "I", "J", "K", "L", "M", "N"],
      ["O", "P", "Q", "R", "S", "T", "U", "V"],
      ["W", "X", "Y", "Z", "a", "b", "c", "d"],
      ["e", "f", "g", "h", "i", "j", "k", "l"],
      ["m", "n", "o", "p", "q", "r", "s", "t"],
      ["u", "v", "w", "x", "y", "z", " ", " "],
    ];
    //this.display8(this.n);
  }

  display5(n) {
    let noshow = document.getElementById("table8");
    noshow.style.display = "none"; //for this use, do not show!
    var _ = undefined; //can be used to skip an optional parameter during the call
    createTable(this.a,['A','D','F','G','X'],['A','D','F','G','X'],'table6');
    // for (let j = 0; j < n; j++) {
    //   for (let i = 0; i < n; i++) {
    //     let s = "r" + (i + 1).toString() + (j + 1).toString();
    //     //console.log(s);
    //     document.getElementById(s).innerHTML = this.a[i][j];
    //   } //end for loop
    // } //end for loop
  } //end method display56

  display6(n) {
    let noshow = document.getElementById("table8");
    noshow.style.display = "none"; //for this use, do not show!
    var _ = undefined; //can be used to skip an optional parameter during the call
    createTable(this.a,['A','D','F','G','V','X'],['A','D','F','G','V','X'],'table6');
   
  } //end method display56


  display8(n) {
    var _ = undefined; //can be used to skip an optional parameter during the call
    createTable(this.a,['','','','','','','',''],_,'table6');

    // for (let j = 0; j < n; j++) {
    //   for (let i = 0; i < n; i++) {
    //     let s = "s" + (i + 1).toString() + (j + 1).toString();
    //     document.getElementById(s).innerHTML = this.a[i][j];
    //   } //end for loop
    // } //end for loop
  } //end display8

  //copy 2d array named 'a' into 1d array named arr
  copya2d_to_arr1d() {
    let k = 0;
    let n = this.n;
    let arr = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        arr[k] = this.a[i][j];
        k += 1;
      } //end loop on j
    } //end loop on i
    return arr;
  } //end this  method.

  copyarr1d_to_a2d(arr) {
    let n = this.n;  //n is the square size
    let arrlen = arr.length;
    this.a = [];
    let temp = [];
    let k = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        temp[j] = arr[k];
        k = k + 1;
      } //end loop on j
      this.a.push(temp);
      temp = [];
    } //end loop on i
  } //end method

  isin(characters, string) {
    let pattern = new RegExp(characters);
    return pattern.test(string); //true or false
  }

  insertAtIndex(mystr, substring, index) {
    return mystr.slice(0, index) + substring + mystr.slice(index);
  }

  addkey() {
    /* how it works:
    arr has the alphabet for 5,6, or 8 size square
    ky has the conditioned key for 5, 6, or 8 size square
    keylen will be the key length
    1. Make the 2d alphabet, a,  into a 1d array named arr
    2. Create a new 1d array named ar1 with the keyword at the beginning
    3. Go through the alphabet (arr) and if an alphabet letter is NOT in the key, then add it to the end of ar1.
    4. Create a string from ar1. Call is s
    5. Delete digits not found in the key
    6. The letter A should be followed by character '1' except when '1' is part of the key.  Etc for B->2, C->3 to J->0
    7. Turn string s back into the array ar1
    8. Copy ar1 to array a for the purpose of html display
    */
    let n = this.n;  //n is the square size, 5,6, or 8
    let ky = this.ky; //the conditioned key string of characters
    let keylen = ky.length;
    let arr = this.copya2d_to_arr1d(); //step 1

    let ar1 = []; //create a new 1d alphabet  step 2
    for (let i = 0; i < keylen; i++) {
      ar1[i] = ky[i]; //copy ky into array ar1;
    }
    let p = keylen;
    for (let i = 0; i < arr.length; i++) {  //step 3
      //fill in ar1 with missing letters
      if (!this.isin(arr[i], ky)) {
        ar1[p] = arr[i];
        p = p + 1;
      } //end if
    } //end for


    let s = ar1.toString();      //step 4. Create a string from ar1           
    s = s.replace(/,/g, ''); //gets rid of the commas

    //step 5 Delete digits not found in the key
    for (let j = 0; j < 10; j++) {
      let pattern = RegExp(j);
      if (!pattern.test(ky)) {   //if digit j is NOT in ky then do i loop
        s = s.replace(pattern, '');
      } //end if
    } //end loop on j //now the digits not in key are gone

    //step 6
    //The letter A should be followed by character '1' except when '1' is part of the key.  Etc for B->2, C->3 to J->0
    //console.log('s before step 6', s);
    if (this.n != 5) {
      //console.log('size = ', this.n);
      if (!/1/.test(ky)) { s = this.insertAtIndex(s, '1', s.indexOf('A') + 1); }
      if (!/2/.test(ky)) { s = this.insertAtIndex(s, '2', s.indexOf('B') + 1); }
      if (!/3/.test(ky)) { s = this.insertAtIndex(s, '3', s.indexOf('C') + 1); }
      if (!/4/.test(ky)) { s = this.insertAtIndex(s, '4', s.indexOf('D') + 1); }
      if (!/5/.test(ky)) { s = this.insertAtIndex(s, '5', s.indexOf('E') + 1); }
      if (!/6/.test(ky)) { s = this.insertAtIndex(s, '6', s.indexOf('F') + 1); }
      if (!/7/.test(ky)) { s = this.insertAtIndex(s, '7', s.indexOf('G') + 1); }
      if (!/8/.test(ky)) { s = this.insertAtIndex(s, '8', s.indexOf('H') + 1); }
      if (!/9/.test(ky)) { s = this.insertAtIndex(s, '9', s.indexOf('I') + 1); }
      if (!/0/.test(ky)) { s = this.insertAtIndex(s, '0', s.indexOf('J') + 1); }
    }
    //console.log('s after step 6', s);
    this.s = s; //make it available from the class as polybius.s
    ar1 = s.split("");   //step 7  Turn s back into an array.
    //console.log(ar1)

    this.copyarr1d_to_a2d(ar1);   //step 8 Get array a ready for HTML display
    //console.log(this.a)
    if (n == 5) {
      this.display5(5);
    }
    if (n == 6) {
      this.display6(6);
    }
    if (n == 8) {
      this.display8(8);
    }
  
  } //end addkey method
} // end class
