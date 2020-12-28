import { Component, OnInit } from '@angular/core';
import { PasswordResetService } from '../../services/password-reset.service';
import { ResponseModel } from 'src/app/interfaces/response.model';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-secretquestion',
  templateUrl: './secretquestion.component.html',
  styleUrls: ['./secretquestion.component.css']
})
export class SecretquestionComponent implements OnInit {
    secretQ: string;
    secretA: string;
    username: string;
  constructor(private passReset: PasswordResetService, private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.passReset.getSecretQuestion(this.username).subscribe((data: ResponseModel) => {
      this.secretQ = data.msg;
    })
  }

  checkAnswer(){
    this.passReset.checkAnswer(this.username, this.secretA).subscribe((data:ResponseModel) => {
      if(data.success == false){
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        localStorage.clear();
        this.router.navigate(['../home']);
      }
      else this.router.navigate(['../resetpassword']);
    })
  }

}
