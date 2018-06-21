import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() { //ACA SE VERIFICARIA EL ACCESO A LAS PAGINAS DEPENDIENDO EL PERFIL
    	return true;
        /*if (localStorage.getItem('isLoggedin')) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;*/
    }
}
