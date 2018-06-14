import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutesModule } from './routes/routes.module';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { HttpService } from './servicios/http.service'; 
import { UsuariosService } from './servicios/usuarios.service';
import { PresentacionComponent } from './componentes/presentacion/presentacion.component';
import { PrincipalComponent } from './componentes/cliente/principal/principal.component';

//import { ParticlesModule } from 'angular-particle';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PresentacionComponent,
    PrincipalComponent,
  ],
  imports: [
    BrowserModule,
    RoutesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  providers: [HttpService,UsuariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
