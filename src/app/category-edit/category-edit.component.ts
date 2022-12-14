import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../model/category';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  editableCategory: Category;
  actionName: string;

  constructor(private dialogRef: MatDialogRef<CategoryEditComponent>, @Inject(MAT_DIALOG_DATA) dialogData: any) { 

    this.editableCategory = new Category();
    this.actionName = 'Editar';

    if(dialogData.editableCategory != null) {
     this.editableCategory = dialogData.editableCategory; 
    }

    if(dialogData.actionName != null) {
      this.actionName = dialogData.actionName;
    }
  }

  ngOnInit(): void {
  }

  closeModalWindow($event: any) {
    //TODO handle action - save/cancel
    if($event) {
      this.dialogRef.close();
    } 
  }
}
