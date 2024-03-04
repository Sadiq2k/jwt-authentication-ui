import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './header/auth/Auth.guard';
import { AuthInterceptor } from './header/auth/auth.interceptor';
import { UserService } from './Service/user.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AddUserComponent } from './add-user/add-user.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { adminReducer } from './module/State/admin.reducer';
import { AdminEffects } from './module/State/admin.effects';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    SignUpComponent,
    AddUserComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    StoreModule.forRoot({user:adminReducer}),
    EffectsModule.forRoot([AdminEffects]),
    StoreDevtoolsModule.instrument({maxAge:50, logOnly: !isDevMode()})

  ],
  providers: [
    provideClientHydration(),
    AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
