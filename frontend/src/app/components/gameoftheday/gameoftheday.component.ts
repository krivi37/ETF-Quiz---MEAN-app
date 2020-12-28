import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { anagramModel } from 'src/app/interfaces/anagram.interface';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gameoftheday',
  templateUrl: './gameoftheday.component.html',
  styleUrls: ['./gameoftheday.component.css']
})
export class GameofthedayComponent implements OnInit {

  dates: Date[];
  anagrami: anagramModel[] = [];
  model: NgbDateStruct;
  date: {year: number, month: number, day: number};

  constructor(private http: HttpClient, private calendar: NgbCalendar) { }

  ngOnInit() {
  }

  odaberiAnagram(anagram: any){
    const datum: Date = new Date(this.model.year, this.model.month-1, this.model.day);
    console.log(datum);
    const obj =  {
      datum: datum,
      anagram: anagram
    }
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.http.post('http://localhost:3000/games/setigradana', obj, {headers: headers}).subscribe((data) => {
      if(data){
        console.log('success');
      }
    });

  }

  dovuciAnagrame(){
    this.getAnagrami().subscribe((data: anagramModel[])=>{
      var i;
      for (i = 0; i < data.length; i++){
        this.anagrami.push(data[i]);
      }
    });
  }

  getAnagrami(){
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/games/getanagrami',{headers: headers});
  }

}
