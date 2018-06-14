import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// importo del module principal
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../componentes/login/login.component';
import { PresentacionComponent } from '../componentes/presentacion/presentacion.component';
import { PrincipalComponent } from '../componentes/cliente/principal/principal.component';

const MiRuteo = [

{path: '' , component: PresentacionComponent},
{path: 'login' , component: LoginComponent},
{path: 'cliente' , component: PrincipalComponent},

];

@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutesModule { }
