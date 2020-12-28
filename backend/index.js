const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to Database
mongoose.connect(config.database, {useNewUrlParser: true}).
catch(error => console.log(error));

//On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to db');
})

//On Error
mongoose.connection.on('error', (err) => {
    console.log('DB Error: '+err);
})

const app = express();

const users = require('./routes/users');
const games = require('./routes/games');


//Port
const port = process.env.PORT || 3000;

const whitelist = ['http://localhost:4200'];

//Cross-Origin Resource Sharing Middleware
app.use(cors());

//Body Parser
app.use(bodyParser.json());

// Set Static Folder
app.use(express.static(path.join(__dirname, '../frontend')));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);
app.use('/games', games);

//Index Route
app.get('/', (req, res) => {
    res.send('Invalid endpoint');
})

var server = app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});


var io = require('socket.io').listen(server);

io.origins("*:*");

//Pass socket to response or request
app.use((req, res, next)=>{ res.locals['socketio'] = io; next(); });

var tajmer;

const nsp = io.of('/games/anagram');//koristi se i za mojbroj
nsp.on('connection', function(socket){
    var countdown = 60;
    console.log('someone connected');
    tajmer = setInterval(function() {
    countdown--;
    nsp.emit('timer', { countdown: countdown });
  }, 1000);

  socket.on('disconnect', function(socket){
    console.log('diskonekt');
    clearInterval(tajmer);
})
  
});

const nspTajmerGeo = io.of('/games/geografija');//koristi se i za mojbroj
nspTajmerGeo.on('connection', function(socket){
    var countdown = 120;
    console.log('someone connected');
    tajmer = setInterval(function() {
    countdown--;
    nspTajmerGeo.emit('timer', { countdown: countdown });
  }, 1000);

  socket.on('disconnect', function(socket){
    console.log('diskonekt');
    clearInterval(tajmer);
})
  
});

/*const nspGeografija = io.of('/games/evaluacija', function(socket){
    nspGeografija.on('connection', function(socket){
        socket.on('poslato', function(data){
            console.log('poslato');
            const objekat = {
                msg: "evaluira se", 
                kategorija: data.kategorija, 
                pojmovi: data.pojmovi
            }
            console.log(objekat);
            nspGeografija.emit('evaluira', objekat);
            nspGeografija.emit('stiglo', data);
        });

        socket.on('izvrseno', function(data){
            console.log('izvrseno');
            nspGeografija.emit('poeni',data);
        });
    })
    
})*/

var broj1, broj2, broj3, broj4;
const nspBroj = io.of('/games/mojbroj');
nspBroj.on('connection', function(socket){
    var slot = 1;
    var broj = 1;
    broj1 = setInterval(function(){
        broj++;
        if(broj == 10) broj = 1;
        nspBroj.emit('broj', {broj: broj});
    }, 100);

    socket.on('stop', function(socket){
        slot++;
        if(slot==5){
            clearInterval(broj1);
            broj = 10;
            broj2 = setInterval(function(){
                broj = broj + 5;
                if(broj == 25) broj = 10;
                nspBroj.emit('broj', {broj: broj});
            }, 100);
        }
        else if(slot == 6){
            clearInterval(broj2);
            broj = 25;
            broj3 = setInterval(function(){
                broj = broj + 25;
                if(broj == 125) broj = 25;
                nspBroj.emit('broj', {broj: broj});
            }, 100);
        }

        else if(slot == 7){
            clearInterval(broj3);
            broj = 1;
            broj4 = setInterval(function(){
                broj = Math.floor(Math.random()*999);
                nspBroj.emit('broj', {broj: broj});
            }, 100);
        }
        else if(slot == 8){
            clearInterval(broj4);
        }

    });

    
    socket.on('disconnect', function(socket){
        console.log('diskonekt mojbroj');
        var slot = 1;
        var broj = 1;
        if(broj1)clearInterval(broj1);
        if(broj2)clearInterval(broj2);
        if(broj2)clearInterval(broj3);
        if(broj4)clearInterval(broj4);
    })

});

