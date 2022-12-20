import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChecklistEditComponent } from '../checklist-edit/checklist-edit.component';
import { DialogComponent } from '../dialog/dialog.component';
import { ChecklistItem } from '../model/checklist_item';
import { ChecklistService } from '../service/checklist.service';
import { SnackBarService } from '../service/snack-bar.service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {

  displayedColumns: string[] = ['id', 'completed', 'description', 'deadline', 'postDate', 'category', 'actions'];

  dataSource: ChecklistItem[];

  constructor(
    private dialog: MatDialog,
    private checklistService: ChecklistService,
    private snackBarService: SnackBarService
    ) {   
      this.dataSource = [];  
     }

  ngOnInit(): void {
    this.checklistService.getAllChecklistItems().subscribe(
      (resp: ChecklistItem[]) => {
        this.dataSource = resp;
      }
    );
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
          this.snackBarService.showSnackBar('Checklist Item criado com sucesso!', 'OK');

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
          this.snackBarService.showSnackBar('Checklist Item editado com sucesso!', 'OK');

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
          this.snackBarService.showSnackBar('Checklist Item apagado com sucesso!', 'OK');

        } else {
          console.log('Checklist não apagado!');
        }
      })
  }
}
