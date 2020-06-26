import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = new BehaviorSubject(false);

  constructor(
    public router: Router
  ) {
    this.ifLoggedIn();
  }

  ifLoggedIn() {
    if (JSON.parse(localStorage.getItem('profile'))) {
      this.authState.next(true);
    }
  }

  checkAuthenticated() {
    return this.authState.value;
  }

  login(profile, token) {
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('token', token);
    this.authState.next(true);
    this.router.navigate(['home']);
  }
 
  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
