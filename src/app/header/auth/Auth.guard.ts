import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthServiceService } from '../../Service/user-auth-service.service';
import { UserService } from '../../Service/user.service';

@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userAuthService:UserAuthServiceService,
    private router:Router,
    private userService:UserService
    ){}
  
  canActivate(route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

   if(this.userAuthService.getToken() !==null){
    const role = route.data['roles'] as Array<string>
    if(role){
     const match= this.userService.roleMatch(role)
     if(match){
      return true;
     }else{
      this.router.navigate(['/forbidden']);
      return false;
     }
    }
   }

   this.router.navigate(['login'])
   return false
  }



}
