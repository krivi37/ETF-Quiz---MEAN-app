import { Component, OnInit } from '@angular/core';
import { PasswordResetService } from '../../services/password-reset.service';
import { ResponseModel } from 'src/app/interfaces/response.model';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService} from '../../services/validate.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

    newPassword: string;

  constructor(private passReset: PasswordResetService, private router: Router, private flashMessage: FlashMessagesService, private validateService: ValidateService) { }

  ngOnInit() {
  }

  resetPassword(){
    let username: string = localStorage.getItem('username');
    if(this.newPassword == undefined || this.newPassword == "") {
      this.flashMessage.show('Morate unijeti novu sifru', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validateService.validatePassword(this.newPassword)){
      this.flashMessage.show('Lozinka mora da sadrzi najmanje 3 mala slova, jedno veliko, jedan specijalni znak, jedan broj i mora biti duzine 8-12 karaktera', {cssClass: 'alert-danger', timeout: 3000})
      return false;
    }

    this.passReset.resetPassword(username, this.newPassword).subscribe((data: ResponseModel) => {
      if(data.success==true){
        this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 3000});
        localStorage.clear();
        this.router.navigate(['../home']);
      }
    });
  }
  

}
