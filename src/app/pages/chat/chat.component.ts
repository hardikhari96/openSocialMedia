import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_common/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ChatUsersComponent } from 'src/app/_components/chat-users/chat-users.component';
import { DataConnection, MediaConnection, Peer } from "peerjs";
import { FirestoreService } from 'src/app/_common/firestore.service';

interface chats {
  message: string,
  align: string
}
interface Peers {
  _id: number;
  // other properties
}


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  text: string = '';
  currentUser: any = {};
  chats: chats[] = []
  @ViewChild('scrollMe')
  private myScrollContainer!: ElementRef;
  constructor(private authService: AuthService, private router: Router, public dialog: MatDialog,private fireStore:FirestoreService) {
    // console.log(this.authService.getAuth().currentUser?.email?.split('@')[0]);
    let currentUser: any = this.authService.getAuth().currentUser;
    currentUser.userName = currentUser?.email?.split('@')[0];
    this.currentUser = currentUser;
    let newPeers :Peer= new Peer();
    newPeers.on('open', function (id) {
      fireStore.updatePeerId(currentUser.userName,id);
      console.log('My peer ID is: ' + id);
    });
    newPeers.on('connection', (data: DataConnection) => {
      console.log(data, newPeers);
      data.on('data',(perrData)=>{
        console.log(`perrData`,perrData);
      })
    })
    newPeers.on('call', (data: MediaConnection) => {
      console.log(data);
    })
  }
  openDialog() {
    this.dialog.open(ChatUsersComponent, { data: this.currentUser });
  }
  signOut() {
    this.authService.signOut();
    this.router.navigate(['/']);
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  sentChat() {
    this.chats.push({
      align: 'Right',
      message: this.text
    })
    this.text = '';
  }
}
