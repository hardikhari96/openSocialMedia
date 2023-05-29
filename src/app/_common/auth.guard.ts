import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,  Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService:AuthService,private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.getUserObserver().pipe(
      take(1),
      map(user => {
        if (user) {
          // User is authenticated, allow access
          return true;
        } else {
          // User is not authenticated, redirect to login page
          return this.router.createUrlTree(['/auth']);
        }
      })
    );
  }

}
