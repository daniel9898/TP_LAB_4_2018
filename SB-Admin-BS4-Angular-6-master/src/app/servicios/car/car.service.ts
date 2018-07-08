import { Injectable } from '@angular/core';
import { CustomHttpService } from '../custom-http.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private miHttp: CustomHttpService) { }

  getAll(endPoint: string){
    return this.miHttp.runGet(endPoint);
  }

  save(endPoint: string, data: any){
    return this.miHttp.runPost(endPoint, data);
  }

  update(endPoint: string, car: any){
    return this.miHttp.runUpdate(endPoint,car._id, car);
  }

  delete(endPoint: string, car: any){
    return this.miHttp.runDelete(endPoint,car._id, car);
  }
}
