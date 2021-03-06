//User http requests 
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

//Register
router.post('/register', (req, res, next) => {
    let newUser = new User ({
        name: req.body.name,
        surname :req.body.surname,
        email: req.body.email,
        occupation: req.body.occupation,
        username: req.body.username,
        password: req.body.password,
        gender: req.body.gender,
        JMBG: req.body.JMBG,
        secretQ: req.body.secretQ,
        secretA: req.body.secretA,
        type: req.body.type,
        request: true,
        approved: false
      });
      
      User.getUserByUsername(newUser.username, (err, user) => {
          if(err){ res.json({success: false, msg: `Database error: ${err}`});}
          if(!user){
            User.addUser(newUser, (err, user) => {
              if(err) {
                res.json({success: false, msg: 'Failed to register user'});
              } else {
                res.json({success: true, msg: 'User request recorded'});
              }
            });
          }
          else if (user) {
            if(user.request == false && user.approved == false)
            res.json({success: false, msg: 'User request not approved'});

            else if(user.request == true && user.approved == false)
            res.json({success: false, msg: 'User registration pending'});

            else res.json({success: false, msg: 'User with that username already exists'});
          }

      });

});

router.post('/authenticate', (req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;
   
    User.getUserByUsername(username, (err, user) => {
      if(err) throw err;

      if(!user){
        return res.json({success: false, msg: 'User not found'});
      }

      User.comparePassword(password, user.password, (error, isMatch) => {
        if(err) throw err;
        if(user.request==false && user.approved ==false)return res.json({success: false, msg: 'Neautorizovan profil, kontaktirajte administratora'});
        else if (user.request==true && user.approved ==false) return res.json({success: false, msg: 'Profil ceka odobrenje administratora'});
        if(isMatch){
          const token = jwt.sign({_id: user._id, type: user.type}, config.secret, {
            expiresIn: 3600
          });

          res.json({
            succes: true,
            token: 'JWT '+token,
            user: {
              id: user._id,
              name: user.name,
              surname: user.surname,
              username: user.username,
              type: user.type
            }
          });
        }

        else {
          return res.json({success: false, msg: 'Wrong password'});
        }
      });
    });
});

router.get('/profile', passport.authenticate('user-rule', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

router.get('/regreq', passport.authenticate('admin-rule' ,{session:false}), (req, res, next) => {
  User.getRegistrationRequests((err, data) => {
    if(err) res.json({success: false, msg: "error"});
    else res.json(data);
  });
});

router.post('/authorizeone', passport.authenticate('admin-rule' ,{session:false}),(req, res, next) => {
    let username = req.body.username;
    User.authorizeRequest(username, (err) => {
      if(err) res.json({success: false, msg: "error"});
      else res.json({msg: "success"});
    })
})

router.post('/authorizeall', passport.authenticate('admin-rule' ,{session:false}),(req, res, next) => {
  User.authorizeAll((err) => {
    if(err) res.json({success: false, msg: "error"});
    else res.json({msg: "success"});
  })
})

router.post('/denyrequest', passport.authenticate('admin-rule' ,{session:false}),(req, res, next) => {
  let username = req.body.username;
  User.denyRequest(username, (err) => {
    if(err) res.json({success: false, msg: "error"});
    else res.json({msg: "success"});
  })
})

router.post('/forgottenpassword', (req, res, next) => {
  let username = req.body.username;
  let JMBG = req.body.JMBG;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;

    if(!user || JMBG != user.JMBG){
      return res.json({success: false, msg: 'Korisnik sa tim imenom i maticnim brojem nije pronadjen'});
    }
    return res.json({success:true, msg: 'Tajanstveno pitanje'});  
  }
)
})

router.post('/questioncheck', (req, res, next) => {
  let username = req.body.username;
  let answer = req.body.answer;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user || answer != user.secretA){
      return res.json({success: false, msg: 'Pogresan odgovor na tajanstveno pitanje'});
    }
    return res.json({success:true, msg: 'Resetuj lozinku'});  
  }
)
})

router.post('/resetpassword', (req, res, next) => {
  let username = req.body.username;
  let newpass = req.body.newpass;
  User.updatePassword(username, newpass, (err, user) => {
    if(err) throw err;
    return res.json({success:true, msg: 'Uspjesno postavljena nova lozinka'});  
  }
)
})

router.post('/getquestion', (req, res, next) => {
  let username = req.body.username;
  
  User.getUserByUsername(username, (err, user) => {;
    if(err) throw err;
    return res.json({success:true, msg: user.secretQ});  
  }
)
})

router.post('/checkpassword', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.oldpass;
    User.getUserByUsername(username, (err, user) => {
      if(err) throw err;

      if(!user){
        return res.json({success: false, msg: 'User not found'});
      }

      User.comparePassword(password, user.password, (error, isMatch) => {
        if(err) throw err;
        if(user.request==false && user.approved ==false)return res.json({success: false, msg: 'Neautorizovan profil, kontaktirajte administratora'});
        else if (user.request==true && user.approved ==false) return res.json({success: false, msg: 'Profil ceka odobrenje administratora'});
        if(isMatch){
          
          res.json({
            succes: true,
            msg: "OK"
          });
        }

        else {
          return res.json({success: false, msg: 'Pogresna lozinka'});
        }
      });
    });
})

module.exports = router;