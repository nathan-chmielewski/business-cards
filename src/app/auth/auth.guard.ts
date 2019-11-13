import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, map, take } from 'rxjs/operators';
import { auth } from 'firebase';
import * as firebase from 'firebase';
import { FirebaseAuth } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.authService.user.pipe(
        take(1),
        map((user) => !!user),
        tap((loggedIn) => {
          if (!loggedIn) {
            console.log('access denied');
            this.router.navigate(['/app-login']);
          }
        }),
      );
  }
}
