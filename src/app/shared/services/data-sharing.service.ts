import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private readonly articlesApi = 'http://localhost:3000/api/articles';

  constructor(private http: HttpClient) { }

  handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client side error: ', errorResponse.error.message);
    } else {
      console.error('Server side error: ', errorResponse);
    }

    return throwError('Something bad happened; please try again later.');
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.articlesApi)
      .pipe(
        map((data: Article[]) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  getArticle(id: string): Observable<Article> {
    const url = `${this.articlesApi}/${id}`;
    return this.http.get<Article>(url)
      .pipe(
        map((data: Article) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  addArticle(article: Article): Observable<Article> {
    console.log('POST request');
    console.log(article);
    return this.http.post<Article>(this.articlesApi, article, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateArticle(article: Article): Observable<any> {
    console.log('PUT request');
    console.log(article);
    return this.http.put<any>(`${this.articlesApi}/${article._id}`, article, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteArticle(id: string): Observable<void> {
    const url = `${this.articlesApi}/${id}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
}
