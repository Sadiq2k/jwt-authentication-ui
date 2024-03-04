import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthServiceService } from './user-auth-service.service';
import { text } from 'stream/consumers';
import { User } from '../module/user';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API ="http://localhost:8081";

  requestHeader = new HttpHeaders( {'No-Auth': 'True'} );

  constructor(private httpClient:HttpClient,
              private userAuthService : UserAuthServiceService
    ) {}



  login(loginData:any){
    
    return this.httpClient.post(this.PATH_OF_API + "/authenticate", loginData , { headers: this.requestHeader ,})

    // .pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     // Handle specific error status codes or messages here
    //     return throwError(error);
    //   })
    // );
  }

  // public forUser(){
  //   return this.httpClient.get(this.PATH_OF_API + "/forAdmin" , {responseType:"text"});
  // }

 
  public signUp(signUpForm:any){
    return this.httpClient.post(this.PATH_OF_API + "/registerNewUser" ,signUpForm ,{headers:this.requestHeader})
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
  
  public roleMatch(allowedRoles: string[]): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();
  
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          }
        }
      }
    }
    return isMatch;
  }


  public getAllUser():Observable<User[]>{
    const jwtToken = this.userAuthService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+ jwtToken
      })
    };

    return this.httpClient.get<User[]>(this.PATH_OF_API + "/getUsers", httpOptions)
  }


  deleteUser(id:string):Observable<any>{
    const jwtToken = this.userAuthService.getToken();
    console.log(jwtToken);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+ jwtToken
      })
    };
    return this.httpClient.delete(this.PATH_OF_API + `/deleteUser/${id}`, httpOptions)
    
  }


  getUser(userId: string): Observable<any> {
    const jwtToken = this.userAuthService.getToken(); 
    console.log(jwtToken)
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`
      })
    };

    const url = `${this.PATH_OF_API}/get-user/${userId}`;
    
    return this.httpClient.get(url, httpOptions);
  }


  updateUser(editUser: any) {// Admin update user
    console.log("Service say Hello ");

    const jwtToken = this.userAuthService.getToken(); 
    console.log(jwtToken)
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`
      })
    };
  
    const url = `${this.PATH_OF_API}/save-user`; 
  
    return this.httpClient.put<User>(url, editUser,  httpOptions );
  }


  getUserProfile(): Observable<any> {
    const jwtToken = this.userAuthService.getToken();
    console.log(jwtToken)
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwtToken}`
      })
      
    };
    return this.httpClient.get(this.PATH_OF_API + "/loginUser", httpOptions);
  }


  saveImages(imageFiles: File[]): Observable<any> {
    let formData = new FormData();

    for (let i = 0; i < imageFiles.length; i++) {
      formData.append('imageFile', imageFiles[i], imageFiles[i].name);
    }
    

  
    const jwtToken = this.userAuthService.getToken();
    const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': `Bearer ${jwtToken}`
          }),
          observe: 'response' as 'response',
        };
        console.log('hai formdata');
console.log(formData);
    return this.httpClient.post<any>(this.PATH_OF_API + "/addProfilePic", formData, httpOptions);
  }


  // getImage(userName: string): Observable<File> {
  //   const jwtToken = this.userAuthService.getToken();
  //   const httpOptions = {
  //         headers: new HttpHeaders({
  //           'Authorization': `Bearer ${jwtToken}`
  //         })
  //       };
  //   return this.httpClient.get<File>(`/getImage/${userName}` ,httpOptions );
  // }

  
}
