
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Article } from '../models/article.model';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GetUserInfoResolverService implements Resolve<User|string> {
  constructor(private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User|string> {
    const userId=route.params.id;
    return this.userService.Get(userId)
      .pipe(
        catchError((err: string) => of(err))
      );
  }

}