import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'; 

@Injectable()
export class UsuariosService {
 
  constructor(public miHttp: HttpService) { }
  
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
