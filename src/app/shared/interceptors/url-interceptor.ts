import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class UrlInterceptor implements HttpInterceptor
{
    private apiPath: string='https://afternoon-refuge-61557.herokuapp.com/';

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const updatedRequest = request.clone({
            url: this.apiPath+request.url
          });
        return next.handle(updatedRequest);
    }
    
    
}