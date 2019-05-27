import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  constructor(
    private tokenService: AngularTokenService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
    ) {
    this.editorForm = this.fb.group({
      'subject': ['', Validators.required],
      'content': ['', Validators.required]
    });
  }

  editorForm: FormGroup;
  subject = new FormControl('', Validators.required);
  content = new FormControl('', Validators.required);
  apiUrl = environment.API_BASE_URL;
  processing = false;

  ngOnInit() { }

  get f() { return this.editorForm.controls; }

  onSubmit() {
    this.processing = true;
    if (this.editorForm.valid) {
      this.http.post(`${this.apiUrl}/notes`,
      { note: {
        subject: this.f.subject.value,
        body: this.f.content.value
      }}).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['editor']);
        },
        err => {
          console.log(err);
        }
      );
    } else {
      document.getElementById('invalid').classList.remove('is-hidden');
      if (this.f.subject.value.length === 0) { document.getElementById('editor-subject').classList.add('is-danger'); }
      if (this.f.content.value.length === 0) { document.getElementById('editor-content').classList.add('is-danger'); }
      this.processing = false;
    }
  }

  removeFlag(field: string) {
    document.getElementById(`editor-${field}`).classList.remove('is-danger');
  }

}
