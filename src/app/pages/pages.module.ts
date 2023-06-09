import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { BasicModule } from '../_common/basic.module';
import { RouterModule, Routes } from '@angular/router';
import { ChatUsersComponent } from '../_components/chat-users/chat-users.component';
import { FriendListComponent } from './friend-list/friend-list.component';

const routes: Routes = [
  {
    path:'chat',
    component: ChatComponent
  },
  {
    path:'friends',
    component: FriendListComponent
  },
];

@NgModule({
  declarations: [
    ChatUsersComponent,
    ChatComponent,
    FriendListComponent,
  ],
  imports: [
    CommonModule,
    BasicModule,
    RouterModule.forChild(routes)
  ],
})
export class PagesModule { }
