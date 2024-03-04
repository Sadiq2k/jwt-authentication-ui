import { Component } from '@angular/core';
import { UserService } from '../Service/user.service';
import { NgForm } from '@angular/forms';
import { UserAuthServiceService } from '../Service/user-auth-service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
 

  constructor(private userService:UserService,
    private userAuthService: UserAuthServiceService,
    private router: Router
    ){}

    // signUp(signUpForm: NgForm): void {
    //   try {
    //     this.userService.signUp(signUpForm.value)
    //       .subscribe(
    //         () => {
    //           this.router.navigate(['/home']);
    //         },
    //         (error) => {
    //           console.error('Signup failed:', error);
    //         }
    //       );
    //   } catch (error) {
    //     console.log('An unexpected error occurred during signup:', error);
    //   }
    // }
    errorMessage: string='';
    successMessage:string='';
    signUp(signUpForm: NgForm): void {
      this.userService.signUp(signUpForm.value)
        .subscribe(
          (response: any) => {
          
          },
          (error: HttpErrorResponse) => {
            if (error.status === 409) {
              this.errorMessage = error.error;
            }else if(error.status ===  201){
              this.successMessage ='User created successfully.';
              // this.router.navigate(['/home']);
              setTimeout(() => {
                this.clearSuccessMessage();
                this.router.navigate(['/login']);
              }, 2000);
            }
          }
        );
    }
    
    clearSuccessMessage(): void {
      this.successMessage = '';
    }

    
    
    
}


