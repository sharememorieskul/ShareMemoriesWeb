import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LocalStorageHelper } from '../helpers/local-storage.helper';
import { Constants } from '../constants/constants';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private readonly apiPath = 'https://afternoon-refuge-61557.herokuapp.com/posts';

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

    return this.http.get<Article[]>(this.apiPath, this.getOptionsRequest())
      .pipe(
        map((data: Article[]) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  get(uuid: string): Observable<Article> {
    const url = `${this.apiPath}/${uuid}`;
    return this.http.get<Article>(url, this.getOptionsRequest())
      .pipe(
        map((data: Article) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  add(post: Article): Observable<Article> {
    return this.http.post<Article>(this.apiPath, post, this.getOptionsRequest()).pipe(
      catchError(this.handleError)
    );
  }

  update(post: Article): Observable<any> {
    return this.http.put<any>(`${this.apiPath}/${post.uuid}`, post, this.getOptionsRequest()).pipe(
      catchError(this.handleError)
    );
  }

  delete(uuid: string): Observable<void> {
    const url = `${this.apiPath}/${uuid}`;
    return this.http.delete<void>(url, this.getOptionsRequest())
      .pipe(
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
    return {headers: headers};
  }
}
