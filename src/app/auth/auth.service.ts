import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    user: Observable<firebase.User>;
    isLoggedIn: boolean = false;
    userId: string = '1';
    firebaseUserUid: string;
    errorMessage: string = '';

  constructor(public angularFireAuth: AngularFireAuth, private router: Router) {
    this.user = angularFireAuth.authState;
   }

  login(email: string, password: string) {
    this.angularFireAuth
    .auth
    .signInWithEmailAndPassword(email, password)
    .then(response => {
      console.log('Successfully signed in!');
      this.isLoggedIn = true;
    //   this.userId = value.user.uid;
      console.log(response.user.uid);
      this.firebaseUserUid = response.user.uid;
      this.router.navigate(['/app-dashboard']);
      this.errorMessage = '';
    })
    .catch(err => {
      this.errorMessage = err.message;
      console.log('Incorrect credentials:', err.message);
    });
  }

  logout() {
    this.angularFireAuth
    .auth
    .signOut()
    .then(() => {
      console.log('Successfully signed out!');
      this.router.navigate(['/app-login']);
      this.isLoggedIn = false;
    })
    .catch(err => {
      console.log('Error when attempting to log out: ', err.message);
    });
  }
}
