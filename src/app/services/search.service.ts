import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ISearchResult } from '../models/ISearchResult.model';

@Injectable()
export class SearchService {

  apiUrl = environment.API_BASE_URL;

  lastResults: ISearchResult;
  lastSearchTerm: string;

  searchChange: Subject<ISearchResult> = new Subject<ISearchResult>();

  constructor()  {
    this.searchChange.subscribe((value) => {
    this.lastResults = value;
    });
  }
}
