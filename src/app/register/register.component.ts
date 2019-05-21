import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private tokenService: AngularTokenService) { }

  ngOnInit() { }

  onSubmit() {
    this.tokenService.registerAccount({
      login: 'test@test.com',
      password: 'Password1',
      passwordConfirmation: 'Password1'
    }).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
   }

}
