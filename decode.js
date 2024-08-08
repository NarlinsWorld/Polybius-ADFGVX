function idecode() {
    /* Decode a message.
    We need a message to decode. */
    //let MSG = "DDVVV AFVVV VVXVVA AVVAA AAGFF G";
    // let MSG = "AXVVAVGXDAAAVAVDDXXVVGDXDVGX"
    // //MSG =    "AXVVAVGXDAAAVAVDDDXVVGDFDVGG"
    // console.log(MSG);

    let rawMSG = document.getElementById('uncode').value;
    console.log('raw message: ', rawMSG);

    /*We need a keyword for the alphabet*/
    let userKey = ps6.ky;
    console.log('userKey=', userKey);

    //     /* We need a keyphrase for the columns */
    let keyphrase = document.getElementById('tpKey').value;
    console.log('keyphrase = ', keyphrase);

    //     /* Step 1: Remove the spaces from the message */
    let workingMSG = rawMSG.replace(/\s/g, "");
    console.log(workingMSG);

    //     /* Step 2: Break workingMSG in substrings that are the length of the keyphrase*/
    let arr2 = codeUnderKeyPhrase(keyphrase, workingMSG);

    //     /* Step 3: Transpose the matrix made in step 2 */
    let arr3 = transpose(arr2);

    //     /* Step 4: Make each row back into a string */
    let arr4 = make1d(arr3);
    //     console.table(arr4);

    //     /* Step 5: Alphabetize the key phrase, then arrange the rows in the order of L1 */
    let alph = keyphrase.split("").sort().join(""); //alph is keyphrase but in alphabetic order
    L1 = alphaAnagram(keyphrase);
    console.log(keyphrase);
    console.log(alph);
    console.log(L1);
    let arr5 = [];
    for (let i = 0; i < L1.length; i++) {
        arr5[L1[i]] = arr4[i];
    }


    //     /* Step 6: Transpose the matrix again, After this, it  will be ready to decode with a 6x6 polybius square*/
    let arr6 = make1d(transpose(arr5));
    console.log('this is arr6')
    console.table(arr6)

    //     /* Step 7: Make aar6 into a single long string */
    let s = "";
    for (let i = 0; i < arr6.length; i++) {
        s = s + arr6[i];
    }
    console.log(s);

    //     /* Step 8: Get the proper Polybius alphabet for decoding */
    //     let ps6 = new Polybius(6, userKey);
    //     //console.log(ps6.a);




    //     /* Step 9: For each pair of letters in s, substitute the Polybius alphabet letter */

        //changes all letters in s to be digits 0 to 5
        for (let i = 0; i < s.length; i++) {
            s = s.replace(/A/g, "0");
            s = s.replace(/D/g, "1");
            s = s.replace(/F/g, "2");
            s = s.replace(/G/g, "3");
            s = s.replace(/V/g, "4");
            s = s.replace(/X/g, "5");
        }
        console.log(s)

         /* Step 10: Decode s using the polybius alphabet */
        let msg = [];
        for (let i = 0; i < s.length - 1; i = i + 2) {
            msg = msg + ps6.a[s[i]][s[i + 1]]
        }

        console.log(msg);
        document.getElementById('decodedMSG').innerHTML = msg
}