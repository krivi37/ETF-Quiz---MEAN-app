import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  constructor(private http: HttpClient) { }

  checkJMBG(username: String, JMBG: Number){
    const obj = {
      username: username,
      JMBG: JMBG
    }

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/forgottenpassword', obj, {headers: headers});
    
  }

  getSecretQuestion(username:String){
    const obj = {
      username: username
    }
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/getquestion', obj, {headers: headers});
  }

  checkAnswer(username: string, answer: string){
    const obj = {
      username: username,
      answer: answer
    }

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/questioncheck', obj, {headers: headers});

  }

  resetPassword(username: string, newpass: string){
    const obj = {
      username: username,
      newpass: newpass
    }
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/resetpassword', obj, {headers: headers});
  }


  checkOldPassword(username:string, oldPass: string){
    const obj = {
      username: username,
      oldpass: oldPass
    }

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/checkpassword', obj, {headers: headers});

  }

}
