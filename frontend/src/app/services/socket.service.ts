import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;//socket that connects to socket.io server
  private poziv: number = 0;

  constructor() {}

  getTime(path: string){
    let observable = new Observable(observer => {
      this.socket = io('http://localhost:3000/'+path);
      this.socket.on('timer', (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }

  getBrojevi(){
    let observable = new Observable(observer => {
      this.socket = io('http://localhost:3000/games/mojbroj');
      this.socket.on('broj', (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }

  /*sendEvaluation(data: any){
    let observable = new Observable(observer => {
    this.socket = io('http://localhost:3000/games/evaluacija');
    console.log(data);
    this.socket.emit('poslato', data);
    this.socket.on('evaluira', (data) => {
        console.log(data.kategorija);
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }
  */

  disconnect(){
    if(this.socket != undefined)
    this.socket.close();
  }

  stop(){
    this.socket.emit('stop');
  }

}

