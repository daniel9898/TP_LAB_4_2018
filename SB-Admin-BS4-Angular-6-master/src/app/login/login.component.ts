import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { UsuariosService } from '../servicios/user/usuarios.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnDestroy{

	rForm: FormGroup;
	warning : boolean = false;
	warningMsg : string;
	notFocused = false;
  userSubs:Subscription;

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
	      'email' : ['daniel@admin.com',  Validators.compose([Validators.required, Validators.email])],
	      'password' : ['123456', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])],
	    });
  }

  onLoggedin() {
    	this.spinner.show();
      let user = this.rForm.value;
      this.userSubs = this.usrService.signIn('signin',user).subscribe(
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

  ngOnDestroy() {
    if(this.userSubs){
       this.userSubs.unsubscribe();
    }
  }
}
