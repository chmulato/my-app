import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  isDisabled: boolean;

  constructor() { 
    this.isDisabled = false;
  }

  ngOnInit(): void {
  }

  disableButton() {
    if (this.isDisabled) {
      this.isDisabled = false;
    }
    else {
      this.isDisabled = true;
    }
  }
}
