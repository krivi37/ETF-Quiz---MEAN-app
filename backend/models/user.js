//User model and operations on database
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema ({
  name: {
    type: String,
    required: true
  },

  surname: {
      type: String,
      required: true
  },

  email: {
    type: String,
    required: true
  },

  occupation: {
    type: String,
    required: true
  },

  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

  gender: {
      type: String,
      required: true
  },

  JMBG: {
      type: Number,
      required: true
  },

  secretQ: {
      type: String,
      required: true
  },

  secretA: {
    type: String,
    required: true
  },

  type:{
    type: String,
    required: true
  },

  request: {
      type: Boolean
  },

  approved: {
      type: Boolean,
      required: true
  }

});

const User = module.exports = mongoose.model('users', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(user, callback){
  const query = {username: user}
  User.findOne(query, callback);
}
  
module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    })
  })
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

module.exports.getRegistrationRequests = function(callback){
    User.find({request: true}, {name: 1,
      surname: 1,
      username: 1,
      occupation: 1,
      gender: 1,
      email: 1,
      JMBG: 1,
      type: 1, _id: 0 }, 
      callback);
}

module.exports.authorizeRequest = function(username, callback){
    User.updateOne({"username": username}, {"$set": {"request": false, "approved": true}}, callback);
}

module.exports.authorizeAll = function(callback){
    User.updateMany({"request": true}, {"$set": {"request": false, "approved": true}}, callback);
}

module.exports.denyRequest = function(username, callback){
    User.updateOne({"username": username}, {"$set": {"request": false, "approved": false}}, callback);
}

module.exports.updatePassword = function(username, newpassword, callback){
  let password;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newpassword, salt, (err, hash) => {
      if(err) throw err;
      password = hash;
      console.log(password);
      User.updateOne({"username": username}, {"$set": {"password": password}}, callback);
    })
  })
}
