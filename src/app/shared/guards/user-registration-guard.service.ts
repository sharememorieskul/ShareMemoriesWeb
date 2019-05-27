import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { AuthComponent } from '../../auth/auth.component';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationGuardService implements CanDeactivate<AuthComponent> {
  canDeactivate(component: AuthComponent): boolean {
    if (component.authForm.dirty) {
      return confirm('Are you sure you want to leave the registration form?');
    }
    return true;
  }
}
