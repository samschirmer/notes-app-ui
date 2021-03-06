import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../models/ICategory.interface';
import { INote } from '../models/INote.interface';
import { IUser } from '../models/IUser.interface';

const baseUrl = environment.API_BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor (private http: HttpClient) { }

  fetch(path: string): Observable<object> {
    return this.http.get(`${baseUrl}/${path}`).pipe(map(response => response));
  }

  fetchOne(path: string, id: number): Observable<object> {
    return this.http.get(`${baseUrl}/${path}/${id}`).pipe(map(response => response));
  }

  fetchNoteForEditing(id: number): Observable<any> {
    return this.http.get(`${baseUrl}/notes/${id}/edit`).pipe(map(response => response));
  }

  fetchSettings(): Observable<object> {
    return this.http.get(`${baseUrl}/accounts/settings`).pipe(map(response => response));
  }

  updateAccountName(name: string): Observable<any> {
    return this.http.put(`${baseUrl}/accounts/name`, { account: { name: name } }).pipe(map(response => response));
  }

  createCategory(name: string): Observable<any> {
    return this.http.post(`${baseUrl}/categories`, {category: { name: name, status: 1 }}).pipe(map(response => response));
  }

  removeCategory(category: ICategory): Observable<any> {
    return this.http.put(
      `${baseUrl}/categories/${category.id}`,
      { category: { name: category.name, status: 0 }})
      .pipe(map(response => response));
  }

  noteUpdateCreate(noteId: number, note: INote): Observable<any> {
    if (noteId === 0) {
      return this.http.post(`${baseUrl}/notes`, { note: note }).pipe(map(response => response));
    } else {
      return this.http.put(`${baseUrl}/notes/${noteId}`, { note: note }).pipe(map(response => response));
    }
  }

  deleteNote(noteId: number): Observable<any> {
    return this.http.delete(`${baseUrl}/notes/${noteId}`).pipe(map(response => response));
  }

  addUser(u: IUser): Observable<Object> {
    return this.http.post(`${baseUrl}/auth`, u).pipe(map(response => response));
  }

  updateUserMetadata(u: IUser): Observable<Object> {
    return this.http.put(`${baseUrl}/users/${u.id}`, { user: u}).pipe(map(response => response));
  }

  removeUser(u: IUser): Observable<Object> {
    return this.http.delete(`${baseUrl}/users/${u.id}`).pipe(map(response => response));
  }
}
