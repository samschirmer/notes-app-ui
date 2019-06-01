import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ISearchResult } from '../models/ISearchResult.interface';

@Injectable()
export class SearchService {

  apiUrl = environment.API_BASE_URL;

  lastResults: ISearchResult;
  lastSearchTerm: string;

  searchChange: Subject<ISearchResult> = new Subject<ISearchResult>();

  constructor(
    private httpClient: HttpClient
  )  {
    this.searchChange.subscribe((value) => {
      this.lastResults = value;
    });
   }

  query(terms: string): void {
    this.httpClient.post(`${this.apiUrl}/search`,
    { note: { terms: terms }})
    .subscribe((res: ISearchResult) => { this.searchChange.next(res); });
  }
}
