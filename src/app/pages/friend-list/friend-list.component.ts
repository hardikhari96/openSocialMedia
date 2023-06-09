import { Component,OnDestroy } from '@angular/core';
import { Observable, Subscription, map, take } from 'rxjs';
import { AuthService } from 'src/app/_common/auth.service';
import { FirestoreService } from 'src/app/_common/firestore.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css'],
})
export class FriendListComponent implements OnDestroy{
  userData : any;
  userSubscription:Subscription;
  constructor(private fireStoreService: FirestoreService,private authService:AuthService){
    this.userSubscription  = this.authService.getUserObserver().subscribe((x)=>{
      console.log(x);
      let email :string | undefined = x?.email?.split('@')[0];
      if(typeof email == 'string'){
        let userData = fireStoreService.getUserData('users',email);
         userData.then(x=>{this.userData = x.data()})
      }
    })


//     .pipe(
//       take(1),
//       map(user=>{
// console.log(user);

//         // let userData = fireStoreService.getUserData('users',user.userName);
//         // userData.then(x=>{this.userData = x.data()})
//       })
//     )
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
