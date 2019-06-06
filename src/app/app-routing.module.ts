import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsArticleComponent } from './details-article/details-article.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { CreateArticleDeactivateGuardService } from './shared/guards/create-article-deactivate-guard.service';
import { UserRegistrationGuardService } from './shared/guards/user-registration-guard.service';
import { GetArticleResolverService } from './shared/resolvers/get-article-resolver.service';
import { GetArticlesResolverService } from './shared/resolvers/get-articles-resolver.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ArticleDetailsGuardService } from './shared/guards/article-details-guard.service';
import { AuthComponent } from './auth/auth.component';
import { UserProfileComponent } from './shared/components/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, resolve: { getArticles: GetArticlesResolverService } },
  {
    path: 'articles/:id', component: DetailsArticleComponent, resolve: { getArticle: GetArticleResolverService },
    canActivate: [ArticleDetailsGuardService]
  },
  { path: 'edit/:id', component: NewArticleComponent, canDeactivate: [CreateArticleDeactivateGuardService] },
  { path: 'sign-in', component: AuthComponent, data: {mode: 'sign-in'}, canDeactivate: [UserRegistrationGuardService] },
  { path: 'sign-up', component: AuthComponent, data: {mode: 'sign-up'}, canDeactivate: [UserRegistrationGuardService] },
  { path: 'user-profile', component: UserProfileComponent, resolve: { getArticles: GetArticlesResolverService } },
  { path: 'notFound', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes) // { enableTracing: true }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
