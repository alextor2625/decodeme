class Dictionary {
    constructor(maxKeyRange){
        this.encDict = {} // Dictionary that has each word as key and the encryted word as value.
        this.decDict = {} // Dictionary that has each encrypted word as key and the word as value.
        // List of words to be used for the game.    TODO: Need to figure out a way to access these words from a file.
        this.words = [
            'attribute',        'airlift',       'alger',       'ashy',
            'andean',           'awash',         'armadillo',   'antigen',
            'afar',             'aztecan',       'affidavit',   'assault',
            'anatomist',        'bowel',         'bridget',     'bacterial',
            'backward',         'biblical',      'bernhard',    'battery',
            'bemuse',           'bonneville',    'babysit',     'betoken',
            'barbell',          'bryophyte',     'blake',       'bone',
            'bellflower',       'bedraggle',     'cain',        'consolidate',
            'congresswomen',    'corroborate',   'chairwomen',  'constrictor',
            'cosec',            'chivalrous',    'cloak',       'clannish',
            'clench',           'corruptible',   'corrector',   'causate',
            'crocodile',        'crusty',        'condensible', 'commutate',
            'crystallographer', 'commentary',    'confrere',    'chaste',
            'cahoot',           'collins',       'crankshaft',  'conant',
            'crisscross',       'conscript',     'depict',      'dreary',
            'derivate',         'deadlock',      'daddy',       'diligent',
            'dell',             'differentiate', 'dispense',    'dolan',
            'dandelion',        'devote',        'doubloon',    'dime',
            'decimate',         'deprave',       'dinah',       'diffract',
            'deanna',           'desecrater',    'distinct',    'deregulate',
            'edward',           'everyman',      'elsevier',    'exclusionary',
            'eskimo',           'emil',          'envelope',    'exhale',
            'estoppal',         'echo',          'earring',     'ernie',
            'electron',         'ellison',       'flute',       'frustrate',
            'fischbein',        'fiske',         'gash',        'gallium',
          ];
        this.dictSize = this.words.length; // Size of all our dictionary arrays.
        this.randKey = 1;
        this.keyArr = [];
        this.encWords = this.caesarEncrypt(maxKeyRange); // List of encrypted words.


        /* ******************************************************************************************** *
         * DRAFT CODE FOR WHEN CAESAR ENCRYPTION LEVEL 2 METHOD IS DONE:                                *
         * this.encWords = typeof key === Number? this.caesarEncrypt(key):this.caesarEncryptLevel2(key);*
         * ******************************************************************************************** *
         */

        /* ********************************************************************************************************************* *
         * Taking all the words and they're encrypted values and turns them into dictionaries for easier access.                 *
         * The reason this was done is to avoid using the Encryption and Decryption methods to know their values during the game.*
         * ********************************************************************************************************************* *
         */
        this.getWords().forEach((word,i) => {
            this.encDict[word] = {enc: this.encWords[i],key: this.keyArr[i]};
            this.decDict[this.encDict[word].enc] = {dec: word, key: this.keyArr[i]}
        })
        

    }

    getWords(){ // Getter method that returns the list of words in the dictionary.
        return this.words;
    }

    getEncWords(){ // Getter method that returns the list of encrypted words.
        return this.encWords;
    }

    getAlphabet(){ // Getter method that returns a list containing the alphaber in uppercase.
        return ['A','B','C','D','E','F',
                'G','H','I','J','K','L',
                'M','N','O','P','Q','R',
                'S','T','U','V','W','X',
                'Y','Z']
    }

    randomKey(maxKeyRange){
        let randKey = 0;
        if(maxKeyRange >= 20){
            randKey = Math.floor(Math.random()*20)+1;
            
        }else if(maxKeyRange <= 10){
            randKey = Math.floor(Math.random()*10)+1;
        }else{
            randKey = Math.floor(Math.random()*maxKeyRange)+1
        }
        return randKey;
    }


    /* ************************************************* *
     * Ecryption method based on the Caesar Cipher.      *
     * Given a key the method will encrypt every word by *
     * rotating each letter based on the position of the *
     * letter in the alphabet plus the key.              *
     * ************************************************* *
     * ********************************************************** *
     * For Example:                                               *
     * If the Key is 1 and the word is HELLO.                     *
     * H's position in thE alphabet is 7 and 7 + 1 = 8 so         *
     * now H will be the letter in position 8, I;                 *
     * E's position is 4, 4 + 1 = 5 so now E changes to F;        *
     * L's position is 11, 11 + 1 = 12 so now L is M;             *
     * And finally O's position is 14, 14 + 1 = 15 so now O is P; *
     * The final ecryption result would be IFMMP.                 *
     * ********************************************************** *
     */
    // caesarEncrypt(key){ 
    //     if(!key){return null;}
    //     const words = this.getWords().map((w) => w.toUpperCase());
    //     const alphabet = this.getAlphabet();
        
    //     const encWords = words.map((w) => {
    //         return w.split('').map((c) => {
    //             let index = (alphabet.indexOf(c)+key)%alphabet.length;
    //             return alphabet[index];
    //         }).join('');
    //     });
    //     return encWords;
    // }

    caesarEncrypt(maxKeyRange){ 
        if(!maxKeyRange){return null;}
        const words = this.getWords().map((w) => w.toUpperCase());
        const alphabet = this.getAlphabet();
        const encWords = words.map((w) => {
            this.randKey = this.randomKey(maxKeyRange)
            this.keyArr.push(this.randKey)
            return w.split('').map((c) => {
                let index = (alphabet.indexOf(c)+this.randKey)%alphabet.length;
                return alphabet[index];
            }).join('');
        });
        return encWords;
    }

    /* ***************************************************** *
     * Ecryption method based on the Caesar Cipher.          *
     * Will do the exact same thing as the encryption method *
     * in reverse. Instead of adding the key, its subtracted.*
     * Used mainly for debugging purposes.                   *
     * ***************************************************** *
     * *********************************************** *
     * TODO: THIS METHOD NEEDS TO BE VERIFIED FOR BUGS.*
     * *********************************************** *
     */ 
    caesarDecrypt(key){
        if(!key){return null;}
        const words = this.getEncWords();
        const alphabet = this.getAlphabet();
        const decWords = words.map((w) =>{
            return w.split('').map((c) => {
                let index = (alphabet.indexOf(c)-key)%alphabet.length;
                if(alphabet[index] === undefined){return alphabet[alphabet.length-Math.abs(index)]}
                return alphabet[index]
            }).join('')
        })
        return decWords;

    }

    // caesarDecrypt(maxKeyRange){
    //     if(!maxKeyRange){return null;}
    //     const words = this.getEncWords();
    //     const alphabet = this.getAlphabet();
    //     const decWords = words.map((w) =>{
    //         return w.split('').map((c) => {
    //             let index = (alphabet.indexOf(c)-this.randomKey(maxKeyRange))%alphabet.length;
    //             if(alphabet[index] === undefined){return alphabet[alphabet.length-Math.abs(index)]}
    //             return alphabet[index]
    //         }).join('')
    //     })
    //     return decWords;

    // }

    // caesarEncryptLevel2(key){
        // if(!key){return null;}
        // const words = this.getWords().map((w) => w.toUpperCase());
        // const alphabet = this.getAlphabet();
        // const encWords
        // // const encWords = words.map((w) => {
        // //     return w.split('').map((c) => {
        // //         let index = (alphabet.indexOf(c)+key)%alphabet.length;
        // //         return alphabet[index];
        // //     }).join('');
        // // });
        // return encWords;
    // }

}