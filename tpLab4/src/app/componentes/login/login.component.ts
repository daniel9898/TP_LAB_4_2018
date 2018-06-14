import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { UsuariosService } from '../../servicios/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  rForm: FormGroup;
  name : string;
  lastName: string;
  email: string;
  password: string;
  Confpassword: string;
  remember: Boolean;
  titleAlert:string = 'Campo Obligatorio';
  emailAlert:string = 'Email Incorrecto';
  validateEmail = "[a-zA-Z0-9._-]+[@]+[a-zA-Z0-9-]+[.]+[a-zA-Z]{2,6}";
  spinner : boolean = false;


  constructor(public usrService: UsuariosService,
              private fb: FormBuilder,
              private router: Router) {

   
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
    this.usrService.getUsers(endPoint).subscribe(
       users => console.log(users)
    )
  }

  signUp(){

    this.spinner = true;
    console.log(this.rForm.value);
    let user = this.rForm.value;
 
    this.usrService.saveUser('signup',user).subscribe(
        usersUpdated => {
            this.rForm.reset();
            /*console.log(usersUpdated);//NO DEBERIA RETORNAR EL PASS Y ID 
            let strUser = JSON.stringify(usersUpdated);
            localStorage.setItem('user',strUser);
            this.router.navigate(['cliente'],{ queryParams: { user: usersUpdated.user} });*/
        },
        err => {
            this.spinner = false;
            console.log(err);
        } 
    )
  }
   
  //PARA LAS TOSTADAS https://github.com/scttcper/ngx-toastr
  signIn(){
    console.log('signIn');
  }



 
 
}
