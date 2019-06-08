import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularTokenModule } from 'angular-token';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditorComponent } from './editor/editor.component';
import { SettingsComponent } from './settings/settings.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ResultsComponent } from './results/results.component';
import { SearchService } from './services/search.service';
import { ApiService } from './services/api.service';
import { FlashComponent } from './shared/flash/flash.component';
import { NoteComponent } from './note/note.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { ResultsListComponent } from './shared/results-list/results-list.component';
import { ResultsListEmptyComponent } from './shared/results-list-empty/results-list-empty.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EditorComponent,
    SettingsComponent,
    NavigationComponent,
    FooterComponent,
    ResultsComponent,
    FlashComponent,
    LoaderComponent,
    NoteComponent,
    ResultsListComponent,
    ResultsListEmptyComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularTokenModule.forRoot({
      apiBase: environment.API_BASE_URL,
      signOutFailedValidate: true,
      signInRedirect: 'login',
      registerAccountCallback: undefined
    })
  ],
  providers: [
    AngularTokenModule,
    SearchService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
