import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Article } from '../models/article.model';
import { catchError, map } from 'rxjs/operators';
import { LocalStorageHelper } from '../helpers/local-storage.helper';
import { Constants } from '../constants/constants';
import { User } from '../models/user.model';
import { Follower } from '../models/follower.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiPath = 'https://afternoon-refuge-61557.herokuapp.com/users/';
  constructor(private http: HttpClient) { }

  handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client side error: ', errorResponse.error.message);
    } else {
      console.error('Server side error: ', errorResponse);
    }

    return throwError('Something bad happened; please try again later.');
  }

  GetAllPostsCreatedByUser(userId: string): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiPath + userId + '/posts', this.getOptionsRequest())
      .pipe(
        map((data: Article[]) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }
  GetAllPostsAvaiableForUser(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiPath + "posts", this.getOptionsRequest())
      .pipe(
        map((data: Article[]) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }
  Get(id: string): Observable<User> {
    return this.http.get<User>(this.apiPath + id, this.getOptionsRequest())
      .pipe(
        catchError(this.handleError)
      );
  }
  Follow(userId: string) {
    const follower = new Follower(userId);
    return this.http.post<Article>(this.apiPath+"account/followers", follower, this.getOptionsRequest()).pipe(
      catchError(this.handleError)
    );
  }


  getOptionsRequest() {
    const tokenObject = LocalStorageHelper.getItem(Constants.localStorageTokenKey);
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    if (tokenObject != null) {
      headers = headers.append('Authorization', tokenObject.token);
    }
    return { headers: headers };
  }

}
