import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Article } from '../shared/models/article.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  articles: Article[] = [];

  filteredArticles: Article[];

  error: string;

  private prSearchInput: string;

  get searchInput(): string {
    return this.prSearchInput;
  }

  set searchInput(value: string) {
    this.prSearchInput = value;
    this.filteredArticles = this.filterArticles(value);
  }

  filterArticles(searchInput: string): Article[] {
    return this.articles.filter(article => article.title.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1);
  }

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const resolvedData: Article[] | string = this.activatedRoute.snapshot.data['getArticles'];

    if (Array.isArray(resolvedData)) {
      this.articles = resolvedData;
    } else {
      this.error = resolvedData;
    }

    if (this.activatedRoute.snapshot.queryParamMap.has('searchTerm')) {
      this.searchInput = this.activatedRoute.snapshot.queryParamMap.get('searchTerm');
    } else {
      this.filteredArticles = this.articles;
    }

    // this.activatedRoute.data.subscribe((data: any) => {
    //   console.log(data, 'Dashboard');
    //   this.articles = data.getArticles;
    // });
    //
    // this.activatedRoute.queryParamMap.subscribe((queryParams) => {
    //   if (queryParams.has('searchTerm')) {
    //     this.searchInput = queryParams.get('searchTerm');
    //   } else {
    //     this.filteredArticles = this.articles;
    //   }
    // });

    // if (this.activatedRoute.snapshot.queryParamMap.has('searchTerm')) {
    //   this.searchInput = this.activatedRoute.snapshot.queryParamMap.get('searchTerm');
    // } else {
    //   this.filteredArticles = this.articles;
    // }
  }

  onDeletingArticle(uuid: string) {
    const i = this.filteredArticles.findIndex(article => article.uuid === uuid); // Index for deleting from the filtered array of articles
    const j = this.articles.findIndex(article => article.uuid === uuid); // Index for deleting from the base array of articles
    if (i !== -1) {
      this.filteredArticles.splice(i, 1);
      this.articles.splice(j, 1);
    }
  }
}
