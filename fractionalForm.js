class FractionalForm {
    constructor(alphabet, plaintext) {
        this.a = alphabet;
        this.msg = plaintext;
        this.codestring = ''; //will get the codestring after makeCode method is called.

    }

    truncateString(str, maxLength) {
        if (str.length <= maxLength) {
            return str;
        }
        const regex = new RegExp(`^.{0,${maxLength}}`);
        const truncated = str.match(regex)[0];
        return truncated;
    }


    getText() {
        let textarea = document.getElementById('mesg');
        //rgx = /[^A-Z^\d]/g //this matches everything except capital letters and digits
        let rgx = /\W|_/g   //and this line really does that
        let mystring = textarea.value.toUpperCase(); //change all case to upper   
        let nstr = mystring.replace(rgx, ''); //removes everything matched in the rgx.
        //nstr = this.truncateString(nstr, 30);
        document.getElementById('aspot').innerHTML = nstr;

        document.getElementById('showHere').innerHTML = ''; //clear the screen table area
        return nstr;
    }

    /*The Encode Button points here to makeCode() */
    makeCode() {
        if (this.msg == '') { alert('There was no message?'); return }
        this.msg = this.getText();
        this.msg = this.msg.toUpperCase();
        this.msg = this.msg.replace(/\W|_/g, ""); //this.msg must be capital letters and numbers only
        this.codestring = ''
        for (let i = 0; i < this.msg.length; i++) {
            let codepair = this.encode(this.msg[i]) //codepair is a 2 letter object - not an array
            let strpair = codepair[0].toString() + codepair[1].toString();
            this.codestring = this.codestring + strpair;
        }
        //console.log(this.codestring);
        //console.log(this.msg);
        //displayfractioned(codestring);
        //this.makeJSON(this.msg);  don't display this. It is the code of the message directly frm the polybius table
    }

    makeJSON(plaintext) {
        let codestring = this.codestring;
        //codestring = "VFXAVXXVVDXADAVVAVDVDAAVVXVAAVVVVVAAFFAVFVAVDAAV" //for testing only
        globalThis.jsonff = []; //define an empty  array
        for (let i = 0; i < plaintext.length; i++) {
            jsonff.push(
                {
                    msg: plaintext[i],
                    code: codestring[2 * i] + codestring[2 * i + 1]
                })
        }

        var _ = undefined;
        createTable(jsonff,_,_,"fractioned"); //This will output fractionated text to the HTML screen.
    }

    encode(letter) {  // returns a matched pair from the letters ADFGVX using alphabet ps6.a
        for (let h = 0; h < 6; h++) {
            for (let k = 0; k < 6; k++) {
                if (ps6.a[h][k] == letter) {
                    let pairmatch = this.ADFGVX(h, k);
                    return pairmatch;
                }
            }
        }
    }

    ADFGVX(h, k) {
        let p1 = ''; let p2 = '';
        if (h == 0) { p1 = 'A' }
        if (h == 1) { p1 = 'D' }
        if (h == 2) { p1 = 'F' }
        if (h == 3) { p1 = 'G' }
        if (h == 4) { p1 = 'V' }
        if (h == 5) { p1 = 'X' }
        if (k == 0) { p2 = 'A' }
        if (k == 1) { p2 = 'D' }
        if (k == 2) { p2 = 'F' }
        if (k == 3) { p2 = 'G' }
        if (k == 4) { p2 = 'V' }
        if (k == 5) { p2 = 'X' }
        return [p1, p2]
    }
}