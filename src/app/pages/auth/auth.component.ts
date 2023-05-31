import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_common/auth.service';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/_common/firestore.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  userSubscription: Subscription;
  user: any;
  username = '';
  password = '';
  password1 = '';
  section = 1;
  message = '';
  that = this;
  constructor(private authService: AuthService, private fireStoreService: FirestoreService,private router: Router) {
    this.userSubscription = this.authService.getUserObserver().subscribe((data: any) => {
      if (data) {
        this.user = data;
        this.router.navigate(['/dash/chat']);
      }
    })
  }
  checkUserExist() {
    this.authService.checkUserExists(this.username).then(data => (data == true) ? 2 : 3).then(res => {
      this.section = res;
    })
  }
  signup() {
    if (this.password != this.password1) {
      this.message = 'Password Not Matching';
      return;
    }
    this.authService.signUp(this.username, this.password).then(x => {
      this.fireStoreService.updateData('users',this.username,{
        email: x.user.email,
        peerId: 'temp',
        friends: []
      }).then(x=>{
        this.router.navigate(['/dash/chat']);
      })
    }).catch(error => {
      switch (error.code) {
        case 'auth/email-already-in-use':
          this.message = `Email address already in use.`;
          break;
        case 'auth/invalid-email':
          this.message = `Email address  is invalid.`;
          break;
        case 'auth/operation-not-allowed':
          this.message = `Error during sign up.`;
          break;
        case 'auth/weak-password':
          this.message = 'Password is not strong enough. Add additional characters including special characters and numbers.';
          break;
        default:
          console.log(error.message);
          break;
      }
    })
  }
  signIn() {
    this.authService.signIn(this.username, this.password).then(x => {
      console.log('logged in ');
      this.router.navigate(['/dash/chat']);
    }).catch(y => {
      console.log(y);
    })
  }
  signOut() {
    this.authService.signOut()
  }
  ngOnDestroy() {
    // when manually subscribing to an observable remember to unsubscribe in ngOnDestroy
    this.userSubscription.unsubscribe();
  }
}
