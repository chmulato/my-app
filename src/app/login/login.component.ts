import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private emailDB: string = "suporte@caracore.com.br";
  private senhaDB: string = "123456";

  public mensagem: string | undefined;

  loginForm!: FormGroup;
  
  constructor(
    private router: Router, private formBuilder: FormBuilder) {
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      if (this.loginForm.value['email'] == this.emailDB && this.loginForm.value['senha'] == this.senhaDB) {
        this.router.navigate(['home']);
      } else {
        this.mensagem = "E-mail ou a senha estar errado!";
      }
    } else {
      this.mensagem = "E-mail ou a senha estar errado!";
    }
  }

  ngOnInit(): void {
    this.createForm();
  }

}
