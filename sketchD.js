/* Decode a message.
We need a message to decode. */
let MSG ="VVAGV VDAGF XFAFD AVVVX AVDAV VVVAD AVDDA VVAAD VAFFG GAXDX AFVDV VAAVV AFFVV AAGXV AADAA GGDDD VDDGA VAGAX GAFAD VGDDX XDFVX AAAGA VVDAV AAAGA DAADA VDGAV DDFAV ADDXV GXGFX VVAAA XVVAD VVDVA VVVFD VXVAV VAAFF VGAAG XFFXV AAVDD AVVDV XVDAA VVGVF GFFVX FAVVA AAVVD AXXAD VGAVV AAAVD FVXFG GFVDA AADAF VAXAA GADFA AGVXD GGVFA XAFVA VXAVX GADVA GAGGF XAXFV AVXAG VXAAA GAVDG VAVDV DAAGV AVDVF VDAXV DGGDA ADXXV GVDAA FADVV VVXAX FAFXV DVFVX DDVFV FAFVA AFXXF VXAAG FAGVX VAAFA VXAFA VAVXX AVADV GGFDV VVDXD VVFDA FVFVA XXXFA VVVVF AXFDV AVGAV XXAFV VVGAD VAXVF DGVVF FXFDV FDXVA AVAVA VAAVV DVDAA AFAVV AXDXV VAAVV GVDAD FVVVA XXXFV VDFDV AVVAV AVDAF VFDAF FVAVD AGVXD FDAGA GAFXV DVVVG ADVAD VDFAG XGVGG ADXAF DGVFD DGAVA ADAGD AGFAF XFFFG G"
console.log(MSG);

/*We need an keyword for the alphabet*/
let userKey = 'ABERDEEN';

/* We need a keyphrase for the columns */
let keyphrase = 'THEOLDBROWNFOX'

/* Step 1: Remove the spaces from the message */
let workingMSG = MSG.replace(/\s/g,"");

/* Step 2: Break workingMSG in substrings that are the length of the keyphrase*/
let arr2 = codeUnderKeyPhrase(keyphrase, workingMSG);

/* Step 3: Transpose the matrix made in step 2 */
let arr3 = transpose(arr2);

/* Step 4: Make each row back into a string */
let arr4 = make1d(arr3);

/* Step 5: Alphabetize the key phrase, then arrange the rows in the order of L1 */
let alph = keyphrase.split("").sort().join(""); //alph is keyphrase but in alphabetic order
L1= alphaAnagram(keyphrase);
console.log(keyphrase);
console.log(alph);
console.log(L1);
let arr5=[];
for(let i=0; i<L1.length; i++){
    arr5[i]=arr4[L1[i]];
}


/* Step 6: Transpose the matrix again, After this, it  will be ready to decode with a 6x6 polybius square*/
let arr6 = make1d(transpose(arr5));
console.table(arr6)

/* Step 7: Get the proper Polybius alphabet for decoding */
let ps6 = new Polybius(6, userKey);
console.log(ps6.a);

/* Step 8: For each pair of letters in arr5, substitute the Polybius alphabet letter */

