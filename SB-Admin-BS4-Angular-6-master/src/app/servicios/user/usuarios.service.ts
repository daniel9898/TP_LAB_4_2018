import { Injectable } from '@angular/core';
import { CustomHttpService } from '../custom-http.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private miHttp: CustomHttpService) { }

  getAll(endPoint: string){
    return this.miHttp.runGet(endPoint);
  }

  save(endPoint: string, data: any){
    return this.miHttp.runPost(endPoint, data);
  }

  signIn(endPoint: string, data: any){
    return this.miHttp.runPost(endPoint, data);
  }

  update(endPoint: string, user: any){
    return this.miHttp.runUpdate(endPoint,user._id, user);
  }

  delete(endPoint: string, user: any){
    return this.miHttp.runDelete(endPoint,user._id, user);
  }

  uploadFile(endPoint: string, file: any){
     return this.miHttp.runPostFormData(endPoint,file);
  }


}
