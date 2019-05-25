import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    private tokenService: AngularTokenService,
    private router: Router,
    private fb: FormBuilder
    ) {
    this.registerForm = this.fb.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'confirm_password': ['', Validators.required]
    });
  }

  registerForm: FormGroup;
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  confirm_password = new FormControl('', Validators.required);


  ngOnInit() { }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.tokenService.registerAccount({
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      login: this.f.email.value,
      password: this.f.password.value,
      passwordConfirmation: this.f.confirm_password.value
    }).subscribe(
      res => {
        this.router.navigate(['/editor']);
      },
      err => {
        console.log(err);
      }
    );
   }

}
