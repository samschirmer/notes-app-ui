import { Component, OnInit, HostListener } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../services/api.service';
import { ICategory } from '../../models/ICategory.interface';
import { INote } from '../../models/INote.interface';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
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

  messages = ['Got it', 'Cool', 'Saved', 'Success', 'Boom', 'Pop', 'ERROR -- nah just kidding'];
  apiUrl = environment.API_BASE_URL;
  processing = false;
  categories: Array<ICategory>;
  message = 'Boom';
  sub: any;
  note: INote;

  @HostListener('keydown', ['$event']) onKeyDown(e) {
    if (e.ctrlKey && e.keyCode === 13) {
      this.onSubmit();
    }
  }

  ngOnInit() {
    this.categories = [{}] as Array<ICategory>;
    this.note = { id: 0, subject: '', body: '', category: ''} as INote;
    (<HTMLInputElement>document.getElementById('nav-search')).value = '';
    this.api.fetch('categories').subscribe((res: Array<ICategory>) => { this.categories = res; });

    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        // DEBUG: this is a temporary hack: https://github.com/rails/rails/pull/36323
        this.delay(1000);
        this.api.fetchOne('notes', +params['id']).subscribe((res: INote) => {
          this.note = res;
          this.editorForm.patchValue({ category: this.note.category_id });
          this.editorForm.patchValue({ subject: this.note.subject });
          this.editorForm.patchValue({ content: this.note.body });
        });
      }
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterContentInit() {
    document.getElementById('editor-subject').focus();
  }

  get f() { return this.editorForm.controls; }

  onSubmit() {
    this.processing = true;
    document.getElementById('invalid').classList.add('is-hidden');
    if (this.editorForm.valid) {
      this.api.noteUpdateCreate(
        this.note.id, {
          category_id: this.f.category.value,
          subject: this.f.subject.value,
          body: this.f.content.value
        } as INote)
      .subscribe( (res: any) => {
        if (this.note.id > 0) {
          this.router.navigate(['note', this.note.id]);
        } else {
          this.router.navigate(['editor']);
        }
        this.processing = false;
        this.showFlash();
        this.editorForm.controls.subject.reset();
        this.editorForm.controls.content.reset();
        this.message = this.messages[Math.floor(Math.random() * this.messages.length)];
        document.getElementById('editor-subject').focus();
      });
    } else {
      // handling invalid form
      this.processing = false;
      document.getElementById('invalid').classList.remove('is-hidden');
      if (this.f.subject.value.length === 0) {
        document.getElementById('editor-subject').classList.add('is-weird-danger');
        document.getElementById('editor-subject').focus();
      }
      if (this.f.content.value.length === 0) {
        document.getElementById('editor-content').classList.add('is-danger');
      }
    }
  }

  async showFlash() {
    document.getElementById('flash-container').style.display = 'block';
    document.getElementById('flash-container').classList.add('flash-show');
    await this.delay(1000);
    if (document.getElementById('flash-container')) {
      document.getElementById('flash-container').style.display = 'none';
      document.getElementById('flash-container').classList.remove('flash-show');
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  removeFlag(field: string) {
    document.getElementById(`editor-${field}`).classList.remove('is-danger');
  }

}
