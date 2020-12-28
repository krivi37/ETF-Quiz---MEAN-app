import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { anagramModel } from '../interfaces/anagram.interface';
import {AuthService} from '../services/auth.service';
import { LoginResponse } from '../interfaces/login.response.model';
import { UserInterface } from '../interfaces/userinterface';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  authToken: string;

  constructor(private http: HttpClient) { }

  loadToken(){
    this.authToken = localStorage.getItem('id_token');
  }

  sendPoints(user: UserInterface, datum: Date, igra: string, poeni: string){
    let headers = new HttpHeaders();
    this.loadToken();
    const data = {
      ime: user.name,
      prezime: user.surname,
      username: user.username,
      datum: datum,
      igra: igra,
      poeni: poeni
    }
    headers = headers.append('Authorization', this.authToken);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/games/sendpoints', data, {headers: headers});
  }

  getAnagram(datum: Date){
    const obj ={
      datum: datum
    }
    let headers = new HttpHeaders();
    return this.http.post('http://localhost:3000/games/anagram', obj, {headers: headers});
  }

  sendAnagram(postavka: string, rjesenje: string){
    let headers = new HttpHeaders();
    if(rjesenje == undefined) rjesenje = "";
    let anagram ={
      postavka: postavka,
      rjesenje: rjesenje
    }
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/games/anagramcheck', anagram, {headers: headers});
  }

  checkPojmovi(pojmovi: any, kategorija: string){
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    var data = {
      tip: kategorija,
      pojmovi: pojmovi
    }
    return this.http.post('http://localhost:3000/games/geografija', data, {headers: headers});
  }

  sendForEvaluation(data: any){
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/games/evaluacija', data, {headers: headers} );
  }

  checkOdigrano(user: any, datum: Date){
    const obj = {
      username: user.username,
      datum: datum
    }
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/games/odigrano', obj, {headers: headers} );
  }

}
