import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../Service/user.service';
import { UserAuthServiceService } from '../Service/user-auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  
})
export class LoginComponent {

  constructor(
    private userService: UserService ,
    private userAuthService: UserAuthServiceService,
    private router: Router
  ) {}
 
  ngOnInit(): void {}

  message:string='';
  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);
          
        const role = response.user.role[0].roleName;
        if (role === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      (error) => {
        console.log(error);
        if(error.status === 401){
          this.message ='Invalid username or password';
        }

        setTimeout(()=>{
          this.clearSuccessMessage();
          this.router.navigate(['/login'])
        },1100);
        
      }
    );
  }

  clearSuccessMessage(): void {
    this.message = '';
  }
}
