import { Injectable } from '@angular/core';
import { CustomHttpService } from '../custom-http.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private miHttp: CustomHttpService) { }

  getCars(endPoint: string){
    return this.miHttp.runGet(endPoint);
  }

  saveCar(endPoint: string, data: any){
    return this.miHttp.runPost(endPoint, data);
  }

  getCar(endPoint: string, data: any){
    return this.miHttp.runPost(endPoint, data);
  }
}
