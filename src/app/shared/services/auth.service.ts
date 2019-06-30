import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthModel } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { TokenModel } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static userLoggedInEvent: EventEmitter<any> = new EventEmitter<any>();
  public static userLogoutEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private http: HttpClient
  ) { }

  register(model: AuthModel): Observable<void> {
    return this.http.post<void>('users', model);
  }
  login(model: AuthModel): Observable<TokenModel> {
    return this.http.post<TokenModel>(`users/token`, model);
  }

}
