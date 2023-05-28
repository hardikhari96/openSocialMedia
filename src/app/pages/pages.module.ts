import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { BasicModule } from '../_common/basic.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'chat',
    component: ChatComponent
  }
];

@NgModule({
  declarations: [
    ChatComponent,
  ],
  imports: [
    CommonModule,
    BasicModule,
    RouterModule.forChild(routes)
  ],
})
export class PagesModule { }
