import { Component } from '@angular/core';
import { UserAuthServiceService } from '../Service/user-auth-service.service';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private userAuthService:UserAuthServiceService,
    private router:Router,
    public userService :UserService
    ){

  }

  loggedIn(){
    return this.userAuthService.isLoggedIn();
  }

  logOut(){
    this.userAuthService.clear();
    this.router.navigate(['/home'])
  }
}
