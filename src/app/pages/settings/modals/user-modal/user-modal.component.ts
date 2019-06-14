import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/app/models/IUser.interface';
import { ApiService } from 'src/app/services/api.service';
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {
  @Input() user: IUser;
  @Input() account: number;

  constructor(
    private api: ApiService,
    private tokenService: AngularTokenService
  ) { }

  ngOnInit() {
    this.user = {} as IUser;
  }

  hideModal() {
    document.getElementById('user-modal').classList.remove('is-active');
  }

  addUser() {
    const button = document.getElementById('update-user-button');
    button.classList.add('is-loading');
    this.api.addUser({
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      email: this.user.email,
      password: this.user.password,
      password_confirmation: this.user.password_confirmation,
      account_id: this.account
    }).subscribe(
      res => {
      this.hideModal();
      location.reload();
    }, err => {
      console.log(err);
    });
    button.classList.remove('is-loading');
  }

  updateUser() {
    const button = document.getElementById('update-user-button');
    button.classList.add('is-loading');
    if (this.passwordIsUpdated()) {
      this.updatePassword();
    }
    this.api.updateUserMetadata(this.user).subscribe(
      (res: IUser) => {
      this.hideModal();
    }, err => {
        console.log(err);
      if (err === 'email already in use') {
        console.log('someone is already using this email address');
      }
    });
    button.classList.remove('is-loading');
  }

  async updatePassword() {
    this.tokenService.updatePassword({
      password: this.user.password,
      passwordConfirmation: this.user.password_confirmation
    }).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  passwordIsUpdated(): boolean {
    if (
      ((this.user.password !== undefined) && (this.user.password_confirmation !== undefined)) &&
      ((this.user.password !== '') && (this.user.password_confirmation !== ''))
    ) {
     return true;
    } else {
      return false;
    }
  }

}
