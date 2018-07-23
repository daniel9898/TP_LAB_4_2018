import { Injectable } from '@angular/core';
import { CustomHttpService } from '../custom-http.service';

@Injectable({
  providedIn: 'root'
})
export class ReservService {

  constructor(private miHttp: CustomHttpService) { }

  getAll(endPoint: string){
    return this.miHttp.runGet(endPoint);
  }

  save(endPoint: string, data: any){
    return this.miHttp.runPost(endPoint, data);
  }

  update(endPoint: string, reserv: any){
    return this.miHttp.runUpdate(endPoint,reserv._id, reserv);
  }

  delete(endPoint: string, reserv: any){
    return this.miHttp.runDelete(endPoint,reserv._id, reserv);
  }

}
