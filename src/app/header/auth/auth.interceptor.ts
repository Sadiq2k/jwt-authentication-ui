import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { UserAuthServiceService } from "../../Service/user-auth-service.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private userAuthService:UserAuthServiceService,
        private router:Router
        ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       if(req.headers.get('No-Auth') === 'True' || req.headers.has('Authorization')){
        return next.handle(req.clone())
       }
       const token = this.userAuthService.getToken();
       this.addToken(req,token);

       return next.handle(req).pipe(
        catchError(
            (err:HttpErrorResponse)=>{
                console.log(err.status);
                if(err.status ===401){
                    this.router.navigate(['/login'])
                }else if(err.status === 403){
                    this.router.navigate(['/forbidden'])
                }
               return throwError('Some thing wrong')
            }
        )
       )
    }

    private addToken(request:HttpRequest<any>,token:string){
        return request.clone(
            {
                setHeaders:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
    }
    
}