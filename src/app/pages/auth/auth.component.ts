import { Component, inject } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc,setDoc , DocumentReference } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/_common/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  item$: Observable<any[]>;
  firestore: Firestore = inject(Firestore);
  userSubscription: Subscription;
  user: any;
  username = '';
  email = `haripatel@socialmedia.haripatel.dev`;
  password = '';
  password1 = '';
  gender = '';
  itemCollection = collection(this.firestore, 'users');
  section = 1;
  that:any = this;
  message = '';
  constructor(private authService:AuthService,private router:Router) {
    this.item$ = collectionData(this.itemCollection);
    this.userSubscription = this.authService.getUserObserver().subscribe((hello: any) => {
      this.user = hello;
      if(hello){
        this.router.navigate(['/dash/chat']);
      }
    })
  }
  checkUserExist(){
    this.authService.checkUserExists(this.username).then(data => (data == true) ? 2 : 3).then(finalres=>{
      console.log(finalres);
      this.section = finalres;
    })
  }
  signup() {
    if(this.password !=this.password1) {
      this.message = 'Password Not Matching';
      return;
    }
    this.authService.signUp(this.username, this.password).then(x => {
      console.log('registreed');
    }).catch(error=> {
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
          this.message ='Password is not strong enough. Add additional characters including special characters and numbers.';
          break;
        default:
          console.log(error.message);
          break;
      }
    })
  }
  signIn() {
    this.authService.signIn(this.username,this.password).then(x => {
      console.log('logged in ');
      this.router.navigate(['/dash/chat']);
    }).catch(y => {
      console.log(y);
    })
  }
  signOut() {
    this.authService.signOut()
  }
  addUserProfile(username: string) {
    if (!username) return;
    addDoc(this.itemCollection, <any>{
      hari: {
        aaa: 1
      }
    }).then((documentReference: DocumentReference) => {
      // the documentReference provides access to the newly created document
    });
     setDoc(doc(this.firestore, "myCollection", "hari"), {
      field1: "value1",
      field2: "value2"
    });
  }
  ngOnDestroy() {
    // when manually subscribing to an observable remember to unsubscribe in ngOnDestroy
    this.userSubscription.unsubscribe();
  }
}
