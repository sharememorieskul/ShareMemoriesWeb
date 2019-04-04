import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthModel } from '../models/auth.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TokenModel } from '../models/token.model';
import { LocalStorageHelper } from '../helpers/local-storage.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static userLoggedInEvent: EventEmitter<any> = new EventEmitter<any>();
  public static userLogoutEvent: EventEmitter<any> = new EventEmitter<any>();

  private apiPath = 'http://localhost:56396/account';
  constructor(
    private http: HttpClient
  ) { }

  register(model: AuthModel): Observable<void> {
    return this.http.post<void>(`${this.apiPath}/register`, model, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  login(model: AuthModel): Observable<TokenModel> {
    return this.http.post<TokenModel>(`${this.apiPath}/login`, model, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}
