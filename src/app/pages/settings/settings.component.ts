import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';
import { ICategory } from '../../models/ICategory.interface';
import { ApiService } from '../../services/api.service';
import { ISettings } from 'src/app/models/ISettings.interface';
import { IUser } from 'src/app/models/IUser.interface';
import { IPlan } from 'src/app/models/IPlan.interface';

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
  chosenUser: IUser;
  settings: ISettings;
  companyName: string;
  plan: IPlan;

  ngOnInit() {
    this.categories = [{}] as Array<ICategory>;
    this.users = [{}] as Array<IUser>;
    this.plan = {} as IPlan;
    this.api.fetchSettings().subscribe((res: ISettings) => {
      this.settings = res;
      this.companyName = res.company.name;
      this.categories = this.settings.categories;
      this.users = this.settings.users;
      this.plan = this.settings.plan;
    });
  }

  updateAccountName() {
    console.log(this.companyName);
    this.api.updateAccountName(this.companyName).subscribe((res: { account: string }) => {
      this.companyName = res.account;
    });
  }

  changePlan() {
    console.log(`current plan: ${this.settings.plan.name} - changing it now`);
  }

  addUser() {
    console.log(`adding a user: ${this.newUser} -- opening modal`);
  }

  editRemoveUser(u: IUser) {
    console.log(`editing/removing a user: ${u.email} -- opening modal`);
    this.chosenUser = u;
    const userModal = document.getElementById('user-modal');
    userModal.classList.remove('is-hidden');
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
