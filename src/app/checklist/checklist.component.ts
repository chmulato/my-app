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
    this.loadAllItems();
  }

  private loadAllItems() {
    this.checklistService.getAllChecklistItems().subscribe(
      (resp: ChecklistItem[]) => {
        this.dataSource = resp;
      }, (error: any) => {
        console.log(`Occoreu um erro ao chamar a API: ${error}`)
      }
    );
  }

  updateCompleteStatus(guid: string, status: boolean) {
    this.checklistService.updateIsCompleteStatus(guid, status).subscribe(
      (resp: any) => {
          this.snackBarService.showSnackBar('Item atualizado com sucesso!', 'OK');
      }, (error: any) => {
        this.snackBarService.showSnackBar('Um erro ocorreu ao atualizar o item. Tente novamente!', 'OK');
      }
    );
  }

  createNewChecklistItem() {
    this.dialog.open(ChecklistEditComponent, { disableClose: false,
      data: { actionName: 'Criar' } }).afterClosed().subscribe(
      resp => {
        if (resp) {
          this.loadAllItems();
          //this.snackBarService.showSnackBar('Checklist Item criado com sucesso!', 'OK');
        } 
      }
    );
  }

  deleteChecklistItem(checklistItem: ChecklistItem) {
    this.dialog.open(DialogComponent, { disableClose: false, data: {
      dialogMessage: 'Você deseja realmente apagar esta tarefa?', leftButtonLabel: 'Cancelar', rightButtonLabel: 'OK'}
    }).afterClosed().subscribe(
      resp => {
        if (resp) {
          this.checklistService.deleteChecklistItems(checklistItem.guid).subscribe(
            (resp: any) => {
              this.snackBarService.showSnackBar('Checklist Item apagado com sucesso!', 'OK');
              this.loadAllItems();
            }, (err: any) => {
              this.snackBarService.showSnackBar('Um erro ocorreu ao apagar o item do checklist. Tente novamente!', 'OK');
            }
          );
        }
      });
  }

  updateChecklistItem(checklistItem: ChecklistItem) {
    this.dialog.open(ChecklistEditComponent, { disableClose: false, 
      data: { updatableChecklistitem: checklistItem, actionName: 'Editar' } })
      .afterClosed().subscribe(resp => {
        if (resp) {
          this.loadAllItems();
          //this.snackBarService.showSnackBar('Checklist Item editado com sucesso!', 'OK');
        }
      }
    );
  }
}
