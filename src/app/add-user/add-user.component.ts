import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../Service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {

  constructor(private userService:UserService,
    private router:Router
    ){}

    errorMessage: string='';
  addUser(signUpForm: NgForm): void {
    try {
      this.userService.signUp(signUpForm.value)
        .subscribe(
          () => {
            this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/admin']);
            });
          },
          (error) => {
            console.error('Signup failed:', error);
            this.errorMessage = error.error;
            if(error.status === 201){
              this.router.navigate(['/admin']);
            }
          }
        );
    } catch (error) {
      console.error('An unexpected error occurred during signup:', error);
    }
  }
}
