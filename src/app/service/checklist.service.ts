import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChecklistItem } from '../model/checklist_item';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor(private httpClient: HttpClient) { }

  getAllChecklistItems(): Observable<ChecklistItem[]> {
    return this.httpClient.get<ChecklistItem[]>(`${environment.apiBaseEndpointUrl}checklist-items`);
  }

  saveChecklistItems(checklistItem: ChecklistItem): Observable<string> {
    return this.httpClient.post<string>(`${environment.apiBaseEndpointUrl}checklist-items`, checklistItem);
  }

  updateChecklistItems(checklistItem: ChecklistItem): Observable<void> {
    return this.httpClient.put<void>(`${environment.apiBaseEndpointUrl}checklist-items`, checklistItem);
  }

  deleteChecklistItems(guid: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiBaseEndpointUrl}checklist-items/${guid}`);
  }

}
