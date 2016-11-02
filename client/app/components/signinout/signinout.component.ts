import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { select } from 'ng2-redux';

import { UserActions }  from '../../actions/user.actions';
import { UserFormActions } from '../../actions/userForm.actions';
import { ErrorHandlerActions } from '../../actions/errorHandler.actions';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'signinout',
  providers: [UserActions, UserFormActions],
  templateUrl: './signinout.component.html',
  styleUrls: ['./signinout.component.scss']
})
export class SignInOutComponent implements OnInit {
  @select('user') user$: Observable<any>;
  @select('userForm') userForm$: Observable<any>;

  constructor(
    private userActions: UserActions,
    private userFormActions: UserFormActions,
    private errorHandler: ErrorHandlerActions) { }

  ngOnInit() {
    if (Cookie.get('token'))
      this.userActions.getMe();
  }
}
