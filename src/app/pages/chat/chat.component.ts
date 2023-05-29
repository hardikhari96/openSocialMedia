import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_common/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ChatUsersComponent } from 'src/app/_components/chat-users/chat-users.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  constructor(private authService: AuthService, private router: Router, public dialog: MatDialog) { }
  openDialog() {
    this.dialog.open(ChatUsersComponent);
  }
  signOut() {
    this.authService.signOut();
    this.router.navigate(['/']);
  }
}
