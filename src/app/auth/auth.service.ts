import { Subject } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

export class AuthServivce {
  authChange = new Subject<boolean>();
  private user: User;

  registerUser(authData: AuthData) {
    // Mocking a register user response for now
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authChange.next(true);
  }

  login(authData: AuthData) {
    // Now using the same data as register as a mock
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authChange.next(true);
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

}
