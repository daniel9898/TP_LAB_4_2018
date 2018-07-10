import { Injectable } from '@angular/core';
import { CustomHttpService } from '../custom-http.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private miHttp: CustomHttpService) { }


  send(endPoint: string,file: any){
    return this.miHttp.runPostFormData(endPoint, file);
  }


}
