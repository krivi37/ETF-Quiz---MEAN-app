import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PasswordResetService } from '../../services/password-reset.service';
import { ResponseModel } from 'src/app/interfaces/response.model';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInterface } from 'src/app/interfaces/userinterface';
import { GameService } from 'src/app/services/gameservice.service';
import { OdigranoInterface } from 'src/app/interfaces/odigrano.interface';
import { Takmicari } from 'src/app/interfaces/takmicari.interface';

@Component({
  selector: 'app-igradana',
  templateUrl: './igradana.component.html',
  styleUrls: ['./igradana.component.css']
})
export class IgradanaComponent implements OnInit {

  igradana: boolean = false;
  message: string;
  igrastring: string;
  user: UserInterface;
  odigrane: {
    igra: string,
    poeni: number
  }[];
  datum: Date;
  takmicari: Takmicari[] = [];


  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private game: GameService,
    private router: Router) { }


  dohvatiTakmicare(){
    this.takmicari = [];
    let headers = new HttpHeaders();
    const obj ={
      datum: this.datum
    }
    headers = headers.append('Content-Type', 'application/json');
    this.http.post('http://localhost:3000/games/getdantakmicari', obj, {headers: headers}).subscribe((data: Takmicari[]) => {
      this.takmicari = data;
      var i;
      for(i = 0; i < this.takmicari.length; i++){
        if(this.takmicari[i].geografija == undefined)this.takmicari[i].geografija = 0;
        if(this.takmicari[i].anagram == undefined)this.takmicari[i].anagram = 0;
        if(this.takmicari[i].mojBroj == undefined)this.takmicari[i].mojBroj = 0;
      }
    });

  }

  ngOnInit() {
    this.odigrane = [];
    this.user = JSON.parse(localStorage.getItem('user'));
    this.igrastring = localStorage.getItem('igra_dana');
    if(this.igrastring == undefined){
      let headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json');
      this.datum= new Date();
      const obj ={
        datum: this.datum
      }
      this.http.post('http://localhost:3000/games/provjeridan', obj, {headers: headers}).subscribe((data: ResponseModel)=>{
        if(data.success){
          this.igradana = true;
          localStorage.setItem('igra_dana', "true");
          localStorage.setItem('datum', this.datum.toString());
        }
        else{
          localStorage.setItem('igra_dana', "false");
          this.message = "Igra dana za danasnji datum nije definisana!";
        }
      })
    }

    else if(this.igrastring == "true")this.igradana = true;
    else {
      this.message = "Igra dana za danasnji datum nije definisana!";
    }

    if(this.user){
      this.game.checkOdigrano(this.user, this.datum).subscribe((data: OdigranoInterface)=>{
        if(data){
          if(data.anagram != undefined ){
            const od ={
              igra: "Anagram",
              poeni: data.anagram
            }
            this.odigrane.push(od);
          }
          if(data.geografija != undefined ){
            const od ={
              igra: "Zanimljiva geografija",
              poeni: data.geografija
            }
            this.odigrane.push(od);
          }
          if(data.mojBroj != undefined){
            const od ={
              igra: "Moj broj",
              poeni: data.mojBroj
            }
            this.odigrane.push(od);
          }
        }
      });
      }
    }

  }

