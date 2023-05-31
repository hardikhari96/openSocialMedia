import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/_common/firestore.service';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.css']
})
export class ChatUsersComponent {
  userData : any;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    fireStoreService: FirestoreService) {
    let userData = fireStoreService.getUserData('users',data.userName);
    userData.then(x=>{this.userData = x.data()})
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
