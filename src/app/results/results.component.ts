import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { ISearchResult } from '../models/ISearchResult.model';

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
    this.checkForResults();
  }

  checkForResults() {
    if (this.searchResults.lastResults) {
      this.results = this.searchResults.lastResults;
      this.resultsList = this.results;
    } else {
      this.emptyResults = true;
    }
  }

}
