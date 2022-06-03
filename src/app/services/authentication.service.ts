import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Router } from '@angular/router';
import { catchError, EMPTY, finalize, from, Observable, tap } from 'rxjs';
import { Roles, User } from '../models/user-models';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _currentUser: firebase.default.User | undefined | null;
  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe((user) => {
      this._currentUser = user;
    })
  }
  get currentUserState() {
    return this.afAuth.authState;
  }
  get currentUser() {
    return this._currentUser;
    // return from(this.afAuth.currentUser).pipe(
    //   tap((user) => {
    //     if (user) {
    //       this._currentUser = user;
    //     }
    //   })
    // );
  }
  getUserInfo() {
    const userObj = JSON.parse(this._currentUser?.displayName as string);
    const entityNo = userObj.entityNo;
    const username = `${userObj.firstName} ${userObj.lastName}`;
    const role = userObj.entityNo === Roles.Doctor ? Roles.Doctor : Roles.Patient;
    return { username, role, entityNo };
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }
  // Sign up with email/password
  SignUp(email: string, password: string, userData: User) {
    return from(
      this.afAuth.createUserWithEmailAndPassword(email, password).then((u) => {
        return u.user?.updateProfile({ displayName: JSON.stringify(userData) });
      })
    );
  }
  // Sign out
  SignOut() {
    return from(this.afAuth.signOut());
  }
  
}
