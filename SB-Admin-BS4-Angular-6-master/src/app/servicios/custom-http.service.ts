import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpService {

  url: string = 'https://tplab4.herokuapp.com/';
  token: string;

  constructor(public http: HttpClient) { }

  runGet(endPoint: string){
  	return this.http.get(`${this.url}${endPoint}`);        
  }

  runGetWhitParam(endPoint: string, id: any){
    return this.http.get(`${this.url}${endPoint}/${id}`); 
  }

  runPost(endPoint: string, data: any){
    return this.http.post(`${this.url}${endPoint}`, data, this.getHeaders());
  }

  runDelete(endPoint: string, id: any, car: any){
    return this.http.put(`${this.url}${endPoint}/${id}`, car, this.getHeaders());
  }

  runUpdate(endPoint: string, id: any, car: any){
    return this.http.put(`${this.url}${endPoint}/${id}`, car, this.getHeaders());
  }

  runPostFormData(endPoint: string, file: any){
    return this.http.post(`${this.url}${endPoint}`, file);
  }

  private getHeaders(){
    let token =  JSON.parse(localStorage.getItem('user')).token;
    return { headers: new HttpHeaders({'Authorization': 'Bearer '+token,'Content-Type': 'application/json'}) };
  }

}
