import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { UsuariosService } from '../servicios/usuarios.service';
import { Router } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import { ValidatePassword } from './password.validator';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent{

  rForm: FormGroup;
  warning : boolean = false;
  warningMsg : string;
  notFocused = false;


  constructor(public usrService: UsuariosService,
              private fb: FormBuilder,
              private router: Router,
              private spinner: NgxSpinnerService) {

    this.getUser('users');
    this.setFormValidator();
  }

  resolved(captchaResponse: string) {
      console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

  setFormValidator(){
    this.rForm = this.fb.group({
      'name' : ['test001',  Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      'lastName' : ['test001', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      'email' : ['1test@test.com',  Validators.compose([Validators.required, Validators.email])],
      'password' : ['test0001', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])],
      'password2' : ['test0001',Validators.compose([Validators.required,ValidatePassword,Validators.minLength(4), Validators.maxLength(15)])]
    });
  }

  get confirmPassword() {
    return this.rForm.get('password2');
  }

  getUser(endPoint: string) {
  	this.usrService.getUsers(endPoint).subscribe(users => console.log(users.json()),
                                                 error => console.log(error.json()));
  }

  signUp(){
    
    this.spinner.show();
    console.log(this.rForm.value);
    let user = this.rForm.value;
    delete user.password2;
 
    this.usrService.saveUser('signup',user).subscribe(
        usersUpdated => {
            this.rForm.reset();
            console.log(usersUpdated.json());//NO DEBERIA RETORNAR EL PASS Y ID 
            let strUser = JSON.stringify(usersUpdated);
            localStorage.setItem('user',strUser);
            //this.router.navigate(['cliente'],{ queryParams: { user: usersUpdated.user} });
            this.spinner.hide();
            this.router.navigate(['']);
        },
        err => {
            this.notFocused = true;
            this.spinner.hide();
            this.warningMsg = 'Correo Electronico o contraseña incorrecta...reintente por favor.';
            console.log('ERROR ',err.json());
        } 
    )
  }
   
  //PARA LAS TOSTADAS https://github.com/scttcper/ngx-toastr
 
}
