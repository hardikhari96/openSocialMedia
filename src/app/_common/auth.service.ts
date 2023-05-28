import { Injectable, inject } from '@angular/core';
import { Auth, user, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  commonEmail: string = '@socialmedia.haripatel.dev';
  constructor() { }
  getAuth(){
    return this.auth;
  }
  getUserObserver(){
    return this.user$;
  }
  signUp(userName: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, `${userName}${this.commonEmail}`, password);
  }
  signIn(userName: string, password: string) {
    return signInWithEmailAndPassword(this.auth, userName, password);
  }
  signOut() {
    this.auth.signOut()
  }
}
