import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateFields(user){
    if(user.name == undefined || user.surname == undefined || 
      user.occupation == undefined || user.email == undefined || user.gender == undefined ||
      user.secretA == undefined || user.secretQ == undefined || user.username == undefined || user.password == undefined ||
      user.JMBG == undefined) return false;
    else return true;
  }

  validatePassword(password){
    var regex = /^(?=[a-zA-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,11}$/
    return regex.test(String(password));
  }

  validateJMBG(JMBG){
    if(JMBG.length != 13) return false;
    var niz: number[] = [];
    var i;
    for(i = 0; i< 12 ; i++){
      niz[i] = JMBG.charAt(i);
    }
    var j = 7;
    var sum = 0;
    for(i = 0; i < 12; i++){
      sum+= j*niz[i];
      j--;
      if (j == 1) j = 7;
    }

    if(sum%11 > 1){
      sum = 11 -sum%11;
      if(sum == JMBG.charAt(12)) return true;
      else return false;
    }
    else if (sum%11 == 0) return true;
    else return false;

  }

  validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
