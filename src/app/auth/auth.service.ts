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

  constructor(public angularFireAuth: AngularFireAuth, private router: Router) {
    this.user = angularFireAuth.authState;
   }

  login(email: string, password: string) {
    this.angularFireAuth
    .auth
    .signInWithEmailAndPassword(email, password)
    .then(value => {
      console.log('Successfully signed in!');
    })
    .catch(err => {
      console.log('Incorrect credentials:', err.message);
    });
  }

  isLoggedIn() {
    // return this.angularFireAuth.authState.pipe(first());
  }

  logout() {
    this.angularFireAuth
    .auth
    .signOut();
  }
}
