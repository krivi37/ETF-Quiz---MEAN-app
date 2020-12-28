import { Component, OnInit } from '@angular/core';
import { PasswordResetService } from '../../services/password-reset.service';
import { ResponseModel } from 'src/app/interfaces/response.model';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService} from '../../services/validate.service';
import { LoginResponse } from 'src/app/interfaces/login.response.model';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

    oldPass: string;
    newPass1: string;
    newPass2: string;
    izvrseno: boolean = false;

  constructor(private passReset: PasswordResetService, private router: Router, private flashMessage: FlashMessagesService, private validateService: ValidateService) { }

  ngOnInit() {
  }

  changePassword(){
      if(this.newPass1 != this.newPass2) {
        this.flashMessage.show('Nove sifre se ne poklapaju!', {cssClass: 'alert-danger', timeout: 3000});
        return false;
      }

      if(!this.validateService.validatePassword(this.newPass1)){
        this.flashMessage.show('Lozinka mora da sadrzi najmanje 3 mala slova, jedno veliko, jedan specijalni znak, jedan broj i mora biti duzine 8-12 karaktera', {cssClass: 'alert-danger', timeout: 3000})
        return false;
      }

      var user = localStorage.getItem('user');
      var username = JSON.parse(user).username;

      this.passReset.checkOldPassword(username, this.oldPass).subscribe((data: LoginResponse) => {
        if(data.success == false){
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
          return false;
        }

        else {

          this.passReset.resetPassword(username, this.newPass1).subscribe((data: ResponseModel) => {
          if(data.success){
            this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 3000});
            localStorage.clear();
            this.izvrseno = true;
          }
          });
        }

      })
  }

}
