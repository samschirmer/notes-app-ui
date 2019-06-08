import { Component, OnInit, Input } from '@angular/core';
import { ISearchResult } from 'src/app/models/ISearchResult.interface';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit {
  @Input() res: ISearchResult;

  constructor() { }

  ngOnInit() { }

  highlightRow(id) {
    document.getElementById(id).classList.add('is-selected');
  }
  dehighlightRow(id) {
    document.getElementById(id).classList.remove('is-selected');
  }

}
