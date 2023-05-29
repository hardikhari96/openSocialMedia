import { Injectable, inject } from '@angular/core';
import { Auth, user, createUserWithEmailAndPassword, signInWithEmailAndPassword ,fetchSignInMethodsForEmail} from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  commonEmail: string = '@socialmedia.haripatel.dev';
  constructor() { }

  async checkUserExists(user:string){
    user = `${user}${this.commonEmail}`;
    return (await fetchSignInMethodsForEmail(this.auth,user)).length > 0;
  }
  getAuth(){
    return this.auth;
  }
  getUserObserver(){
    return this.user$;
  }
  signUp(userName: string, password: string) {
    userName = `${userName}${this.commonEmail}`;
    return createUserWithEmailAndPassword(this.auth, userName, password);
  }
  signIn(userName: string, password: string) {
    userName = `${userName}${this.commonEmail}`;
    return signInWithEmailAndPassword(this.auth, userName, password);
  }
  signOut() {
    this.auth.signOut()
  }
}
