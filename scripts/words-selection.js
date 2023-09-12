const {readFileSync, writeFileSync} = require('fs');
writeFileSync('../data/selectedwords.txt','')
// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

// syncReadFile('./data/dictionary.txt');

// writeFileSync()

const filtered = syncReadFile('../data/dictionary.txt').map(word => word.toLowerCase()).filter(word => {
    return word.length >= 4 && word[0] !== word[1] && !word.includes('.') && !word.includes('\'');
    
})

let ctr = 0;
let ctr2 = 0
let selected = [];
alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
for( let i = 0; i <= alphabet.length;i++){
    // console.log(ctr2++);
    for(let j = 0; j < filtered.length; j++,ctr++){
        let randomIndex = Math.floor(Math.random()*filtered.length);
        if(filtered[randomIndex][0] === alphabet[i] && !selected.includes(filtered[randomIndex])){
            selected.push(filtered[randomIndex]);
        }
        if(ctr === 300){ctr = 0; break;}
    }
}

// const fs = require('fs');

selected.forEach((word) => writeFileSync('../data/selectedwords.txt',`${word}\n`,{
    encoding: "utf8",
    flag: "a+",
    mode: 0o666
  }));


console.log(selected);