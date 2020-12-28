import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PasswordResetService } from '../../services/password-reset.service';
import { ResponseModel } from 'src/app/interfaces/response.model';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  reset: Boolean = false;
  username: String;
  JMBG: Number;
  constructor(private auth: AuthService, private passReset: PasswordResetService, private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  resetPassword(){
    this.passReset.checkJMBG(this.username, this.JMBG).subscribe((data: ResponseModel) => {
      if(!data.success) this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
      else {
        var username: string = String(this.username);
        localStorage.setItem('username', username);
        this.router.navigate(['../secretquestion']);
      }
    });
  }

}
