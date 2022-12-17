import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChecklistItem } from '../model/checklist_item';

export const CHECKLIST_DATA = [

  { guid: 'aaa-bbb-ccc-ddd', completed: false, description: 'Ir ao oftalmologista', deadline: new Date(), postDate: new Date(),
    category: { guid: 'aaa-bbb-ccc-dddd', name: 'Saúde' }
  },
  { guid: 'aaa-bbb-ccc-fff', completed: true, description: 'Reunião com o gerente', deadline: new Date(), postDate: new Date(),
    category: { guid: 'aaa-bbb-ccc-dddf', name: 'Trabalho' }
  }

];

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor() { }

  getAllChecklistItems(): Observable<ChecklistItem[]> {
    return of(CHECKLIST_DATA);
  }

}