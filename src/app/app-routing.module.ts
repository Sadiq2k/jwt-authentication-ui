import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './header/auth/Auth.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:"home",component:HomeComponent},
  {path:"admin",component:AdminComponent , canActivate:[AuthGuard], data:{roles:['Admin']} },
  {path:"user",component:UserComponent ,canActivate:[AuthGuard] ,data:{roles:['user']}},
  {path:"forbidden",component:ForbiddenComponent},
  {path:"login",component:LoginComponent},
  {path:"sign",component:SignUpComponent},
  {path:"addUser",component:AddUserComponent, canActivate:[AuthGuard], data:{roles:['Admin']} }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
