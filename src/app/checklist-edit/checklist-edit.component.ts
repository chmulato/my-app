import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChecklistItem } from '../model/checklist_item';

@Component({
  selector: 'app-checklist-edit',
  templateUrl: './checklist-edit.component.html',
  styleUrls: ['./checklist-edit.component.css']
})
export class ChecklistEditComponent implements OnInit {

  actionName: string;
  checklistItem!: ChecklistItem;


  constructor(private dialogRef: MatDialogRef<ChecklistEditComponent>, @Inject(MAT_DIALOG_DATA) dialogData: any) {
    
    this.actionName = 'Editar';
  
    if(dialogData.checklistItem != null) {
      this.checklistItem = dialogData.checklistItem; 
     }
 
     if(dialogData.actionName != null) {
       this.actionName = dialogData.actionName;
     }
 }

  ngOnInit(): void {
  }

  onFormClose($event: any) {
    //TODO handle action - save/cancel
    if($event) {
      this.dialogRef.close();
    } 
  }

}
