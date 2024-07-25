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
    document.getElementById('showHere').innerHTML = '';
    createTable(arr2);  //index.html has id='showHere'
    console.log('rows=',arr2.length);
    console.log('cols=',arr2[0].length);
    return arr2;
}

tpKeyChange = function () {//Lets the user change the keyPhrase
    let tp = document.getElementById('tpKey').value;
    let rgx = /\W|_/g   //and this line really does that
    let mystring = tp.toUpperCase(); //change all case to upper   
    let keyphrase = mystring.replace(rgx, ''); //removes everything matched in the rgx.
    console.log('keyphrase=', keyphrase,' letter count=',keyphrase.length);
    
    document.getElementById('tpEcho').innerHTML = keyphrase;
    return keyphrase;
  }

  function columnateTheCode(){
    //if the keyphrase and if the codestring are good then call codeUnderKeyPhrase
    let keyphrase = tpKeyChange();
    let codestring = ff1.codestring;
    let arr2 = codeUnderKeyPhrase(keyphrase,codestring);

  }