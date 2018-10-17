
// convert to es6 class module
let flag = true; // declare a global variable

stop = () => {  // pause function
    flag = false;
}
play = () => {
    flag = true; // unpause function
}
class Loop {
    constructor(txt, wpm) {
        // declare variables
        this.txt = txt.replace(/\n/g, ' ');
        this.wpm = wpm || 200;
        this.arrayOfText = txt.split(' ');
        this.lengthOfArray = this.arrayOfText.length;
        this.i = 0;
        this.b = document.getElementById('bw');
        this.tw = document.getElementById('tw');
        this.tx = {
            L: document.getElementById('txt_L'),
            C: document.getElementById('txt_C'),
            R: document.getElementById('txt_R')
        };
        setInterval(() => {
            //remove the empty string "" inside the array
            this.arrayOfText = this.arrayOfText.filter((element) => {
                return element !== ""
            })
            this.lengthOfArray = this.arrayOfText.length

            if (flag === false) { // pause 2000ms and reverse the text
                setTimeout(() => {
                    if (this.i <= 0) {
                        this.i = this.lengthOfArray
                    }
                    this.middle(this.arrayOfText[--this.i])
                }, 2000);

            } else {
                this.middle(this.arrayOfText[this.i])
                if (++this.i === this.lengthOfArray) {
                    this.i = 0;
                }
            }
            console.log(flag, this.i, this.lengthOfArray, "here here here")
        }, flag ? (60 / this.wpm) * 2000 : 2000); // if the flag = true return (60 / this.wpm) * 200 else return 2000ms
    }
    width(word) {
        this.tw.textContent = word;
        return this.tw.offsetWidth;
    }
    middle(word) {
        console.log("word is : ", word)
        let lengthOfArray = word.length,
            c = ~~((lengthOfArray + 1) / 3) + 1,
            z = {};
        if (!lengthOfArray) // if lengthOfArray = 0
            return;
        z.a = this.width(word.substr(0, c - 1));
        z.b = this.width(word.substr(0, c));
        z.c = (z.b - z.a) / 2;
        this.b.style.paddingLeft = ~~(110 - (z.a + z.c)) + 'px';
        this.tx.L.textContent = word.substr(0, c - 1);
        this.tx.C.textContent = word.substr(c - 1, 1);
        this.tx.R.textContent = word.substr(c);
    }

    whiteout(w) {
        if (w) {
            (this.tx.L.style.color && this.tx.R.style.color)
            return '#fff';
        } else {
            this.tx.L.style.color = '#080';
            this.tx.R.style.color = '#000';
        }
    };

}

const txt = document.getElementById('input').value;
const ww = new Loop(txt, 250);
