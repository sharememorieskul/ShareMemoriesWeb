import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LocalStorageHelper } from '../helpers/local-storage.helper';
import { Constants } from '../constants/constants';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private router: Router
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const updatedRequest = request.clone(this.getOptionsRequest());
    return next.handle(updatedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          LocalStorageHelper.removeItem(Constants.localStorageTokenKey);
          AuthService.userLogoutEvent.emit();
          this.router.navigateByUrl('sign-in-after-fail');
        }
        else
        {
          return throwError(error);
        }
      }
    ));
  }

  getOptionsRequest() {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    const tokenObject = LocalStorageHelper.getItem(Constants.localStorageTokenKey);
    if (tokenObject != null) {
      headers = headers.append('Authorization', tokenObject.token);
    }
    return { headers: headers };
  }

}