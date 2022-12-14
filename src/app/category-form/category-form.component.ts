import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  actionName: string;

  categoryForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    this.categoryForm = this.formBuilder.group({
        name: 'Aluno'
    });

    this.actionName = 'Editar';
  }

  ngOnInit(): void {
  }

  cancel() {
    console.log('Cancelar ao clicar!');
  }

  save() {
    console.log('Salvar ao clicar!');
  }
}
