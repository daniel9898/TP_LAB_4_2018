import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {

  url: string = 'https://tplab4.herokuapp.com/';

  constructor(public http: Http) { }

  runGet(endPoint: string){
  	return this.http.get(`${this.url}${endPoint}`)
  	                .map( ( res: Response ) => res.json())
	                .catch( ( err: any ) => Observable.throw(err.json().error || 'Server error'));
  }

  runPost(endPoint: string, data: any){
    return this.http.post(`${this.url}${endPoint}`,data)
                    .map( ( res: Response ) => res.json())
	                .catch( ( err: any ) => Observable.throw(err.json().error || 'Server error'));
  }
}
