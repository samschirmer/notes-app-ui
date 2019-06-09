import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularTokenService } from 'angular-token';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EditorComponent } from './pages/editor/editor.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ResultsComponent } from './pages/results/results.component';
import { NoteComponent } from './pages/note/note.component';
import { CategoriesComponent } from './pages/categories/categories.component';

const routes: Routes = [
  { path: '', redirectTo: 'editor', pathMatch: 'full', canActivate: [AngularTokenService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'note/:id', component: NoteComponent, canActivate: [AngularTokenService] },
  { path: 'editor', component: EditorComponent, canActivate: [AngularTokenService] },
  { path: 'editor/:id', component: EditorComponent, canActivate: [AngularTokenService] },
  { path: 'settings', component: SettingsComponent, canActivate: [AngularTokenService] },
  { path: 'category/:id', component: CategoriesComponent, canActivate: [AngularTokenService] },
  { path: 'results', component: ResultsComponent, canActivate: [AngularTokenService] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }


