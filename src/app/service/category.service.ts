import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${environment.apiBaseEndpointUrl}categories`);
  }

  saveCategory(category: Category): Observable<string> {
    return this.httpClient.post<string>(`${environment.apiBaseEndpointUrl}categories`, category);
  }

  updateCategory(category: Category): Observable<void> {
    return this.httpClient.put<void>(`${environment.apiBaseEndpointUrl}categories`, category);
  }

  deleteCategory(guid: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiBaseEndpointUrl}categories/${guid}`);
  }
  
}
