import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { RegRequestsComponent } from './components/reg-requests/reg-requests.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { GameofthedayComponent } from './components/gameoftheday/gameoftheday.component';
import { AuthguardService } from './services/authguard.service';
import { SecretquestionComponent } from './components/secretquestion/secretquestion.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { GuestpageComponent } from './components/guestpage/guestpage.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { GamesComponent } from './components/games/games.component';
import { SupervisorComponent } from './components/supervisor/supervisor.component';
import { IgradanaComponent } from './components/igradana/igradana.component';
import { AnagramComponent } from './components/anagram/anagram.component';
import { MojbrojComponent } from './components/mojbroj/mojbroj.component';
import { GeografijaComponent } from './components/geografija/geografija.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'scoreboard', component: ScoreboardComponent, data:{allowedRoles: 'user'}, canActivate: [AuthguardService]},
  {path: 'reg-requests', component: RegRequestsComponent, data:{allowedRoles: 'admin'}, canActivate: [AuthguardService]},
  {path: 'home', component: HomeComponent},
  {path: 'adminpage', component: AdminpageComponent, data:{allowedRoles: 'admin'}, canActivate: [AuthguardService]},
  {path: 'gameoftheday', component: GameofthedayComponent, data:{allowedRoles: 'admin'}, canActivate: [AuthguardService]},
  {path: 'secretquestion', component: SecretquestionComponent},
  {path: 'resetpassword', component: ResetpasswordComponent},
  {path: 'changepassword', component: ChangepasswordComponent, data:{allowedRoles: ['admin', 'user', 'supervisor']}, canActivate: [AuthguardService]},
  {path: 'guestpage', component: GuestpageComponent},
  {path: 'games', component: GamesComponent},
  {path: 'supervisor', component: SupervisorComponent},
  {path: 'igradana', component: IgradanaComponent},
  {path: 'anagram', component: AnagramComponent},
  {path: 'mojbroj', component: MojbrojComponent},
  {path: 'geografija', component: GeografijaComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
