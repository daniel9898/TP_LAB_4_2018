import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
    imports: [
       CommonModule,
       LoginRoutingModule,
       FormsModule,
       NgxSpinnerModule,
       ReactiveFormsModule,
       RecaptchaModule.forRoot(),
       ],
    declarations: [LoginComponent]
})
export class LoginModule {}
