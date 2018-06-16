import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { UsuariosService } from '../servicios/usuarios.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent{

  rForm: FormGroup;
  name : string;
  lastName: string;
  email: string;
  password: string;
  Confpassword: string;
  remember: Boolean;
  titleAlert:string = 'Ingrese este campo por favor';
  emailAlert:string = 'Email Incorrecto';
  validateEmail = "[a-zA-Z0-9._-]+[@]+[a-zA-Z0-9-]+[.]+[a-zA-Z]{2,6}";
  spinner : boolean = false;


  constructor(public usrService: UsuariosService,
              private fb: FormBuilder,
              private router: Router) {

    this.getUser('users');
    this.rForm = fb.group({
      'name' : ['test001',  Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      'lastName' : ['test001', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      'email' : ['1test@test.com',  Validators.pattern(this.validateEmail)],
      'password' : ['test001', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])],
      'Confpassword' : ['test0001',Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])],
      'remember' : ['test001',''],
    });
  }

  getUser(endPoint: string) {
  	let users = this.usrService.getUsers(endPoint);
  	console.log(users)
    /*this.usrService.getUsers(endPoint).subscribe(
       users => console.log(users)
    )*/
  }

  signUp(){

    this.spinner = true;
    console.log(this.rForm.value);
    let user = this.rForm.value;
 
    /*this.usrService.saveUser('signup',user).subscribe(
        usersUpdated => {
            this.rForm.reset();
            console.log(usersUpdated);//NO DEBERIA RETORNAR EL PASS Y ID 
            let strUser = JSON.stringify(usersUpdated);
            localStorage.setItem('user',strUser);
            this.router.navigate(['cliente'],{ queryParams: { user: usersUpdated.user} });
        },
        err => {
            this.spinner = false;
            console.log(err);
        } 
    )*/
  }
   
  //PARA LAS TOSTADAS https://github.com/scttcper/ngx-toastr
  signIn(){
    console.log('signIn');
  }
}
