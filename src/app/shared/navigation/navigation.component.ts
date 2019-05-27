import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router, private tokenService: AngularTokenService) { }

  ngOnInit() {
  }

  submitSearch() {
    this.router.navigate(['results']);
  }

  signOut() {
    this.tokenService.signOut().subscribe(
      res =>      console.log(res),
      error =>    console.log(error)
    );
    this.router.navigate(['/login']);
  }

}
