import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';
import { ICategory } from '../models/ICategory.interface';

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
    private http: HttpClient,
    private api: ApiService
    ) {
    this.editorForm = this.fb.group({
      'category': [''],
      'subject': ['', Validators.required],
      'content': ['', Validators.required]
    });
    this.editorForm.controls['category'].setValue(1, {onlySelf: true});
  }

  editorForm: FormGroup;
  category = new FormControl('');
  subject = new FormControl('', Validators.required);
  content = new FormControl('', Validators.required);

  apiUrl = environment.API_BASE_URL;
  processing = false;
  categories: Array<ICategory>;
  firstCategory: number;


  ngOnInit() {
    this.categories = [{}] as Array<ICategory>;
    this.api.fetch('categories').subscribe((res: Array<ICategory>) => {
      this.categories = res;
    });
  }

  getFirstCategory() {
    this.firstCategory = this.categories[0].id;
    return this.firstCategory;
  }

  get f() { return this.editorForm.controls; }

  onSubmit() {
    this.processing = true;
    if (this.editorForm.valid) {
      this.http.post(`${this.apiUrl}/notes`,
      { note: {
        category_id: this.f.category.value,
        subject: this.f.subject.value,
        body: this.f.content.value
      }}).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['editor']);
          this.showFlash();
          this.editorForm.controls.subject.reset();
          this.editorForm.controls.content.reset();
          this.processing = false;
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

  async showFlash() {
    document.getElementById('flash-container').style.display = 'block';
    document.getElementById('flash-container').classList.add('flash-show');
    console.log('before wait');
    await this.delay(400);
    console.log('after wait');
    document.getElementById('flash-container').style.display = 'none';
    document.getElementById('flash-container').classList.remove('flash-show');
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  removeFlag(field: string) {
    document.getElementById(`editor-${field}`).classList.remove('is-danger');
  }

}
