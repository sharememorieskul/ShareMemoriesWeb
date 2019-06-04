import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Article } from '../shared/models/article.model';
import { ArticleService } from '../shared/services/article.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {
  @ViewChild('articleForm') public articleForm: NgForm;
  public showImage = false;
  public formTitle: string;

  article: Article = {
    title: null,
    imageUrl: null,
    text: null,
    isPublic: null
  };

  constructor(private articleService: ArticleService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(parameterMap => {
      const id = parameterMap.get('id');
      this.getArticle(id);
    });
  }

  toggleImageShow() {
    this.showImage = !this.showImage;
  }

  private getArticle(id: string) {
    if (id === '0') {
      this.article = {
        title: null,
        imageUrl: null,
        text: null,
        isPublic: null
      };
      this.formTitle = 'New Article :)';
      this.articleForm.reset();
    } else {
      this.formTitle = 'Update Article';
      this.articleService.get(id).subscribe(
        (article) => this.article = article,
        (err: any) => console.log(err)
      );
    }
  }

  onSubmit(): void {
    if (this.article.uuid === undefined) {
      this.articleService.add(this.article).subscribe(
        (data: Article) => {
          this.articleForm.reset();
          this.router.navigate(['dashboard']);
        },
        (error: any) => console.log(error)
      );
    } else {
      this.articleService.update(this.article).subscribe(
        () => {
          this.articleForm.reset();
          this.router.navigate(['dashboard']);
        },
        (error: any) => console.log(error)
      );
    }
  }
}
