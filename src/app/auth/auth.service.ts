import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    user: Observable<firebase.User>;
    isLoggedIn: boolean = false;

  constructor(public angularFireAuth: AngularFireAuth, private router: Router) {
    this.user = angularFireAuth.authState;
   }

  login(email: string, password: string) {
    this.angularFireAuth
    .auth
    .signInWithEmailAndPassword(email, password)
    .then(value => {
      console.log('Successfully signed in!');
      this.router.navigate(['/app-dashboard']);
      this.isLoggedIn = true;
    })
    .catch(err => {
      console.log('Incorrect credentials:', err.message);
    });
  }

  logout() {
    this.isLoggedIn = false;
    this.angularFireAuth
    .auth
    .signOut();
  }
}
