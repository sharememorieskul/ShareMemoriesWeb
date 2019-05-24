import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Article } from '../shared/models/article.model';
import { ArticleService } from '../shared/services/article.service';
import { LocalStorageHelper } from '../shared/helpers/local-storage.helper';
import { TokenModel } from '../shared/models/token.model';
import { Subject } from 'rxjs';
import { Constants } from '../shared/constants/constants';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.css']
})

export class SingleArticleComponent implements OnInit,OnDestroy {
  public confirmDelete = false;
  public selectedArticleId: string;
  @Input() public article: Article;
  @Input() searchInput: string;
  @Output() deletingArticle: EventEmitter<string> = new EventEmitter<string>();
  private ngUnsubscribe$=new Subject<void>();
  public loggedUserEmail: string=null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private articleService: ArticleService) {}

  ngOnInit(): void {
    this.selectedArticleId = this.route.snapshot.paramMap.get('id');
    
    const tokenModel: TokenModel=LocalStorageHelper.getItem(Constants.localStorageTokenKey);
    if(tokenModel!=null)
    {
      this.loggedUserEmail=tokenModel.email;
    }
    
    AuthService.userLogoutEvent.pipe(takeUntil(this.ngUnsubscribe$)).subscribe
    (
      ()=>{
        this.loggedUserEmail=null;
      }
    )
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
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
