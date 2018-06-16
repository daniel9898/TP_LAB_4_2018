import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(public miHttp: CustomHttpService) { }

  getUsers(endPoint: string){
    return this.miHttp.runGet(endPoint);
  }

  saveUser(endPoint: string, data: any){
    return this.miHttp.runPost(endPoint, data);
  }

  /*private extractData ( res: Response ){
    return res.json() || {};
  }

  private handleError ( error: Response | any ){
    return error;
  }*/
}
