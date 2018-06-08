import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { UsuariosService } from '../../servicios/usuarios.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  todo = {

  	name : '',
  	lastName:'',
    usrName: '',
  	email:'',
  	password:'',
  	Confpassword:'',
    remember:''

  }

  constructor(public usrService: UsuariosService) { 
    this.getUser('users');
  }

  getUser(endPoint: string) {
    this.usrService.getUsers(endPoint).subscribe(
       users => console.log(users)
    )
  }

  signUp(){
    console.log(this.todo);
    this.usrService.saveUser('users',this.todo).subscribe(
       usersUpdated => console.log(usersUpdated)
    )
  }

 
 
}
