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

  private apiPath = 'https://afternoon-refuge-61557.herokuapp.com/users';
  constructor(
    private http: HttpClient
  ) { }

  register(model: AuthModel): Observable<void> {
    return this.http.post<void>(this.apiPath, model, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  login(model: AuthModel): Observable<TokenModel> {
    return this.http.post<TokenModel>(`${this.apiPath}/token`, model, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}
