import { Component, OnInit, OnChanges } from '@angular/core';
import { SearchService } from '../services/search.service';
import { ISearchResult } from '../models/ISearchResult.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  results: ISearchResult;
  resultsList: {};
  emptyResults = false;

  constructor(private searchResults: SearchService) { }

  ngOnInit() {
    this.results = {results:  []} as ISearchResult;
    this.searchResults.searchChange.subscribe(ch => this.results = ch);
  }

  highlightRow(id) {
    document.getElementById(id).classList.add('is-selected');
  }
  dehighlightRow(id) {
    document.getElementById(id).classList.remove('is-selected');
  }

}
