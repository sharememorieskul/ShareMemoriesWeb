import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Article } from '../models/article.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiPathAllUserArticles = 'https://afternoon-refuge-61557.herokuapp.com/users/df1dec3d-a1ea-49e5-9bcb-ea304a5750d5/posts';

  constructor(private http: HttpClient) { }

  handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client side error: ', errorResponse.error.message);
    } else {
      console.error('Server side error: ', errorResponse);
    }

    return throwError('Something bad happened; please try again later.');
  }

  getAllUserArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiPathAllUserArticles)
      .pipe(
        map((data: Article[]) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }
}
