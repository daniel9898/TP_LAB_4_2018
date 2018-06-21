import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { UsuariosService } from '../servicios/usuarios.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent {

	rForm: FormGroup;
	warning : boolean = false;
	warningMsg : string;
	notFocused = false;

  constructor(public usrService: UsuariosService,
              private fb: FormBuilder,
              public router: Router,
              private spinner: NgxSpinnerService) {

    this.setFormValidator();
  }

  resolved(captchaResponse: string) {
      console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

    
  setFormValidator(){
	    this.rForm = this.fb.group({
	      'email' : ['1test@test.com',  Validators.compose([Validators.required, Validators.email])],
	      'password' : ['test0001', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])],
	    });
  }

  onLoggedin() {
    	this.spinner.show();
      let user = this.rForm.value;
      this.usrService.signIn('signin',user).subscribe(
         user => {
            console.log(' user onLoggedin ',user.json());
            localStorage.setItem('user',JSON.stringify(user.json()));
            this.spinner.hide();
            this.router.navigate(['']);
         },
         error => {
            this.notFocused = true;
            this.warningMsg = error.json().message;
            console.log('ERROR ',error.json().message);
            this.spinner.hide();
         }

      )
  }
}
