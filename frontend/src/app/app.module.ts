import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { HttpClientModule} from '@angular/common/http';
import { JwtModule, JwtHelperService } from "@auth0/angular-jwt";
import { AuthguardService } from './services/authguard.service';
import { SocketService} from './services/socket.service';
import { GameService} from './services/gameservice.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { RegRequestsComponent } from './components/reg-requests/reg-requests.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { GameofthedayComponent } from './components/gameoftheday/gameoftheday.component';
import { ForgottenpassComponent } from './components/forgottenpass/forgottenpass.component';
import { PasswordResetService } from './services/password-reset.service';
import { SecretquestionComponent } from './components/secretquestion/secretquestion.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { GuestpageComponent } from './components/guestpage/guestpage.component';
import { GamesComponent } from './components/games/games.component';
import { IgradanaComponent } from './components/igradana/igradana.component';
import { SupervisorComponent } from './components/supervisor/supervisor.component';
import { AnagramComponent } from './components/anagram/anagram.component';
import { MojbrojComponent } from './components/mojbroj/mojbroj.component';
import { GeografijaComponent } from './components/geografija/geografija.component';
import {SupervisorService} from './services/supervisor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ScoreboardComponent,
    RegRequestsComponent,
    AdminpageComponent,
    GameofthedayComponent,
    ForgottenpassComponent,
    SecretquestionComponent,
    ResetpasswordComponent,
    ChangepasswordComponent,
    GuestpageComponent,
    GamesComponent,
    IgradanaComponent,
    SupervisorComponent,
    AnagramComponent,
    MojbrojComponent,
    GeografijaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FlashMessagesModule,
    HttpClientModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('id_token');
        }
      }
    })
  ],
  providers: [ValidateService, FlashMessagesService, AuthService, JwtHelperService,AuthguardService, PasswordResetService, SocketService, GameService, SupervisorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
