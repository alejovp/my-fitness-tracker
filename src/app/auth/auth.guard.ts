import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthServivce } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthServivce, private router: Router) {}

  canActivate() {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
