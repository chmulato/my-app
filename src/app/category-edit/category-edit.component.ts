import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CategoryEditComponent>, @Inject(MAT_DIALOG_DATA) dialogData: any) { }

  ngOnInit(): void {
  }

}
