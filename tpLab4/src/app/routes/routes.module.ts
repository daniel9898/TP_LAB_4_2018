import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// importo del module principal
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../componentes/login/login.component';


// declaro donde quiero que se dirija
const MiRuteo = [
{path: 'login' , component: LoginComponent}];

@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutesModule { }
