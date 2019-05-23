import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Article } from '../shared/models/article.model';
import { ArticleService } from '../shared/services/article.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.css']
})

export class SingleArticleComponent implements OnInit {
  public confirmDelete = false;
  public selectedArticleId: string;
  @Input() public article: Article;
  @Input() searchInput: string;
  @Output() deletingArticle: EventEmitter<string> = new EventEmitter<string>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private articleService: ArticleService) {}

  ngOnInit(): void {
    this.selectedArticleId = this.route.snapshot.paramMap.get('id');
  }


  readArticle() {
    this.router.navigate(['/articles', this.article.uuid], {
      queryParams: {
        'searchTerm': this.searchInput,
      }
    });
  }

  updateArticle() {
    this.router.navigate(['/edit', this.article.uuid]);
  }

  deleteArticle() {
    this.articleService.delete(this.article.uuid).subscribe(
      () => console.log(`Article with Id = ${this.article.uuid} deleted.`),
      (err) => console.log(err)
    );
    this.deletingArticle.emit(this.article.uuid);
  }
}
