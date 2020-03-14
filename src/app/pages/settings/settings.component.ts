import { Component, OnInit, HostListener } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';
import { ICategory } from '../../models/ICategory.interface';
import { ApiService } from '../../services/api.service';
import { ISettings } from 'src/app/models/ISettings.interface';
import { IUser } from 'src/app/models/IUser.interface';
import { IPlan } from 'src/app/models/IPlan.interface';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
    private tokenService: AngularTokenService,
    private api: ApiService,
    private router: Router
  ) { }

  categories: Array<ICategory>;
  users: Array<IUser>;
  newCategory: string;
  newUser: string;
  loggedInUser: IUser;
  chosenUser: IUser;
  settings: ISettings;
  companyName: string;
  plan: IPlan;
  currentAccount: number;
  isAdmin: boolean;

  ngOnInit() {
    this.categories = [{}] as Array<ICategory>;
    this.loggedInUser = {} as IUser;
    this.users = [{}] as Array<IUser>;
    this.plan = {} as IPlan;
    this.api.fetchSettings().subscribe((res: ISettings) => {
      this.settings = res;
      this.companyName = this.settings.company.name;
      this.loggedInUser = this.settings.user;
      this.users = this.settings.users;
      this.plan = this.settings.plan;
      this.currentAccount = this.users[0].account_id;
      this.isAdmin = this.settings.user.status > 1;

      for (let i = 0; i < this.settings.categories.length; i++) {
        if (this.settings.categories[i].name.toLowerCase() === 'uncategorized') {
          this.settings.categories.splice(i, 1);
        }
      }

      this.categories = this.settings.categories;
    });

  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(e: KeyboardEvent) {
    const modals = document.getElementsByClassName('modal');
    for (const m of modals as any) {
      m.classList.remove('is-active');
    }
  }

  updateAccountName() {
    console.log(this.companyName);
    this.api.updateAccountName(this.companyName).subscribe((res: { account: string }) => {
      this.companyName = res.account;
    });
  }

  changePlan() {
    console.log(`current plan: ${this.settings.plan.name} - changing it now`);
    const planModal = document.getElementById('plan-modal');
    planModal.classList.add('is-active');
  }

  addUser() {
    console.log(this.users);
    this.chosenUser = {} as IUser;
    const userModal = document.getElementById('user-modal');
    userModal.classList.add('is-active');
  }

  editUser(u: IUser) {
    this.chosenUser = u;
    const userModal = document.getElementById('user-modal');
    userModal.classList.add('is-active');
  }

  removeUser(u: IUser) {
    this.api.removeUser(u).subscribe((res: Array<IUser>) => {
      this.users = res;
    });
  }

  addCategory() {
    (<HTMLInputElement>document.getElementById('settings-add-category')).value = '';
    this.api.createCategory(this.newCategory).subscribe((res: Array<ICategory>) => {
      this.categories = res;
    });
  }

  removeCategory(c: ICategory) {
    this.api.removeCategory(c).subscribe((res: Array<ICategory>) => {
      this.categories = res;
    });
  }

  signOut() {
    this.tokenService.signOut().subscribe(
      res =>      console.log(res),
      error =>    console.log(error)
    );
    this.router.navigate(['/login']);
  }

}
