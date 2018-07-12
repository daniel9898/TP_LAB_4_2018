import { Injectable } from '@angular/core';
import { CustomHttpService } from '../custom-http.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private miHttp: CustomHttpService) { }

  uploadFile(endPoint: string,file: any){
    return this.miHttp.runPostFormData(endPoint, file);
  }
}
