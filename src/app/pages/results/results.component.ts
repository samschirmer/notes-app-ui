import { Component, OnInit, OnChanges } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { ISearchResult } from '../../models/ISearchResult.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  results: ISearchResult;
  emptyResults = false;

  constructor(private searchResults: SearchService) { }

  ngOnInit() {
    this.results = {results:  []} as ISearchResult;
    this.searchResults.searchChange.subscribe(ch => {
      this.results = ch;
    });
  }


}
