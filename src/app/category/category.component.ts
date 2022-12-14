import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
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

  editCategory(inputCategory: Category) {

    this.dialog.open(CategoryEditComponent, { disableClose: false, 
      data: { editableCategory: inputCategory, actionName: 'Editar' } }).afterClosed().subscribe(
      resp => {
        if (resp) {
          console.log('Categoria editada com sucesso!');
        } else {
          console.log('Categoria não editada!');
        }
      }
    )
  }

  deleteCategory(category: Category) {

    this.dialog.open(DialogComponent, { disableClose: false, 
      data: { dialogMessage: 'Você tem certeza que deseja apagar a Categoria?', leftButton: 'Cancelar', rightButton: 'Sim' } }).afterClosed().subscribe(
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
