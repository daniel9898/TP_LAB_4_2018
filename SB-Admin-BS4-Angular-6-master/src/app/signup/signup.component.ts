import { Component, OnDestroy } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { UsuariosService } from '../servicios/user/usuarios.service';
import { Router } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import { ValidatePassword } from './password.validator';
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnDestroy{

  rForm: FormGroup;
  warningMsg : string;
  notFocused = false;
  userSubs : Subscription; 
   
  constructor(public _user: UsuariosService,
              private fb: FormBuilder,
              private router: Router,
              private spinner: NgxSpinnerService) {

    this.setFormValidator();
  }

  resolved(captchaResponse: string) {
      console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

  //usuarios de prueba : daniel@admin.com,daniel@chofer.com,daniel@cliente.com

  setFormValidator(){
    this.rForm = this.fb.group({
      'name' : ['daniel',  Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      'lastName' : ['pereira', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      'email' : ['daniel@cliente.com',  Validators.compose([Validators.required, Validators.email])],
      'password' : ['123456', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])],
      'password2' : ['123456',Validators.compose([Validators.required,ValidatePassword,Validators.minLength(4), Validators.maxLength(15)])],
      'profile' : ['cliente'],
      'picture' : ['http://www.cwejournal.org/images/user.jpg'],
      'signUp' : []
    });
  }

  get confirmPassword() {
    return this.rForm.get('password2');
  }

  signUp(){
    
    this.spinner.show();
    console.log(this.rForm.value);
    let user = this.rForm.value;
    user.signUp = new Date().toLocaleString();
    delete user.password2;
 
    this.userSubs = this._user.save('signup',user).subscribe(
        (usersUpdated:any) => {
            this.rForm.reset();
            console.log(usersUpdated);//NO DEBERIA RETORNAR EL PASS Y ID 
            let strUser = JSON.stringify(usersUpdated);
            localStorage.setItem('user',strUser);
            this.spinner.hide();
            this.router.navigate(['']);
        },
        err => {
            this.notFocused = true;
            this.spinner.hide();
            this.warningMsg = 'Correo Electronico o contraseña incorrecta...reintente por favor.';
            console.log('ERROR ',err);
        } 
    )

  }

  ngOnDestroy() {
    if(this.userSubs){
       this.userSubs.unsubscribe();
    }
    
  }
   
  //PARA LAS TOSTADAS https://github.com/scttcper/ngx-toastr
 
}
