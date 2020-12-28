const mongoose = require('mongoose');
const config = require('../config/database');
var moment = require('moment');

const EvalSchema = mongoose.Schema ({
    username: {
        type: String,
        required: true
      },
     
    datum: {
        type: Date,
        required: true
    }, 

    za_eval: [{
        kategorija: String,
        pojmovi: [String]
    }]
    
});

const Evaluacija = module.exports = mongoose.model("evaluacija", EvalSchema, "evaluacija");

module.exports.sendForEval = function(data, callback){
    console.log("EVALUACIJA");
    var date = moment(data.datum).format("YYYY-MM-DD");
    Evaluacija.findOneAndUpdate({"username": data.username, "datum": date}, {"$set":{"za_eval": data.za_eval}}, {"upsert": true}, callback);
}

module.exports.getEvaluacija = function(callback){
    Evaluacija.find(callback);
}

module.exports.getEval = function(data, callback){
    var date = moment(data.datum).format("YYYY-MM-DD");
    Evaluacija.findOne({"username": data.username, "datum": date }, callback);
}

module.exports.del = function (username, datum, callback){
    var date = moment(datum).format("YYYY-MM-DD");
    Evaluacija.deleteOne({"username": username, "datum": date}, callback);
}
