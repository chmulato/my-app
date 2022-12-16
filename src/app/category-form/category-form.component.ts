import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Category } from '../model/category';

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
  
  categoryForm!: FormGroup;

    constructor(private formBuilder: FormBuilder) {
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
    }
  }

  private clearForm() {
    this.categoryForm.reset();
    this.categoryFormGroupDirective.resetForm();
  }

  save() {
    console.log('Salvar ao clicar!');
    this.closeModalEventEmitter.emit(true);
    this.clearForm();
  }

  cancel() {
    console.log('Cancelar ao clicar!');
    this.closeModalEventEmitter.emit(false);
  }
}
