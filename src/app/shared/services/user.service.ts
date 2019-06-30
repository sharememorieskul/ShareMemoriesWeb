import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Article } from '../models/article.model';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Follower } from '../models/follower.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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
    return this.http.get<Article[]>('users/' + userId + '/posts')
      .pipe(
        map((data: Article[]) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }
  GetAllPostsAvaiableForUser(): Observable<Article[]> {
    return this.http.get<Article[]>("users/posts")
      .pipe(
        map((data: Article[]) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }
  Get(id: string): Observable<User> {
    return this.http.get<User>('users/'+ id)
      .pipe(
        catchError(this.handleError)
      );
  }
  GetLoggedUser(): Observable<User> {
    return this.http.get<User>("users/account")
      .pipe(
        catchError(this.handleError)
      );
  }
  Follow(userId: string) {
    const follower = new Follower(userId);
    return this.http.post<Article>("users/account/followers", follower).pipe(
      catchError(this.handleError)
    );
  }
  Unfollow(userId: string) {
    const follower = new Follower(userId);
    let options={headers: {}, body: follower}
    return this.http.delete<Article>("users/account/followers",options).pipe(
      catchError(this.handleError)
    );
  }
}
