import { Component, OnInit } from '@angular/core';
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

  constructor() { 
    this.dataSource = CATEGORY_DATA;
  }

  ngOnInit(): void {
  }

  editCategory(category: Category) {
    console.log('Edit category clicked.');
  }

  deleteCategory(category: Category) {
    console.log('Delete category clicked.');
  }

  createNewCategory() {
    console.log('Create new category clicked.');
  }

}
