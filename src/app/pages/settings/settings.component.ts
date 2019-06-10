import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';
import { ICategory } from '../../models/ICategory.interface';
import { ApiService } from '../../services/api.service';
import { ISettings } from 'src/app/models/ISettings.interface';

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
  newCategory: string;
  settings: ISettings;

  ngOnInit() {
    /*
    this.categories = [{}] as Array<ICategory>;
    this.api.fetch('categories').subscribe((res: Array<ICategory>) => {
      this.categories = res;
    });
    */

    this.api.fetchSettings().subscribe((res: ISettings) => {
      this.settings = res;
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
