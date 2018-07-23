import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
//import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';

import { HttpModule } from '@angular/http';
import { CustomHttpService } from './servicios/custom-http.service';
import { UsuariosService } from './servicios/user/usuarios.service';
import { CarService } from './servicios/car/car.service';
import { ReservService } from './servicios/reserv/reserv.service';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [AppComponent],
    providers: [AuthGuard,UsuariosService,CustomHttpService,CarService,ReservService],
    bootstrap: [AppComponent]
})
export class AppModule {}
