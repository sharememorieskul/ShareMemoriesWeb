import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsArticleComponent } from './details-article/details-article.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { CreateArticleDeactivateGuardService } from './shared/guards/create-article-deactivate-guard.service';
import { UserRegistrationGuardService } from './shared/guards/user-registration-guard.service';
import { GetArticleResolverService } from './shared/resolvers/get-article-resolver.service';
import { GetPublicArticlesResolverService } from './shared/resolvers/get-public-articles-resolver.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ArticleDetailsGuardService } from './shared/guards/article-details-guard.service';
import { AuthComponent } from './auth/auth.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GetAvailableArticlesResolverService } from './shared/resolvers/get-avaiable-articles-resolver.service';
import { GetUserArticlesResolverService } from './shared/resolvers/get-user-articles-resolver.service';
import { GetUserInfoResolverService } from './shared/resolvers/get-user-info-resolver.service';
import { GetLoggedUserInfoResolverService } from './shared/resolvers/get-logged-user-info-resolver.service';
import { GetLoggedUserArticlesResolverService } from './shared/resolvers/get-logged-user-articles-resolver.service';
import { RedirectToDictComponent } from './redirect-to-dict/redirect-to-dict.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, resolve: { getArticles: GetPublicArticlesResolverService } },
  { path: 'mywall', component: DashboardComponent, resolve: { getArticles: GetAvailableArticlesResolverService } },
  {
    path: 'articles/:id', component: DetailsArticleComponent, resolve: { getArticle: GetArticleResolverService },
    canActivate: [ArticleDetailsGuardService]
  },
  { path: 'edit/:id', component: NewArticleComponent, canDeactivate: [CreateArticleDeactivateGuardService] },
  { path: 'sign-in', component: AuthComponent, data: {mode: 'sign-in'}, canDeactivate: [UserRegistrationGuardService] },
  { path: 'sign-up', component: AuthComponent, data: {mode: 'sign-up'}, canDeactivate: [UserRegistrationGuardService] },
  { path: 'user-profile/:id', component: UserProfileComponent, resolve: { getArticles: GetUserArticlesResolverService, getUser: GetUserInfoResolverService } },
  { path: 'my-profile', component: UserProfileComponent, resolve: { getArticles: GetLoggedUserArticlesResolverService, getUser: GetLoggedUserInfoResolverService } },
  { path: 'notFound', component: PageNotFoundComponent },
  { path: 'redirect', component: RedirectToDictComponent},
  { path: 'redirect\0\0', component: RedirectToDictComponent}


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes) // { enableTracing: true }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
