import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private tokenService: AngularTokenService) { }

  ngOnInit() { }

  signOut() {
    console.log('signing out');
    this.tokenService.signOut().subscribe(
      res =>      console.log(res),
      error =>    console.log(error)
    );
  }

}
