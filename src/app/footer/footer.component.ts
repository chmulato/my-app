import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  copywrite: string;

  constructor() { 
    this.copywrite = "Desenvolvido por mim!";
  }

  ngOnInit(): void {
  }

}
