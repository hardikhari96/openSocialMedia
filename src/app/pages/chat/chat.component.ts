import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_common/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  constructor(private authService:AuthService,private router:Router){}
  signOut(){
    this.authService.signOut();
    this.router.navigate(['/']);
  }
}
