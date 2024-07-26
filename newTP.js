function gimme(){  //return one random letter from 'ADFGVX'
    let ax=['A','D','F','G','V','X'];
    return ax[Math.floor(Math.random()*ax.length)]
}

function codeUnderKeyPhrase(keyphrase,codestring){
    let L = keyphrase.length.toString();
    let RGX= new RegExp(".{1,"+L+"}","g");
    let arr=[];
    arr = codestring.match(RGX) || [];
    let arr2 = [];
    for(let i=0; i<arr.length; i++){
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

  function columnateTheCode(){
    //if the keyphrase and if the codestring are good then call codeUnderKeyPhrase
    let keyphrase = tpKeyChange();
    if(ff1.codestring == undefined ^ ff1.codestring==''){ff1.makeCode();}
    let codestring = ff1.codestring;
    
    let arr2 = codeUnderKeyPhrase(keyphrase,codestring);
    
    //Add random characters to fill out the last row.
    //console.log('num of chars in last row is ',arr2[arr2.length-1].length)
    numofcharstoadd=keyphrase.length-arr2[arr2.length-1].length;
    let s=arr2[arr2.length-1];              //s is getting the short set of characters on the last row 
    for(let i=0; i<numofcharstoadd;  i++){
        s=s+gimme();                        //s is being extended with dummy characters
    }
    arr2[arr2.length-1]=s;                  // the last row is being replaced with the new string, s
    document.getElementById('showHere').innerHTML = '';
    //createTable(arr2);  //index.html has id='showHere'
    //Done filling out hte last row with random characters
    console.table(arr2);

    let arr3=[];
    for(let i=0; i<arr2.length; i++){
        arr3[i]=arr2[i].split("");
        //console.log(arr3[i]);            //arr3 is a 2d table & each indexed element is a letter.
    }

    document.getElementById('showHere').innerHTML = '';
    createTable(arr3);
}