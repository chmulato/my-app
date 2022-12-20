import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Category } from '../model/category';
import { CategoryService } from '../service/category.service';
import { SnackBarService } from '../service/snack-bar.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  @Input()
  editableCategory!: Category;
  @Input()
  actionName: string;

  @Output()
  closeModalEventEmitter!: EventEmitter<boolean>;
  
  @ViewChild(FormGroupDirective) categoryFormGroupDirective!: FormGroupDirective;
  
  isFormReady: boolean = false;

  categoryForm!: FormGroup;

    constructor(
      private formBuilder: FormBuilder,
      private categoryService: CategoryService,
      private snakbarService: SnackBarService
    ) {
      this.actionName = 'Editar';
      this.closeModalEventEmitter = new EventEmitter<boolean>;
   }

  ngOnInit(): void {
    if (this.editableCategory) {
      this.categoryForm = this.formBuilder.group({
        name: [this.editableCategory.name, Validators.required]
      })
    }
    else
    {
      this.categoryForm = this.formBuilder.group({
        name: ['', Validators.required]
      })
      this.isFormReady = true;
    }
  }

  save() {
    
    if (this.categoryForm.valid) {

      if (this.actionName == 'Editar') {

         let updatedCategory = {
          guid: this.editableCategory.guid,
          name: this.categoryForm.value['name']
        };
        
        this.categoryService.updateCategory(updatedCategory)
        .subscribe((resp: any) => {
            this.closeModalEventEmitter.emit(true);
          }, (err: any) => {
            this.snakbarService.showSnackBar('Não foi possível atualizar a categoria. Tente novamente!', 'OK');
          }
        );

      } else {
        
        this.categoryService.saveCategory(this.categoryForm.value)
        .subscribe((resp: any) => {
            this.closeModalEventEmitter.emit(true);
          }, (err: any) => {
            this.snakbarService.showSnackBar('Não foi possível criar a categoria. Tente novamente!', 'OK');
          }
        );

      }
      this.clearForm();
    }
  }

  cancel() {
    this.closeModalEventEmitter.emit(false);
  }

  private clearForm() {
    this.categoryForm.reset();
    this.categoryFormGroupDirective.resetForm();
  }
}
