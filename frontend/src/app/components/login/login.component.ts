import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginResponse } from '../../interfaces/login.response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe((data: LoginResponse )=> {
        if(data.success == false){
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/login']);
        }

        else {
          this.flashMessage.show('Successful login', {cssClass: 'alert-success', timeout: 3000});
          this.authService.storeUserData(data.token, data.user);
          if(data.user.type == 'admin') this.router.navigate(['/adminpage']);
          else if(data.user.type == 'user')this.router.navigate(['/games']);
          else if(data.user.type == 'supervisor') this.router.navigate(['/supervisor']);
        }

    });
  }
}
