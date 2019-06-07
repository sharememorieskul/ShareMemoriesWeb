import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LocalStorageHelper } from '../../helpers/local-storage.helper';
import { Constants } from '../../constants/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  public _userIsLogged = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    AuthService.userLoggedInEvent.subscribe(
      () => {
        this._userIsLogged = true;
      }
    );
    AuthService.userLogoutEvent.subscribe(
      () => {
        this._userIsLogged = false;
      }
    );
    const token = LocalStorageHelper.getItem(Constants.localStorageTokenKey);
    if (token != null) {
      this._userIsLogged = true;
    } else {
      this._userIsLogged = false;
    }

  }
  logout() {
    LocalStorageHelper.removeItem(Constants.localStorageTokenKey);
    AuthService.userLogoutEvent.emit();
    this.router.navigateByUrl('dashboard');
  }

}
