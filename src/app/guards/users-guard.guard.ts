import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServService } from '../services/serv.service';
@Injectable({
  providedIn: 'root'
})
export class UsersGuardGuard implements CanActivate {
  constructor(private serv:ServService,private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.serv.getUserData().userType==='employee'){
        alert('You are not authorized');
        this.router.navigate(["/dashboard"]);
        return false;
    }
    return true;
  }
  
}
