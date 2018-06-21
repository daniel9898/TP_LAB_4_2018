import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';

import { SignupComponent } from './signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),

  ],
  declarations: [SignupComponent]
})
export class SignupModule { }
