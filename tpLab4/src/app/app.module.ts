import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutesModule } from './routes/routes.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { HttpService } from './servicios/http.service'; 
import { UsuariosService } from './servicios/usuarios.service';
import { PresentacionComponent } from './componentes/presentacion/presentacion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PresentacionComponent
  ],
  imports: [
    BrowserModule,
    RoutesModule,
    FormsModule,
    HttpModule

  ],
  providers: [HttpService,UsuariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
