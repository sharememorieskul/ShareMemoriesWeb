import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-redirect-to-dict',
  templateUrl: './redirect-to-dict.component.html'
})
export class RedirectToDictComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }


  ngOnInit() {
    const searchValue=this.route.snapshot.queryParams['search'];
    console.log(searchValue);
    window.location.href = `https://translate.google.pl/m?hl=pl&sl=en&tl=pl&ie=UTF-8&prev=_m&q=${searchValue}`;
  }

  

}
