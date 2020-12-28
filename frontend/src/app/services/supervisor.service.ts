import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {

  constructor(private http: HttpClient) { }


  getAnagrami(){
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/games/getanagrami',{headers: headers});
  }

  unesiAnagram(postavka: string, rjesenje: string){
    const obj = {
      postavka: postavka,
      rjesenje: rjesenje
    }
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/games/unesianagram', obj, {headers: headers});
  }

  dohvatiPotrebneEvaluacije(){
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/games/geteval',{headers: headers});
  }

  odobri(pojam: string, username: string, kategorija: string, datum: Date){
    const obj = {
      username: username,
      datum: datum,
      pojam: pojam,
      kategorija: kategorija
    }

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/games/odobri', obj, {headers: headers});

  }

  ponisti(pojam: string, username: string, kategorija: string, datum: Date){
    const obj = {
      username: username,
      datum: datum,
      pojam: pojam,
      kategorija: kategorija
    }

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/games/ponisti', obj, {headers: headers});

  }

}
