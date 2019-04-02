import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthModel } from '../shared/models/auth.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  private mode: string;
  private authModel: AuthModel =
    {
      email: '',
      password: ''
    };


  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.mode = data.mode;
    });
  }
  signUpClicked() {
    console.log(this.authModel);
  }
  signInClicked() {
    console.log(this.authModel);
  }

}
