import { Component, OnInit } from '@angular/core';
import { FlashMessagesService} from 'angular2-flash-messages';
import { ValidateService} from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ResponseModel } from '../../interfaces/response.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;
  surname: String;
  occupation: String;
  gender: String;
  secretQ: String;
  secretA: String;
  JMBG: String;
  type: String;

  constructor(private flashMessage: FlashMessagesService,
              private validateService: ValidateService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){

    const user = {
      name: this.name,
      surname: this.surname,
      occupation: this.occupation,
      email: this.email,
      gender: this.gender,
      secretA: this.secretA,
      secretQ: this.secretQ,
      username: this.username,
      password: this.password,
      JMBG: this.JMBG,
      type: "user"
      }

      if(!this.validateService.validateFields(user)){
        this.flashMessage.show('Popunite sva polja', {cssClass: 'alert-danger', timeout: 3000})
        return false;
      }

      if(!this.validateService.validatePassword(this.password)){
        this.flashMessage.show('Lozinka mora da sadrzi najmanje 3 mala slova, jedno veliko, jedan specijalni znak, jedan broj i mora biti duzine 8-12 karaktera', {cssClass: 'alert-danger', timeout: 3000})
        return false;
      }

      if(!this.validateService.validateEmail(this.email)){
        this.flashMessage.show('Email nije u dobrom formatu', {cssClass: 'alert-danger', timeout: 3000});
        return false;
        
    }

    if(!this.validateService.validateJMBG(this.JMBG)){
      this.flashMessage.show('JMBG pogresan', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Register user
    this.authService.registerUser(user).subscribe((data: ResponseModel) => {
      if(data.success){
        this.flashMessage.show('Zahtjev je poslat, admin ce pogledati uskoro', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      }
      else{
        if(data.msg == 'User registration pending'){
          this.flashMessage.show('Ceka se na odobrenje admina', {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/home']);
        }
        else if(data.msg == 'User request not approved'){
          this.flashMessage.show('Vas zahtjev za registracijom nije odobren', {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/home']);
        }
        else {
          this.flashMessage.show('Korisnik sa tim korisnickim imenom vec postoji', {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/register']);
        }
      }
    });

  }

}
