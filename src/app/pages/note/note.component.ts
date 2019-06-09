import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../services/api.service';
import { INote } from '../../models/INote.interface';
import { t } from '@angular/core/src/render3';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})

export class NoteComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService
    ) { }

  apiUrl = environment.API_BASE_URL;
  note: INote;
  sub: any;

  ngOnInit() {
    this.note = {} as INote;
    this.sub = this.route.params.subscribe(params => {
      this.api.fetchOne('notes', +params['id']).subscribe((res: INote) => {
        this.note = res;
      });
    });
  }

  deleteNote() {
    this.api.deleteNote(this.note.id).subscribe((res: any) => {
      this.router.navigate(['/']);
    });
  }

}
