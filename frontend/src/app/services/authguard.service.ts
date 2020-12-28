import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private router: Router,
    private authservice: AuthService) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const userType = this.authservice.getUserType();
    if (this.authservice.loggedIn() && this.authservice.isAuthorized(route.data.allowedRoles)) {
        return true;
    }

    this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
    return false;
    
  }  
}
