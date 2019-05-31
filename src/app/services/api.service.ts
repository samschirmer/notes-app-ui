import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../models/ICategory.interface';

const baseUrl = environment.API_BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor (private http: HttpClient) { }

  fetch(path: string): Observable<object> {
    return this.http.get(`${baseUrl}/${path}`).pipe(map(response => response));
  }

  createCategory(name: string): Observable<any> {
    return this.http.post(`${baseUrl}/categories`, {category: { name: name, status: 1 }}).pipe(map(response => response));
  }
}
