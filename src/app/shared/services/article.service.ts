import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client side error: ', errorResponse.error.message);
    } else {
      console.error('Server side error: ', errorResponse);
    }

    return throwError('Something bad happened; please try again later.');
  }

  getAll(): Observable<Article[]> {

    return this.http.get<Article[]>("posts")
      .pipe(
        map((data: Article[]) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  get(uuid: string): Observable<Article> {
    return this.http.get<Article>(`posts/${uuid}`)
      .pipe(
        map((data: Article) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  add(post: Article): Observable<Article> {
    return this.http.post<Article>("posts", post).pipe(
      catchError(this.handleError)
    );
  }

  update(post: Article): Observable<any> {
    return this.http.put<any>(`posts/${post.uuid}`, post).pipe(
      catchError(this.handleError)
    );
  }

  delete(uuid: string): Observable<void> {
    const url = `$posts/${uuid}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
}
