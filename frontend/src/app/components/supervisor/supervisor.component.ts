import { Component, OnInit } from '@angular/core';
import { SupervisorService } from '../../services/supervisor.service';
import { anagramModel } from 'src/app/interfaces/anagram.interface';
import { ResponseModel } from 'src/app/interfaces/response.model';
import { FlashMessagesService} from 'angular2-flash-messages';
import { EvalInterface } from 'src/app/interfaces/evaluacija.interface';


@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})
export class SupervisorComponent implements OnInit {

  anagrami: anagramModel[] = [];
  postavka: string;
  rjesenje: string;
  evaluacija: EvalInterface[] = [];
  constructor(private supervisorService: SupervisorService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.dohvatiEvaluacije();
  }

  dohvatiEvaluacije(){
    this.evaluacija = [];
    var i;
    this.supervisorService.dohvatiPotrebneEvaluacije().subscribe((data:EvalInterface[])=>{
      for (i = 0; i<data.length;i++){
        const obj = {
          username: data[i].username,
          datum: data[i].datum,
          za_eval: data[i].za_eval
        }
        this.evaluacija.push(obj);
      }
    })
  }

  pregledajAnagrame(){
    this.anagrami = [];
    this.supervisorService.getAnagrami().subscribe((data: anagramModel[])=>{
      var i;
      for (i = 0; i < data.length; i++){
        this.anagrami.push(data[i]);
      }
    });
  }

  unesiAnagram(){
    this.supervisorService.unesiAnagram(this.postavka, this.rjesenje).subscribe((data: ResponseModel)=>{
      if(data){
        this.flashMessage.show('Uspjesno unesen anagram', {cssClass: 'alert-success', timeout: 3000})
      }
    })

  }

  odobriPojam(pojam: string, username: string, kategorija: string, datum: Date){
    
    this.supervisorService.odobri(pojam,username,kategorija,datum).subscribe((data)=>{
      console.log("success");
      this.dohvatiEvaluacije();
    })
  }

  ponistiPojam(pojam: string, username: string, kategorija: string, datum: Date){
    this.supervisorService.ponisti(pojam,username,kategorija,datum).subscribe((data)=>{
      console.log("success");
      this.dohvatiEvaluacije();
    })
  }


}
