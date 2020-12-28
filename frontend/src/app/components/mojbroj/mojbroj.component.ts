import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { GameService } from 'src/app/services/gameservice.service';
import { NumberInterface } from 'src/app/interfaces/numberInterface';
import { TimerInterface } from 'src/app/interfaces/timer';
import { UserInterface } from 'src/app/interfaces/userinterface';
import { ResponseModel } from 'src/app/interfaces/response.model';
import { OdigranoInterface } from 'src/app/interfaces/odigrano.interface';

@Component({
  selector: 'app-mojbroj',
  templateUrl: './mojbroj.component.html',
  styleUrls: ['./mojbroj.component.css']
})
export class MojbrojComponent implements OnInit {

  time: number;
  result: number;
  broj1: number;
  broj2: number;
  broj3: number;
  broj4: number;
  broj5: number;
  broj6: number;
  slot: number = 1;
  message: string;

  showIzraz: boolean = false;
  started: boolean = false;
  user: UserInterface;

  bodovi: string;
  brojevi: any;
  timer: any;
  datum: Date;
  odigrano: boolean = true;

  izraz: string;

  constructor(private socket: SocketService, private game: GameService) { }

  ngOnInit() {  
    this.user = JSON.parse(localStorage.getItem('user'));
    var date = localStorage.getItem('datum');
    this.datum = new Date(date);
    if(this.user){
    this.game.checkOdigrano(this.user, this.datum).subscribe((data: OdigranoInterface)=>{
      if(data == undefined) this.odigrano = false; 
      else if(data.mojBroj ==undefined) this.odigrano = false;
      else {
        this.odigrano = true;
        this.message = "Vec ste igrali moj broj danas!";
      }});
    }
    else this.odigrano = false;
  }

  ngOnDestroy(){
    if(this.brojevi != undefined)this.brojevi.unsubscribe();
    if(this.timer != undefined)this.timer.unsubscribe();
    localStorage.setItem('poeni mojbroj', this.bodovi);
    if(this.user != undefined)this.game.sendPoints(this.user, this.datum, 'mojBroj', localStorage.getItem('poeni mojbroj')).subscribe((data: ResponseModel)=>{
      console.log(data.msg);
    });
    this.socket.disconnect();
  }

  provjeriBrojeve(){
    var temp, temp1;
    var check = "^(?=.*"+this.broj6+").*$";
    var re = new RegExp(check);

    temp = this.izraz;
    temp1 = temp.replace(re,"");

    if(temp1==""){
      re = new RegExp(""+this.broj6);
      temp = temp.replace(re,"");
    }

    check = "^(?=.*"+this.broj5+").*$";
    re = new RegExp(check);
    temp1 = temp.replace(re,"");
    
    if(temp1==""){
      re = new RegExp(""+this.broj5);
      temp = temp.replace(re,"");
    }

    check = "^(?=.*"+this.broj4+").*$";
    re = new RegExp(check);
    temp1 = temp.replace(re,"");
    
    if(temp1==""){
      re = new RegExp(""+this.broj4);
      temp = temp.replace(re,"");
    }

    check = "^(?=.*"+this.broj3+").*$";
    re = new RegExp(check);
    temp1 = temp.replace(re,"");
    
    if(temp1==""){
      re = new RegExp(""+this.broj3);
      temp = temp.replace(re,"");
    }

    check = "^(?=.*"+this.broj2+").*$";
    re = new RegExp(check);
    temp1 = temp.replace(re,"");
    
    if(temp1==""){
      re = new RegExp(""+this.broj2);
      temp = temp.replace(re,"");
    }

    check = "^(?=.*"+this.broj1+").*$";
    re = new RegExp(check);
    temp1 = temp.replace(re,"");
    
    if(temp1==""){
      re = new RegExp(""+this.broj1);
      temp = temp.replace(re,"");
    }

    var numbers =/\d/;
    if(numbers.test(temp)){
      return false;
    }
    else return true;
  }

  pocni(){
    this.started = true;
    this.brojevi = this.socket.getBrojevi().subscribe((data: NumberInterface)=>{
        switch(this.slot){
          case 1: {
            this.broj1 = data.broj;
            break;
          }
          case 2: {
            this.broj2 = data.broj;
            break;
          }
          case 3: {
            this.broj3 = data.broj;
            break;
          }
          case 4: {
            this.broj4 = data.broj;
            break;
          }
          case 5: {
            this.broj5 = data.broj;
            break;
          }
          case 6: {
            this.broj6 = data.broj;
            break;
          }
          case 7: {
            this.result = data.broj;
            break;
          }
        }
    });
  }

  gotovo(){

    var slova = /.*[a-zA-Z].*/;

    if(slova.test(this.izraz)){
      this.message = "Izraz ne smije sadrzati slova";
      return false;
    }

    var regexx =/[\D]$/;
    if(!regexx.test(this.izraz)){
      var regex1 = /^(\D*\d){1,9}$/;
      if (!regex1.test(this.izraz)){
        this.message = "Previse brojeva";
        return false;
      }
    }

    else{
      var regex1 = /^(\D*\d){1,9}[\D]$/;
      if (!regex1.test(this.izraz)){
        this.message = "Previse brojeva";
        return false;
      }
    }

    var regexmod = /(?=.*[%]).{1,}/;
    var regexpower =/(?=.*[\^]).{1,}/;

    if(regexmod.test(this.izraz) || regexpower.test(this.izraz)){
      this.message = "Dozvoljene su samo operacije: +,-,*,%, ()";
      return false;
    }

    if(!this.provjeriBrojeve()){
      this.message = "Samo se mogu koristiti brojevi prikazani na ekranu";
      return false;
    }

    var izracunato = eval(this.izraz);

    if(izracunato == undefined){
      this.message = "Los izraz";
      return false;
    }

    this.socket.disconnect();
    this.showIzraz = false;

    if(izracunato == this.result){
      this.bodovi = "10";
      this.message = "Tacan rezultat! Osvojeno je 10 bodova!";
    }

    else if(Math.abs(izracunato - this.result) < 6){
      this.bodovi = "5";
      this.message = ("Vas rezultat: "+izracunato+".Bili ste blizu, osvojili ste 5 poena!");
    }
    
    else{
      this.message = ("Vas rezultat: "+izracunato+".Nazalost niste osvojili bodove");
      this.bodovi = "0";

    }
  }

  stop(){
    this.socket.stop();
    this.slot++;

    if(this.slot == 8){
      this.showIzraz = true;
      this.socket.getTime('games/anagram').subscribe((data: TimerInterface)=>{
      this.time = data.countdown;
      if(this.time == 0){
        this.socket.disconnect();
        this.showIzraz = false;

        if(this.provjeriBrojeve()){
          var izracunato = eval(this.izraz);
          if(izracunato != undefined){
            if(izracunato == this.result){
              this.bodovi = "10";
              this.message = "Tacan rezultat! Osvojeno je 10 bodova!";
            }

            else if(Math.abs(izracunato - this.result) < 6){
              this.bodovi = "5";
              this.message = ("Vas rezultat: "+izracunato+".Bili ste blizu, osvojili ste 5 poena!");
            }
    
            else{
              this.message = ("Vas rezultat: "+izracunato+".Nazalost niste osvojili bodove");
              this.bodovi = "0";
            }
          }
          else{
            this.message = "Lose unesen izraz. Nazalost niste osvojili bodove";
            this.bodovi = "0";
          }
        }

      else{
        this.message = "Korisceni su nedozvoljeni brojevi. Nazalost niste osvojili bodove";
        this.bodovi = "0";
      }
    }

  });
  }
  console.log(this.slot);

}
}
