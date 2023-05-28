import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
  {
    path:'',
    component: LandingComponent
  },
  {
    path:'auth',
    component: AuthComponent
  },
  {
    path: 'dash',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
