import { Component, OnInit } from '@angular/core';
import { UserService } from '../Service/user.service';
import { User } from '../module/user';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AdminState } from '../module/State/admin.reducer';
import { getuserlist } from '../module/State/admin.selecter';
import { loadUsers, updateUser ,deleteUser } from '../module/State/admin.action';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{

   users: User[] = [];
   userRoles: { [key: string]: string } = {};
   editUser: any; 

   users$: Observable<User[]>;

constructor(
            private store: Store<AdminState>,
            private router: Router
            ){
              this.users$ = this.store.select(getuserlist); 
            }


            ngOnInit(): void {
              this.store.select(getuserlist).subscribe(users => {
                this.users = users;

                this.users.forEach(user => {
                  if (Array.isArray(user.role)) {
                    const roles: string = user.role.map(role => role.roleName).join(', ');
                    this.userRoles[user.userName] = roles;
                  }
                });

              });
              this.store.dispatch(loadUsers());
              // console.log('User Roles:', this.userRoles);
              // this.users$.subscribe(data => console.log('Data in component:', data));
            }

  
  openEditForm(user: any) {
    this.editUser = { ...user };
  }

  enableToEdit(user:User){
    return user.enable = true;
  }

    saveEditForm() {
      this.store.dispatch(updateUser({ user: this.editUser }));
      this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/admin']);
      });
    }

  cancelEditForm() {
    this.editUser = null;
  }



  deleteUser(id: string) {
    this.store.dispatch(deleteUser({ userId: id }));
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin']);
    });
  }

  

}


