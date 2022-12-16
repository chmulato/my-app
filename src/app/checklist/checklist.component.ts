import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CATEGORY_DATA } from '../category/category.component';
import { ChecklistEditComponent } from '../checklist-edit/checklist-edit.component';
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

  createNewChecklistItem() {
    console.log('Create new checklist Item clicked.');

    this.dialog.open(ChecklistEditComponent, { disableClose: false,
      data: { actionName: 'Criar' } }).afterClosed().subscribe(
      resp => {
        if (resp) {
          console.log('Checklist Item criado com sucesso!');
        } else {
          console.log('Checklist Item não criado!');
        }
      }
    )
  }

  updateChecklistItem(checklistItem: ChecklistItem) {
    console.log(`Atualizar item ${checklistItem.guid}`);

    this.dialog.open(ChecklistEditComponent, { disableClose: false, 
      data: { updatableChecklistitem: checklistItem, actionName: 'Editar' } })
      .afterClosed().subscribe(
      resp => {
        if (resp) {
          console.log('Checklist item editado com sucesso!');
        } else {
          console.log('Checklist item não editado!');
        }
      }
    )
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
