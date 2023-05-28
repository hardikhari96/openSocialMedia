import { Component, inject } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc,setDoc , DocumentReference } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { Auth, user, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AuthService } from 'src/app/_common/auth.service';

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
  gender = '';
  itemCollection = collection(this.firestore, 'users');

  constructor(private authService:AuthService) {
    this.item$ = collectionData(this.itemCollection);
    this.userSubscription = this.authService.getUserObserver().subscribe((hello: any) => {
      this.user = hello;
      console.log(hello);
    })
  }
  signup() {
    this.authService.signUp(this.email, 'Hello@1234').then(x => {
      console.log('registreed');
    }).catch(y => {
      console.log(y);
    })
  }
  signIn() {
    this.authService.signIn(this.email, 'Hello@1234').then(x => {
      console.log('logged in ');
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
