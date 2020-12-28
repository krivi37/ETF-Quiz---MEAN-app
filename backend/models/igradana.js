const mongoose = require('mongoose');
const config = require('../config/database');
var moment = require('moment');

const IgraSchema = mongoose.Schema ({
    datum:{
        type: Date,
        required: true
    },

    postavka: {
        type: String,
        required: true
      },

    rjesenje: {
        type: String,
        required: true
    }  
    
});

const IgraDana = module.exports = mongoose.model("igradana", IgraSchema, "igradana");

module.exports.postaviIgruDana = function(data, callback){
    var date = moment(data.datum).format("YYYY-MM-DD");
    console.log(date);
    IgraDana.updateOne({"datum": data.datum}, {"$set": {"postavka": data.anagram.postavka, "rjesenje": data.anagram.rjesenje, "datum": date}}, {"upsert": true}, callback);
}

module.exports.dohvatiIgruDana = function(data, callback){
    var date = moment(data.datum).format("YYYY-MM-DD");
    console.log(date);
    IgraDana.findOne({"datum": date}, {postavka: 1}, callback);
}
