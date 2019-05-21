import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private tokenService: AngularTokenService,
    private router: Router,
    private fb: FormBuilder
    ) {
    this.form = fb.group({
    'email': this.email,
    'password': ['', Validators.required]
    });
  }

  form: FormGroup;
  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);


  ngOnInit() { }

  onSubmit() {
    console.log('submitting');
    this.tokenService.signIn({
      login: 'samschirmer@gmail.com',
      password: 'Password0'
    }).subscribe(
      res => {
        console.log(res);
        if (res.status === 200) {
          this.router.navigate(['settings']);
        }
      },
      err => console.log(err)
    );

    window.location.href = 'localhost:4200/settings';
  }

}
