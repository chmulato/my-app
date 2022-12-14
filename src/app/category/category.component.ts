import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Category } from '../model/category';

export const CATEGORY_DATA = [
  { name: 'Educação', guid: 'aaa-bbb-ccc-dddd'},
  { name: 'Saúde', guid: 'aaa-bbb-ccc-dddd'},
  { name: 'Trabalho', guid: 'aaa-bbb-ccc-dddd'},
  { name: 'Outros', guid: 'aaa-bbb-ccc-dddd'}
];

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'actions'];
  
  dataSource : Category[];

  constructor(private dialog: MatDialog) { 
    this.dataSource = CATEGORY_DATA;
  }

  ngOnInit(): void {
  }

  editCategory(category: Category) {
    console.log('Edit category clicked.');
  }

  deleteCategory(category: Category) {

    this.dialog.open(DialogComponent, { disableClose: false, 
      data: { dialogMessage: '', leftButtonLabel: '', rightButtonLabel: '' } }).afterClosed().subscribe(
      resp => {
        if (resp) {
          console.log('Categoria apagada com sucesso!');
        } else {
          console.log('Categoria não apagada!');
        }
      }
    )
  }

  createNewCategory() {
    console.log('Create new category clicked.');
  }

}
