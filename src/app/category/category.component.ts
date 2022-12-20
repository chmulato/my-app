import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { DialogComponent } from '../dialog/dialog.component';
import { Category } from '../model/category';
import { CategoryService } from '../service/category.service';
import { SnackBarService } from '../service/snack-bar.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'actions'];
  
  dataSource: Category[];

  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService,
    private snackBarService: SnackBarService
  ) { 
      this.dataSource = [];
    }

  ngOnInit(): void {
    this.loadAllCategories();
  }

  private loadAllCategories() {
    this.categoryService.getAllCategories().subscribe((resp: Category[]) => {
      this.dataSource = resp;
      }, (error: any) => {
        console.log(`Ocorreu um erro ocorreu para chamar a API ${error}`);
      });
  }

  editCategory(inputCategory: Category) {
    this.dialog.open(CategoryEditComponent, { disableClose: false, 
      data: { editableCategory: inputCategory } }).afterClosed().subscribe(
      resp => {
        if (resp) {
          this.loadAllCategories();
          this.snackBarService.showSnackBar('Categoria editada com sucesso!', 'OK');
        } else {
          console.log('Categoria não editada!');
        }
      }
    )
  }

  deleteCategory(category: Category) {
    this.dialog.open(DialogComponent, { disableClose: false, 
      data: { dialogMessage: 'Você tem certeza que deseja apagar a Categoria?', leftButtonLabel: 'Cancelar', rightButtonLabel: 'OK' } }).afterClosed().subscribe(
      resp => {
        if (resp) {
          this.categoryService.deleteCategory(category.guid).subscribe(
            (resp: any) => {
              this.loadAllCategories();
              this.snackBarService.showSnackBar('Categoria apagada com sucesso!', 'OK');
            }, (err: any) => {
              this.snackBarService.showSnackBar('Não foi possível apagar a categoria, pois está em uso por um item de checklist!', 'OK');
            }
          );
        } else {
          console.log('Categoria não apagada!');
        }
      }
    );
  }

  createNewCategory() {
    this.dialog.open(CategoryEditComponent, { disableClose: false,
      data: { actionName: 'Criar' } }).afterClosed().subscribe(
      resp => {
        if (resp) {
          this.loadAllCategories();
          this.snackBarService.showSnackBar('Categoria criada com sucesso!', 'OK');
        } else {
          console.log('Categoria não criada!');
        }
      }
    );
  }

}
