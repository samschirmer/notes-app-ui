import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularTokenService } from 'angular-token';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditorComponent } from './editor/editor.component';
import { SettingsComponent } from './settings/settings.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  { path: '', redirectTo: 'editor', pathMatch: 'full', canActivate: [AngularTokenService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'editor', component: EditorComponent, canActivate: [AngularTokenService] },
  { path: 'settings', component: SettingsComponent, canActivate: [AngularTokenService] },
  { path: 'results', component: ResultsComponent, canActivate: [AngularTokenService] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }


