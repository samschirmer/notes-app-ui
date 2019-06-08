import { Component, OnInit, OnChanges } from '@angular/core';
import { ISearchResult } from '../models/ISearchResult.interface';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  results: ISearchResult;
  sub: any;
  emptyResults = false;
  loading = true;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.results = {results:  []} as ISearchResult;
    this.sub = this.route.params.subscribe(params => {
      this.api.fetchOne('categories', +params['id']).subscribe((res: any) => {
        this.results = res;
        this.loading = false;
      });
    });
  }

}
