import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/gameservice.service';
import { SocketService } from 'src/app/services/socket.service';
import { SocketResponse } from 'src/app/interfaces/socket.response';
import { TimerInterface } from 'src/app/interfaces/timer';
import { ResponseModel } from 'src/app/interfaces/response.model';
import { EvalInterface } from 'src/app/interfaces/evaluacija.interface';
import { UserInterface } from 'src/app/interfaces/userinterface';
import { OdigranoInterface } from 'src/app/interfaces/odigrano.interface';

@Component({
  selector: 'app-geografija',
  templateUrl: './geografija.component.html',
  styleUrls: ['./geografija.component.css']
})
export class GeografijaComponent implements OnInit {

  drzave: string;
  gradovi: string;
  jezera: string;
  planine: string;
  rijeke: string;
  zivotinje: string;
  biljke: string;
  mgrupe: string;
  odigrano: boolean = true;
  recieved: number = 0;

  slovo: string;
  regex: any;
  re: any;
  message: string;
  time: number;
  user: UserInterface;
  sent: number = 0;
  datum: Date;
  zaustavi: boolean = false;

  started: boolean = false;
  gotovo: boolean = false;

  poslato: boolean[] = [false,false,false,false,false,false,false,false];
  kategorije: string[] = ['drzave', 'gradovi', 'jezera', 'planine', 'rijeke', 'zivotinje', 'biljke', 'mgrupe'];
  evaluira_se: string[]= ["","","","","","","",""];
  za_eval: EvalInterface;

  timer: any;
  supervizor: any;

  
  poeni: number = 0;

  constructor(private socket: SocketService, private game: GameService) { }


  ngOnDestroy(){
    if(this.supervizor != undefined)this.supervizor.unsubscribe();
    if(this.timer != undefined)this.timer.unsubscribe();
    localStorage.setItem('poeni mojbroj', this.poeni.toString());
    if(this.user != undefined)this.game.sendPoints(this.user, this.datum, 'geografija', this.poeni.toString()).subscribe((data: ResponseModel)=>{
      console.log("poslati poeni");
    });
    this.socket.disconnect();
  }

  startGame(){
    var letters = ["a", "b", "v", "g", "d", "đ", "e", "ž", "z", "i", "j", "k", "l", "lj", "m", "n", "nj", "o", "p", "r", "s", "t", "ć", "u", "f", "h", "c", "č", "dž", "š"];
    var letter = letters[Math.floor(Math.random() * letters.length)];
    this.slovo = letter.toUpperCase();
    this.regex = "^"+this.slovo+".*";
    this.re = new RegExp(this.regex);
    this.started = true;
    this.socket.getTime('games/geografija').subscribe((data: TimerInterface)=>{
      this.time = data.countdown;
      if(this.time == 0 || this.zaustavi == true){
        this.socket.disconnect();
        var i;
        this.gotovo = true;
        for (i=0 ; i<this.poslato.length; i++){
          if(!this.poslato[i])this.send(this.kategorije[i]);
        }
      }
    });
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    var date = localStorage.getItem('datum');
    this.datum = new Date(date);
    if(this.user){
    this.game.checkOdigrano(this.user, this.datum).subscribe((data: OdigranoInterface)=>{
      if(data == undefined) this.odigrano = false; 
      else if(data.geografija ==undefined) this.odigrano = false;
      else {
        this.odigrano = true;
        this.message = "Vec ste igrali zanimljivu geografiju danas!";
      }});
    }
    else this.odigrano = false;
  }

  stop(){
    this.zaustavi = true;
  }

  send(kategorija: string){
    if(kategorija == 'drzave'){
      if(this.drzave == "" || this.drzave == undefined){
          this.poslato[0] = true;
          return false;
      } 
      var results = this.drzave.match(/("[^"]+"|[^"\s]+)/g);
      var i;
      for (i = 0; i< results.length; i++){
        results[i] = results[i].replace(/['"]+/g, '');
      }
      this.poslato[0] = true;
      if(!this.checkSlovo(results)){
        this.message = "Nije dobro pocetno slovo u kategoriji: "+kategorija;
        this.poslato[0] = false;
        return false;
      }
    }

    else if(kategorija == 'gradovi')
    {
      if(this.gradovi == "" || this.gradovi == undefined){
        this.poslato[1] = true;
        return false;
    } 
      var results = this.gradovi.match(/("[^"]+"|[^"\s]+)/g);
      var i;
      for (i = 0; i< results.length; i++){
        results[i] = results[i].replace(/['"]+/g, '');
      }
      this.poslato[1] = true;
      if(!this.checkSlovo(results)){
        this.message = "Nije dobro pocetno slovo u kategoriji: "+kategorija;
        this.poslato[1] = false;
        return false;
      }
    }

    else if(kategorija == 'jezera')
    { 
      if(this.jezera == "" || this.jezera == undefined){
        this.poslato[2] = true;
        return false;
    } 
      var results = this.jezera.match(/("[^"]+"|[^"\s]+)/g);
      var i;
      for (i = 0; i< results.length; i++){
        results[i] = results[i].replace(/['"]+/g, '');
      }
      this.poslato[2] = true;
      if(!this.checkSlovo(results)){
        this.message = "Nije dobro pocetno slovo u kategoriji: "+kategorija;
        this.poslato[2] = false;
        return false;
      }
    }

    else if(kategorija == 'planine')
    {
      if(this.planine == "" || this.planine == undefined){
        this.poslato[3] = true;
        return false;
    } 
      var results = this.planine.match(/("[^"]+"|[^"\s]+)/g);
      var i;
      for (i = 0; i< results.length; i++){
        results[i] = results[i].replace(/['"]+/g, '');
      }
      this.poslato[3] = true;
      if(!this.checkSlovo(results)){
        this.message = "Nije dobro pocetno slovo u kategoriji: "+kategorija;
        this.poslato[3] = false;
        return false;
      }
    }

    else if(kategorija == 'rijeke')
    {
      if(this.rijeke == "" || this.rijeke == undefined) {
        this.poslato[4] = true;
        return false;
    } 
      var results = this.rijeke.match(/("[^"]+"|[^"\s]+)/g);
      var i;
      for (i = 0; i< results.length; i++){
        results[i] = results[i].replace(/['"]+/g, '');
      }
      this.poslato[4] = true;
      if(!this.checkSlovo(results)){
        this.message = "Nije dobro pocetno slovo u kategoriji: "+kategorija;
        this.poslato[4] = false;
        return false;
      }
    }

    else if(kategorija == 'zivotinje')
    {
      if(this.zivotinje == "" || this.zivotinje == undefined){
        this.poslato[5] = true;
        return false;
    } 
      var results = this.zivotinje.match(/("[^"]+"|[^"\s]+)/g);
      var i;
      for (i = 0; i< results.length; i++){
        results[i] = results[i].replace(/['"]+/g, '');
      }
      this.poslato[5] = true;
      if(!this.checkSlovo(results)){
        this.message = "Nije dobro pocetno slovo u kategoriji: "+kategorija;
        this.poslato[5] = false;
        return false;
      }
    }

    else if(kategorija == 'biljke')
    {
      if(this.biljke == "" || this.biljke == undefined) {
        this.poslato[6] = true;
        return false;
    } 
      var results = this.biljke.match(/("[^"]+"|[^"\s]+)/g);
      var i;
      for (i = 0; i< results.length; i++){
        results[i] = results[i].replace(/['"]+/g, '');
      }
      this.poslato[6] = true;
      if(!this.checkSlovo(results)){
        this.message = "Nije dobro pocetno slovo u kategoriji: "+kategorija;
        this.poslato[6] = false;
        return false;
      }
    }

    else if(kategorija == 'mgrupe')
    {
      if(this.mgrupe == "" || this.mgrupe == undefined){
        this.poslato[7] = true;
        return false;
    } 
      var results = this.mgrupe.match(/("[^"]+"|[^"\s]+)/g);
      var i;
      for (i = 0; i< results.length; i++){
        results[i] = results[i].replace(/['"]+/g, '');
      }
      this.poslato[7] = true;
      if(!this.checkSlovo(results)){
        this.message = "Nije dobro pocetno slovo u kategoriji: "+kategorija;
        this.poslato[7] = false;
        return false;
      }
    }

    this.game.checkPojmovi(results, kategorija).subscribe((data: SocketResponse)=>{
        this.recieved++;
        this.poeni += data.poeni;
        if(data.pojmovi.length > 0){
            if(this.user != undefined){
              const a = {
                kategorija: data.kategorija,
                datum: this.datum,
                pojmovi: data.pojmovi
              }
              if(this.za_eval == undefined){
                const e: EvalInterface = {
                  username: this.user.username,
                  datum:  this.datum,
                  za_eval: [a]
                }
                this.za_eval = e;
              }
              else {
                this.za_eval.za_eval.push(a);
              }

          }
        }
        this.game.sendForEvaluation(this.za_eval).subscribe((data: ResponseModel)=>{
          if(data){
            this.gotovo = true;
            this.message = "Poslato na evaluaciju:";
          }
        });
    });

    this.sent++;
  }

  checkSlovo(results: any){
    var i;
    for(i = 0; i< results.length; i++){
      var temp = results[i];
      temp = temp.toUpperCase();
      temp = temp.replace(this.re, "");
      if(temp != ""){
        return false;
      }
    }
    return true;
  }

}
