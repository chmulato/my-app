import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CATEGORY_DATA } from '../category/category.component';
import { DialogComponent } from '../dialog/dialog.component';
import { ChecklistItem } from '../model/checklist_item';

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

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  createNewItem() {
    console.log('Create a new item of checklist clicado!');
  }

  updateCompleteStatus(status: boolean) {
    console.log(`Status alterado ${status}`);
  }

  updateChecklistItem(checklist: ChecklistItem) {
    console.log(`Atualizar item ${checklist.guid}`);
  }

  deleteChecklistItem(checklist: ChecklistItem) {
    console.log(`Apagar item ${checklist.guid}`);

    this.dialog.open(DialogComponent, { disableClose: false, data: {
      dialogMessage: 'Você deseja realmente apagar esta tarefa?', leftButtonLabel: 'Cancelar', rightButtonLabel: 'OK'}
    }).afterClosed().subscribe(
      resp => {
        if (resp) {
          console.log('Checklist apagado com sucesso!');
        } else {
          console.log('Checklist não apagado!');
        }
      })
  }
}
