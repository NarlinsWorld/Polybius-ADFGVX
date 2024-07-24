function truncateString(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    }
    const regex = new RegExp(`^.{0,${maxLength}}`);
    const truncated = str.match(regex)[0];
    return truncated;
  }

getText = function () {
    let textarea = document.getElementById('mesg');
    //rgx = /[^A-Z^\d]/g //this matches everything except capital letters and digits
    rgx = /\W|_/g   //and this line really does that
    let mystring = textarea.value.toUpperCase(); //change all case to upper   
    let nstr = mystring.replace(rgx, ''); //removes everything matched in the rgx.
    nstr = truncateString(nstr,30);
    document.getElementById('aspot').innerHTML = nstr;
    clearFracTable();
}

ADFGVX = function(h,k){
    if(h==0){p1='A'}
    if(h==1){p1='D'}
    if(h==2){p1='F'}
    if(h==3){p1='G'}
    if(h==4){p1='V'}
    if(h==5){p1='X'}
    if(k==0){p2='A'}
    if(k==1){p2='D'}
    if(k==2){p2='F'}
    if(k==3){p2='G'}
    if(k==4){p2='V'}
    if(k==5){p2='X'}
    return [p1,p2]
}

encode = function(letter){  // returns a matched pair from the letters ADFGVX using alphabet ps6.a
    for(let h=0; h<6; h++){
        for(let k=0; k<6; k++){
            if(ps6.a[h][k] == letter){
                let pairmatch = ADFGVX(h,k);
                return pairmatch;
            }
        }
    }
}

makeCode = function () {
    let plaintext = document.getElementById('aspot').innerHTML;
    if(plaintext==''){
        getText();
        plaintext = document.getElementById('aspot').innerHTML;
    }
    // console.log('plaintext=',plaintext);
    let codestring=''
    for(let i=0; i<plaintext.length; i++){
        codepair=encode(plaintext[i]) //codepair is a 2 letter object - not an array
        let strpair = codepair[0].toString()+codepair[1].toString();
        codestring = codestring+strpair;
    }
    console.log(codestring);
    displayfractioned(codestring);
    return codestring;
}

clearFracTable = function(){
    let s='';
    
    for(let i=0; i<30; i++){
        if(i<10){s='a0'+i.toString();
        } else{s='a'+i.toString();}
        document.getElementById(s).innerHTML = '';
    }
    for(let i=0; i<30; i++){    
        if(i<10){s='b0'+i.toString();
        } else{s='b'+i.toString();}
            //console.log(s);
            document.getElementById(s).innerHTML = '';
    } 
}

//put codestring into a fractionated html table
displayfractioned = function(codestring){
    clearFracTable();
    let s='';
    let plaintext = document.getElementById('aspot').innerHTML;
    for(let i=0; i<plaintext.length; i++){
        if(i<10){s='a0'+i.toString();
        } else{s='a'+i.toString();}
        document.getElementById(s).innerHTML = plaintext[i];
    }
    for(let i=0; i<plaintext.length; i++){    
        if(i<10){s='b0'+i.toString();
        } else{s='b'+i.toString();}
            //console.log(s);
            document.getElementById(s).innerHTML = codestring[2*i]+codestring[2*i+1];
        
    }
}

userKeyChange = function(){
     let userkey = document.getElementById('alphaKey').value;
     //console.log(userkey.toUpperCase())
     //ps6.ky=userkey.toUpperCase();
     userkey = ps6.removeKeyDuplicates(userkey);
     ps6.ky=userkey;
     document.getElementById('echoKey').innerHTML = 'Unique key: '+ps6.ky;
     if (num == 6) {
        ps6.g6();
      }
     ps6.addkey();
}



function SetUpListeners() {
    var btn = document.getElementById("msgButton");  //Show Message Button Listener
    btn.addEventListener("click", getText);

    let encBtn = document.getElementById('codeBtn');  //Encode button listener
    encBtn.addEventListener("click", makeCode);

    let getInput = document.getElementById('alphaKey'); //Input text field for alphabet listener
    getInput.addEventListener("change",userKeyChange);

    let tp = document.getElementById('tpKey'); // Input text field for column header listener
    tp.addEventListener("change",tpKeyChange); //tp for transposition key

    let colBtn = document.getElementById('makeColsBtn');  //Arrange into Columns Button Listener
    colBtn.addEventListener("click", columnCode);
    
    
}