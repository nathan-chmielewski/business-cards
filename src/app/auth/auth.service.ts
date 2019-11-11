import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    user: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth) {
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

  logout() {
    this.angularFireAuth
    .auth
    .signOut();
  }
}
