import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../model/category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  @Input() editableCategory: Category | undefined;
  @Input() actionName: string;

  @Output() closeModalEventEmitter: EventEmitter<boolean> | undefined;
  
  categoryForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.categoryForm = this.formBuilder.group({
      name: ''
    });
    this.actionName = 'Editar';
    this.closeModalEventEmitter = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
  }

  cancel() {
    console.log('Cancelar ao clicar!');
    this.closeModalEventEmitter?.emit(false);
  }

  save() {
    console.log('Salvar ao clicar!');
    this.closeModalEventEmitter?.emit(true);
  }
}
