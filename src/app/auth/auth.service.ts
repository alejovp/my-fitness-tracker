import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthServivce {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {}

  registerUser(authData: AuthData) {
    // Mocking a register user response for now
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authOk();
  }

  login(authData: AuthData) {
    // Now using the same data as register as a mock
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authOk();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
  }

  getUser() {
    return {
      ...this.user
    };
  }

  isAuth() {
    return this.user !== null;
  }

  authOk() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

}
