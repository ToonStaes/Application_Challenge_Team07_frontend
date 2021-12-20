import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    return this.checkRoute();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    return this.checkRoute();
  }

  // canActivateAsAdmin(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): boolean | UrlTree {
  //   return this.checkRouteAndAdmin();
  // }

  // canActivateChildAsAdmin(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): boolean | UrlTree {
  //   return this.checkRouteAndAdmin();
  // }

  // canActivateAsSuperAdmin(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): boolean | UrlTree {
  //   return this.checkRouteAndSuperAdmin();
  // }

  // canActivateChildAsSuperAdmin(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): boolean | UrlTree {
  //   return this.checkRouteAndSuperAdmin();
  // }

  checkRoute(): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }

  // checkRouteAndAdmin(): boolean | UrlTree {
  //   let userID = localStorage.getItem('id')
  //   if (userID != null){
  //     this.userService.getUserById(userID!).subscribe((user) => {
  //       if (this.authService.isLoggedIn() && (user.isAdmin || user.isSuperAdmin)) {
  //         return true;
  //       } else {
  //         return this.router.parseUrl('/login');
  //       }
  //     }, (error) => {
  //       return this.router.parseUrl('/login');
  //     })
  //   }
  //   else{
  //     return this.router.parseUrl('/login');
  //   }
  // }
}
