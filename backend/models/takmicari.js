const mongoose = require('mongoose');
const config = require('../config/database');
var moment = require('moment');

const UserSchema = mongoose.Schema ({
    name: {
      type: String,
      required: true
    },
  
    surname: {
        type: String,
        required: true
    },

    datum:{
      type: Date,
      required: true
    },

    username: {
      type: String,
      required: true
    },

    anagram:{
        type: Number,
       
    },

    mojBroj:{
        type: Number,
      
    },

    geografija:{
        type: Number,
       
    }

  });

  const Takmicar = module.exports = mongoose.model('takmicar', UserSchema, 'takmicari');

  module.exports.upsertScore = function (name, surname, username, game, points, datum, callback){
        var date = moment(datum).format("YYYY-MM-DD");
        if(points == undefined)points = 0;
        if(game == "anagram")
        Takmicar.updateOne({"username": username, "datum":date}, {"$set": {"name": name, "surname": surname, "anagram": points, "datum": date}}, {"upsert": true}, callback);

        else if(game == "mojBroj")
        Takmicar.updateOne({"username": username, "datum":date}, {"$set": {"name": name, "surname": surname, "mojBroj": points, "datum": date}}, {"upsert": true}, callback);

        else if(game == "geografija")
        Takmicar.updateOne({"username": username, "datum":date}, {"$set": {"name": name, "surname": surname, "geografija": points, "datum": date}}, {"upsert": true}, callback);
  }

module.exports.getOdigrano = function(username, datum, callback){
   console.log(username);
   console.log(datum);
    var date = moment(datum).format("YYYY-MM-DD");
    Takmicar.findOne({"username":username, "datum": date}, {anagram: 1, mojBroj:1, geografija: 1}, callback);
}


module.exports.getGeografijaPoeni = function(username, datum, callback){
  var date = moment(datum).format("YYYY-MM-DD");
  Takmicar.findOne({"username":username, "datum": date}, {username: 1, datum:1, geografija: 1}, callback);
}

module.exports.updateScore = function (username, datum, poeni, callback){
  var date = moment(datum).format("YYYY-MM-DD");
  Takmicar.updateOne({"username": username, "datum":date}, {"$set": { "geografija": poeni}}, {"upsert": true}, callback);
}

module.exports.getTakmicari = function(datum, callback){
    var date = moment(datum).format("YYYY-MM-DD");
    Takmicar.find({"datum" : date}, {username: 1, anagram: 1, mojBroj:1, geografija: 1}, callback);
}