import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpService {

  url: string = 'https://tplab4.herokuapp.com/';

  constructor(public http: Http) { }

  runGet(endPoint: string){
  	return this.http.get(`${this.url}${endPoint}`);        
  }

  runPost(endPoint: string, data: any){
    return this.http.post(`${this.url}${endPoint}`,data);
  	                /*.pipe( map((response: any) => response.json())),
  	                       catchError(err => Observable.throw(err.json().error || 'Server error'));*/
  }

}
