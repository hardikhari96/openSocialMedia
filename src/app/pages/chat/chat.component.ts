import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_common/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ChatUsersComponent } from 'src/app/_components/chat-users/chat-users.component';

interface chats {
  message:string,
  align : string
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  text : string = '';
  chats : chats[] = [
    {
      align : 'Right',
      message : "Hello."
    },
    {
      align : 'Left',
      message : "Hi, How Are you"
    },
    {
      align : 'Right',
      message : "I am fine and you ?"
    },
    {
      align : 'Right',
      message : "I am fine and you ?"
    },
    {
      align : 'Right',
      message : "I am fine and you ?"
    },
    {
      align : 'Right',
      message : "I am fine and you ?"
    },
    {
      align : 'Right',
      message : "I am fine and you ?"
    },
    {
      align : 'Right',
      message : "I am fine and you ?"
    },
    {
      align : 'Right',
      message : "I am fine and you ?"
    },
    {
      align : 'Right',
      message : "I am fine and you ?"
    },
    {
      align : 'Right',
      message : "I am fine and you ?"
    },
    {
      align : 'Right',
      message : "I am fine and you ?"
    },
    {
      align : 'Right',
      message : "I am fine and you ?"
    },
    {
      align : 'Right',
      message : "I am fine and you ?"
    },
    {
      align : 'Right',
      message : "I am fine and you ?"
    },
    {
      align : 'Right',
      message : "I am fine and you ?"
    }
  ]
  @ViewChild('scrollMe')
  private myScrollContainer!: ElementRef;
  constructor(private authService: AuthService, private router: Router, public dialog: MatDialog) { }
  openDialog() {
    this.dialog.open(ChatUsersComponent);
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

  sentChat(){
    this.chats.push({
      align : 'Right',
      message : this.text
    })
    this.text = '';
  }
}
