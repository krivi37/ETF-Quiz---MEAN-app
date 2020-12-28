import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { TimerInterface } from 'src/app/interfaces/timer';
import { GameService } from '../../services/gameservice.service';
import { GameResponseModel } from 'src/app/interfaces/gameresponse';
import { UserInterface } from 'src/app/interfaces/userinterface';
import { ResponseModel } from 'src/app/interfaces/response.model';
import { OdigranoInterface } from 'src/app/interfaces/odigrano.interface';

@Component({
  selector: 'app-anagram',
  templateUrl: './anagram.component.html',
  styleUrls: ['./anagram.component.css']
})
export class AnagramComponent implements OnInit {

  time: number;
  postavka: string;
  rjesenje: string;
  vrijednost: any;
  message: string;
  user: UserInterface;
  datum: Date;
  odigrano: boolean = true;

  constructor(private socket: SocketService, private game: GameService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    var date = localStorage.getItem('datum');
    this.datum = new Date(date);
    if(this.user){
    this.game.checkOdigrano(this.user, this.datum).subscribe((data: OdigranoInterface)=>{
      if(data == undefined) this.odigrano = false; 
      else if(data.anagram ==undefined) this.odigrano = false;
      else {
        this.odigrano = true;
        this.message = "Vec ste igrali anagram danas!";
      }});
    }
    else this.odigrano = false;
  }

  ngOnDestroy(){
    this.socket.disconnect();
    if(this.vrijednost != undefined) this.vrijednost.unsubscribe();
    if(this.user != undefined && this.odigrano == false)this.game.sendPoints(this.user, this.datum, 'anagram', localStorage.getItem('poeni anagram')).subscribe((data: ResponseModel)=>{
      console.log(data.msg);
    });
    
  }

  startAnagram(){
      this.vrijednost = this.game.getAnagram(this.datum).subscribe((data: string) => {
      console.log(data);
      this.postavka = data;
      this.socket.getTime('games/anagram').subscribe((data: TimerInterface)=>{
      this.time = data.countdown;
      if(this.time == 0){
        this.socket.disconnect();
        this.game.sendAnagram(this.postavka, this.rjesenje).subscribe((data: GameResponseModel) => {
            this.message = data.msg;
            localStorage.setItem('poeni anagram', data.points);
        })
      }
    })
  });
  }

  sendRjesenje(){
    this.game.sendAnagram(this.postavka, this.rjesenje).subscribe((data: GameResponseModel) => {
      if(data.success == false){
        this.message = "Pokusajte ponovo!";
      }
      else{
        this.socket.disconnect();
        this.message = "Tacan odgovor!";
        localStorage.setItem('poeni anagram', data.points);
      }
  })
  }
}
