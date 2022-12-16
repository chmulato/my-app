import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { CATEGORY_DATA } from '../category/category.component';
import { Category } from '../model/category';
import { ChecklistItem } from '../model/checklist_item';

@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrls: ['./checklist-form.component.css']
})
export class ChecklistFormComponent implements OnInit {

  @Input()
  actionName: string;
  @Input()
  checklistItem!: ChecklistItem;

  @Output()
  formCloseEvent: EventEmitter<boolean>;

  @ViewChild(FormGroupDirective) checklistFormGroupDirective!: FormGroupDirective;

  categories!: Category[];

  checklistForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.actionName = 'Editar';
    this.formCloseEvent = new EventEmitter<boolean>;
    this.categories = CATEGORY_DATA;
  }

  ngOnInit(): void {
    if (this.checklistItem) {
      this.checklistForm = this.formBuilder.group({
        completed: [this.checklistItem.completed, Validators.required],
        description: [this.checklistItem.description, Validators.required],
        deadline: [this.checklistItem.deadline, Validators.required],
        category: [this.checklistItem.category, Validators.required]
      })
    }
    else
    {
      this.checklistForm = this.formBuilder.group({
        completed: [false, Validators.required],
        description: ['', Validators.required],
        deadline: [Date.now(), Validators.required],
        category: [null, Validators.required]
      })
    }
  }

  private clearForm() {
    this.checklistForm.reset();
    this.checklistFormGroupDirective.resetForm();
  }

  save() {
    console.log('Salvar ao clicar!');
    this.formCloseEvent.emit(true);
    this.clearForm();
  }

  cancel() {
    console.log('Cancelar ao clicar!');
    this.formCloseEvent.emit(false);
  }
}
