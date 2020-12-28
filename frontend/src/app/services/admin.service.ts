import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  authToken: any;

  constructor(private http: HttpClient) { }

  getRegistrationRequests(){
    let headers = new HttpHeaders();
    this.loadToken();
    headers = headers.append('Authorization', this.authToken);
    return this.http.get('http://localhost:3000/users/regreq', {headers: headers});
  }

  loadToken(){
    this.authToken = localStorage.getItem('id_token');
  }

  approveRequest(user){
    let headers = new HttpHeaders();
    this.loadToken();
    const korisnik = {
        username: user.username
    }
    headers = headers.append('Authorization', this.authToken);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authorizeone', korisnik, {headers: headers});
  }

  denyRequest(user){
    let headers = new HttpHeaders();
    this.loadToken();
    const korisnik = {
      username: user.username
    }
    headers = headers.append('Authorization', this.authToken);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/denyrequest', korisnik, {headers: headers});
  }

}
