import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularTokenService } from 'angular-token';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    private router: Router,
    private tokenService: AngularTokenService,
    private searchService: SearchService
    ) { }

  ngOnInit() {
  }

  submitSearch() {
    const mobileMenu = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const terms = (<HTMLInputElement>document.getElementById('nav-search')).value;

    mobileMenu.classList.remove('is-active');
    hamburger.classList.remove('is-active');
    this.searchService.query(terms);
    this.router.navigate(['results']);
  }

  signOut() {
    this.tokenService.signOut().subscribe(
      res =>      console.log(res),
      error =>    console.log(error)
    );
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    const menu = document.getElementById('navbar-icon');
    menu.classList.toggle('is-active');
  }

  toggleMobileMenu() {
    const mobileMenu = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    mobileMenu.classList.toggle('is-active');
    hamburger.classList.toggle('is-active');
  }

}
