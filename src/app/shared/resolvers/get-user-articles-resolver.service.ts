import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Article } from '../models/article.model';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class GetUserArticlesResolverService implements Resolve<Article[] | string> {
  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article[] | string> {
    const userId=route.params.id;
    return this.userService.GetAllPostsCreatedByUser(userId)
      .pipe(
        catchError((err: string) => of(err))
      );
  }

}