import {HttpHandler} from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";
import {HttpInterceptor} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {HttpEvent} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {retry, catchError} from "rxjs/internal/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {tap} from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable()
export class BasicAuthHtppInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

    if (localStorage.getItem('username') && localStorage.getItem('token')) {
      req = req.clone({
        setHeaders: {
          Authorization: localStorage.getItem('token')
        }
      })
    }

    return next.handle(req).pipe( tap(() => {},
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log('BasicAuthHtppInterceptorService Done!' + err.status );
          if (err.status == 0) {
            this.router.navigate(['auth/login']);
          }
          if (err.status !== 401) {
            return;
          }
          console.log('BasicAuthHtppInterceptorService Done!' + err.status );
          this.router.navigate(['auth/login']);
        }
      }));
  }

  //   return next.handle(req)
  //     .pipe(
  //       retry(1),
  //       catchError((error: HttpErrorResponse) => {
  //         let errorMessage = '';
  //         if (error.error instanceof ErrorEvent) {
  //           // client-side error
  //           errorMessage = `Error: ${error.error.message}`;
  //           console.error(errorMessage);
  //         } else {
  //           // server-side error
  //           errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //           console.error(errorMessage);
  //           //alert('API Connection problem at this time !');
  //           if(error.status==0){
  //             throwError(error);
  //             //alert('API Connection problem at this time 123!');
  //           }
  //         }
  //         //window.alert(errorMessage);
  //         //return throwError(errorMessage);
  //         return throwError(error);
  //       })
  //     );
  // }
}
