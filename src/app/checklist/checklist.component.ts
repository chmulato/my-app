import { Component, OnInit } from '@angular/core';
import { CATEGORY_DATA } from '../category/category.component';

export const CHECKLIST_DATA = [

  { guid: 'aaa-bbb-ccc-ddd', completed: false, description: 'Ir ao oftalmologista', deadline: Date.now(), postDate: Date.now(),
    category: CATEGORY_DATA.find(x => x.name == 'Saúde')
  },
  { guid: 'aaa-bbb-ccc-fff', completed: true, description: 'Reunião com o gerente', deadline: Date.now(), postDate: Date.now(),
    category: CATEGORY_DATA.find(x => x.name == 'Trabalho')
  }
];

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {

  displayedColumns: string[] = ['id', 'completed', 'description', 'deadline', 'postDate', 'category', 'actions'];

  dataSource = CHECKLIST_DATA;

  constructor() { }

  ngOnInit(): void {
  }

  createNewItem() {
    console.log('Create a new item of checklist clicado!');
  }
}
