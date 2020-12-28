const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Anagram = require('../models/anagram');
const Takmicari = require('../models/takmicari');
const Geografija = require('../models/geografija');
const Evaluacija = require('../models/geoeval');
const IgraDana = require('../models/igradana');

router.post('/anagram', (req, res, next) => {
    IgraDana.dohvatiIgruDana(req.body, (err, data) => {
        if(err) throw err;
        else {
            res.json(data.postavka);
        }
    })
  });

router.post('/odigrano', (req,res, next) =>  {
    console.log(req.body.username);
    console.log(req.body.datum);
    Takmicari.getOdigrano(req.body.username, req.body.datum, (err, data)=>{
    if(err) throw err;
    else{
        res.json(data);
    }
})
});


router.post('/anagramcheck', (req, res, next) => {
    Anagram.getAnagram(req.body.postavka, (err, data)=>{
        if(err) res.json({success: false, msg: "error"});
        else {
            if(data.rjesenje.toLowerCase() == req.body.rjesenje.toLowerCase()) res.json({succes: true, msg: "Tacan odgovor!", points: 10});
            else {
                res.json({success: false, msg: ("Pogresno rjesenje! Rjesenje je: "+data.rjesenje), points: 0});
            }
        }
    })
  });

router.post('/geografija', (req, res, next) => {
    var i, j;
    var poeni = 0;
    var ostalo = req.body.pojmovi.length;
    var pojmovi = req.body.pojmovi;
    var evaluacija = pojmovi;
    var data;
    var promises = [];
    for(i = 0; i < req.body.pojmovi.length; i++){
        promises.push(Geografija.nadjiPojam(pojmovi[i], req.body.tip).then(
            (data) => {
                if(data != undefined) {
                    for(j = 0; j < req.body.pojmovi.length; j++){
                        if(evaluacija[j] == data.naziv) evaluacija.splice(j,1);
                    }
                    poeni += 2;
                }
            }
        ))
    }
    Promise.all(promises).then(()=>{
        res.json({poeni: poeni, pojmovi: evaluacija, kategorija: req.body.tip});
    });
  });
  
router.post('/evaluacija', (req, res, next) => {
    Evaluacija.sendForEval(req.body, (err)=>{
        if(err) throw err;
        console.log("success");
        res.json({success: true, msg: "uspjesno"});

    });
})  

router.post('/sendpoints', (req, res, next) => {
    Takmicari.upsertScore(req.body.ime, req.body.prezime, req.body.username, req.body.igra, req.body.poeni, req.body.datum, (err, data) => {
        if(err) res.json({success: false, msg: "error"});
        else{
            res.json({success: true, msg: "success"});
        }
    })
    
  });  

router.get('/getanagrami', (req, res, next)=>{
    Anagram.getAnagram(null, (err, data) =>{
        if(err) throw err;
        else {
            res.json(data);
        }
    } )
});

router.post('/setigradana', (req, res, next)=>{
    console.log(req.body.datum);
    console.log(req.body.anagram);
    IgraDana.postaviIgruDana(req.body, (err, data) =>{
        if(err) throw err;
        else {
            res.json(data);
        }
    } )
});

router.post('/provjeridan', (req, res, next)=>{
    console.log(req.body.datum);
    IgraDana.dohvatiIgruDana(req.body, (err, data) =>{
        if(err) throw err;
        else {
            if(data == undefined)
            res.json({succes: false});
            else res.json({success: true});
        }
    } )
});

router.post('/unesianagram', (req, res, next)=>{
    Anagram.unesiAnagram(req.body.postavka, req.body.rjesenje , (err, data) =>{
        if(err) throw err;
        else {
            res.json({success: true});
        }
    } )
});

router.get('/geteval', (req, res, next)=>{
    Evaluacija.getEvaluacija((err, data) =>{
        if(err) throw err;
        else {
            res.json(data);
        }
    } )
});

router.post('/odobri', (req, res, next)=>{
    Evaluacija.getEval(req.body, (err, data) =>{
        var i, j;
        if(err) throw err;
        else {

            for(j = 0; j < data.za_eval.length; j++){
                if(data.za_eval[j].kategorija == req.body.kategorija){
                    for(i = 0; i < data.za_eval[j].pojmovi.length; i++){
                        if(data.za_eval[j].pojmovi[i] == req.body.pojam){
                            data.za_eval[j].pojmovi.splice(i,1);
                        }
                    }
                }

                Evaluacija.sendForEval(data, (err, it) => {
                console.log(data.za_eval);
                if(err) throw err;
                else {
                    console.log("update")
                    Evaluacija.getEval(req.body, (err, dat) =>{
                        if(err) throw err;
                        else{
                            var k;
                            for (k = 0; k< dat.za_eval.length; k++){
                                if(dat.za_eval[k].pojmovi.length != 0) return;
                            }
                            Evaluacija.del(dat.username, dat.datum, (err, d)=>{
                                console.log("DELETED");
                            })
                        }
                    });
            
            }}); 
               
            
        }

        Takmicari.getGeografijaPoeni(req.body.username, req.body.datum, (err, povrat) => {
            if(err) throw err;
            else {
                var poeni = povrat.geografija + 2;
                Takmicari.updateScore(povrat.username, povrat.datum, poeni, (err, item) => {
                    if(err) throw err;
                    else console.log("success");
                });
            }
        });
       
    }
    res.json("Success");
    } )
});

router.post('/ponisti', (req, res, next)=>{
    Evaluacija.getEval(req.body, (err, data) =>{
        var i, j;
        if(err) throw err;
        else {

            for(j = 0; j < data.za_eval.length; j++){
                if(data.za_eval[j].kategorija == req.body.kategorija){
                    for(i = 0; i < data.za_eval[j].pojmovi.length; i++){
                        if(data.za_eval[j].pojmovi[i] == req.body.pojam){
                            data.za_eval[j].pojmovi.splice(i,1);
                        }
                    }
                }

                Evaluacija.sendForEval(data, (err, it) => {
                console.log(data.za_eval);
                if(err) throw err;
                else {
                    console.log("update")
                    Evaluacija.getEval(req.body, (err, dat) =>{
                        if(err) throw err;
                        else{
                            var k;
                            for (k = 0; k< dat.za_eval.length; k++){
                                if(dat.za_eval[k].pojmovi.length != 0) return;
                            }
                            Evaluacija.del(dat.username, dat.datum, (err, d)=>{
                                console.log("DELETED");
                            })
                        }
                    });
            
            }}); 
               
            
        } 
    }
    res.json("Success");
    } )
});

router.post('/getdantakmicari', (req, res, next) => {
    Takmicari.getTakmicari(req.body.datum, (err, data) =>{
        if(err) throw err;
        else {
            res.json(data);
        }
    } )
});

module.exports = router;