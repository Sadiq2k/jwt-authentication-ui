import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthServiceService {

  constructor() {}

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): string[] | null {
    const rolesJson = localStorage.getItem('roles');
    return rolesJson ? JSON.parse(rolesJson) : null;
}

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    const token = localStorage.getItem('jwtToken');
    return token || ''; 
}

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }
}
