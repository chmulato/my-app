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

  constructor(private dialogRef: MatDialogRef<ChecklistEditComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    
    this.actionName = 'Editar';
  
    if(data.updatableChecklistitem != null) {
      this.checklistItem = data.updatableChecklistitem; 
     }
 
     if(data.actionName != null) {
       this.actionName = data.actionName;
     }
 }

  ngOnInit(): void {
  }

  onFormClose($event: any) {
    //TODO handle action - save/cancel
    this.dialogRef.close($event);
  }

}
