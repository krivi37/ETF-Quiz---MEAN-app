const mongoose = require('mongoose');
const config = require('../config/database');

const GeografijaSchema = mongoose.Schema ({
    naziv: {
        type: String,
        required: true
      },

    tip: {
        type: String,
        required: true
    }  
    
});

const Geografija = module.exports = mongoose.model("geografija", GeografijaSchema, "geografija");

module.exports.nadjiPojam = async function(naziv, tip) {
    return await Geografija.findOne({"naziv": naziv, "tip": tip});
    
}
