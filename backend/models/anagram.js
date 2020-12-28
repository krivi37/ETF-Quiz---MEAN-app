const mongoose = require('mongoose');
const config = require('../config/database');

const AnagramSchema = mongoose.Schema ({
    postavka: {
        type: String,
        required: true
      },

    rjesenje: {
        type: String,
        required: true
    }  
    
});

const Anagram = module.exports = mongoose.model("anagrams", AnagramSchema, "anagrami");

module.exports.getAnagram = function(postavka, callback) {
    if(postavka) Anagram.findOne({"postavka": postavka}, callback);
    else Anagram.find({}, callback);
}

module.exports.unesiAnagram = function(postavka, rjesenje, callback){
    NewAnagram = new Anagram({
        postavka: postavka,
        rjesenje: rjesenje
    }
    );
    NewAnagram.save(callback);
}
