import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Category } from '../model/category';
import { ChecklistItem } from '../model/checklist_item';
import { CategoryService } from '../service/category.service';
import { ChecklistService } from '../service/checklist.service';
import { SnackBarService } from '../service/snack-bar.service';

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

  categories: Category[];

  checklistForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private checklistService: ChecklistService,
    private snackbarService: SnackBarService
  ) { 
    this.categories = [];
    this.actionName = 'Editar';
    this.formCloseEvent = new EventEmitter<boolean>;
  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (resp: Category[]) => {
        this.categories = resp;
        this.createForm();
      }
    );
  }

  compareCategories(categoryOne: Category, categoryTwo: Category): boolean {
    return (categoryOne != null && categoryTwo != null) &&
           (categoryOne.guid == categoryTwo.guid) &&
           (categoryOne.name == categoryTwo.name);
  }

  private createForm() {
    this.checklistForm = this.formBuilder.group(
      {
      isCompleted: [ this.checklistItem != null ? this.checklistItem.isCompleted : false, Validators.required ],
      description: [ this.checklistItem != null ? this.checklistItem.description : '', Validators.required ],
      deadline: [this.checklistItem != null ? new Date(this.checklistItem.deadline): new Date(), Validators.required ],
      category: [this.checklistItem != null ? this.checklistItem.category : null, Validators.required ]
      }
    );
  }

  save() {

    if (this.checklistForm.valid) {

      if (this.actionName == 'Editar') {
      
        let updateableItem = {
          guid: this.checklistItem.guid,
          isCompleted: this.checklistForm.value['isCompleted'],
          description: this.checklistForm.value['description'],      
          deadline: this.checklistForm.value['deadline'],
          postedDate: new Date(),
          category: this.checklistForm.value['category']
        };

        this.checklistService.updateChecklistItems(updateableItem).subscribe(
          (resp: any) => {
            this.snackbarService.showSnackBar('Item do checklist atualizado com sucesso!','OK');
            this.formCloseEvent.emit(true);
          }, (err: any) => {
            this.snackbarService.showSnackBar('Erro ao atualizar o Item do checklist. Tente novamente!','OK');
          }
        );
      }
      else
      {
        this.checklistService.saveChecklistItems(this.checklistForm.value).subscribe(
          (resp: any) => {
            this.snackbarService.showSnackBar('Item do checklist criado com sucesso!','OK');
            this.formCloseEvent.emit(true);
          }, (err: any) => {
            this.snackbarService.showSnackBar('Erro ao criar o Item do checklist. Tente novamente!','OK');
          }
        );
      }
    }
  }

  cancel() {
    this.formCloseEvent.emit(false);
  }
}
