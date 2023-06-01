import { Component, ElementRef, ViewChild ,ChangeDetectorRef } from '@angular/core';
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
  newPeers: Peer = new Peer();
  chattingMode = 'current';
  remoteUserConnection: DataConnection | undefined;
  @ViewChild('scrollMe')
  private myScrollContainer!: ElementRef;
  constructor(private cdr: ChangeDetectorRef,private authService: AuthService, private router: Router, public dialog: MatDialog, private fireStore: FirestoreService) {
    let currentUser: any = this.authService.getAuth().currentUser;
    currentUser.userName = currentUser?.email?.split('@')[0];
    this.currentUser = currentUser;

    this.newPeers.on('open', function (id) {
      fireStore.updatePeerId(currentUser.userName, id);
      console.log('My peer ID is: ' + id);
    });
    this.newPeers.on('connection', (data: DataConnection) => {
      console.log('got connection', data.peer);
      this.remoteUserConnection = data;
      data.on('data', (perrData: any) => {
        // here we get call from user
        console.log('got connection message', data.peer);
        this.chats.push({
          align: 'Left',
          message: perrData
        })
        this.cdr.detectChanges();
      })
    })
    this.newPeers.on('call', (data: MediaConnection) => {
      // here will notifiy user calls
      console.log(data);
    })
  }
  openDialog() {
    let dialogRef = this.dialog.open(ChatUsersComponent, { data: this.currentUser });
    dialogRef.afterClosed().subscribe(result => {
      this.remoteUserConnection = this.newPeers.connect(result);
      this.remoteUserConnection.on('data', (data: any) => {
        console.log('dataFrom remoteCOnnection', data);
        this.chats.push({
          align: 'Left',
          message: data
        })
        this.cdr.detectChanges();
      })
      console.log('The dialog was closed', result);
    });
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
    this.remoteUserConnection?.send(this.text);
    this.chats.push({
      align: 'Right',
      message: this.text
    })
    this.text = '';
  }
}
