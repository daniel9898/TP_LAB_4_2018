import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http'; //ahcer el servicio

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  todo = {

  	name : '',
  	lastName:'',
  	email:'',
  	password:'',
  	Confpassword:''

  }

  constructor(public http: Http) { 

    this.httpGetP().then(succes => console.log(succes))
                   .catch(error => console.log(error))
  }

  ngOnInit() {
  }

  login(){
  	console.log(this.todo); 
  }

  httpGetP (){ //heroku : xappia19861978@   danielpereira19861978@gmail.com
    return this.http
    .get('https://tplab4.herokuapp.com/users') 
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }

   private extractData ( res: Response )
  {
    return res.json() || {};
  }

  private handleError ( error: Response | any )
  {
    return error;
  }


}
