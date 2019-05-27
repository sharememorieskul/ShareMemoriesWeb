import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenModel } from '../shared/models/token.model';
import { LocalStorageHelper } from '../shared/helpers/local-storage.helper';
import { AuthViewModel } from './auth.view-model';
import { AuthMapper } from '../shared/mappers/auth.mapper';
import { Constants } from '../shared/constants/constants';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  @ViewChild('authForm') public authForm: NgForm;
  public _mode: string;
  public _showSuccessAlert = false;
  public _showErrorAlert = false;
  public _successAlert: string;
  public _errorAlert: string;
  public _blockControls = false;
  public _authViewModel: AuthViewModel =
    {
      email: '',
      password: '',
      confirmPassword: ''
    };


  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this._mode = data.mode;
    });
  }
  loginClicked() {
    const model = AuthMapper.mapViewModelToModel(this._authViewModel);
    this.authService.login(model).subscribe((tokenModel: TokenModel) => {
      tokenModel.email = model.email;
      LocalStorageHelper.setItem(Constants.localStorageTokenKey, tokenModel);
      this.showSuccessAlert('You have been successfully logged in');
      AuthService.userLoggedInEvent.emit();
      this.redirectToPageAfterDelay('/', 1500);
    },
      (errorResponse: HttpErrorResponse) => {
        this.showErrorAlert(errorResponse.error.message);
      }
    );
  }
  registerClicked() {
    if (this._authViewModel.password !== this._authViewModel.confirmPassword) {
      this.showErrorAlert('Password does not match');
      return;
    }
    const model = AuthMapper.mapViewModelToModel(this._authViewModel);
    this.authService.register(model).subscribe(() => {
      this.showSuccessAlert('You have been successfully registered');
      this.redirectToPageAfterDelay('/sign-in', 1500);
    },
      (errorResponse: HttpErrorResponse) => {
        this.showErrorAlert(errorResponse.error.message);
      }
    );
  }
  showSuccessAlert(alert: string) {
    this._showErrorAlert = false;
    this._showSuccessAlert = true;
    this._errorAlert = null;
    this._successAlert = alert;
  }
  showErrorAlert(alert: string) {
    this._showSuccessAlert = false;
    this._showErrorAlert = true;
    this._successAlert = null;
    this._errorAlert = alert;
  }
  redirectToPageAfterDelay(path: string, delay: number) {
    this._blockControls = true;
    setTimeout(() => {
      this.router.navigate([path]);
    }, delay);
  }

}
