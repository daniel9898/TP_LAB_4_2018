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

  runGetWhitParam(endPoint: string, param: string){
    return this.http.get(`${this.url}${endPoint}/${param}`); 
  }

  runGetWhitParams(endPoint: string, p1: string, p2: string){
    return this.http.get(`${this.url}${endPoint}/${p1}/${p2}`); 
  }

  runGetWhitFilters(endPoint: string, filters : any){
    return this.http.get(`${this.url}${endPoint}`,{params: filters}); 
  }

  runPost(endPoint: string, object: any){
    return this.http.post(`${this.url}${endPoint}`, object, this.getHeaders());
  }

  runDelete(endPoint: string, id: any, object: any){
    return this.http.put(`${this.url}${endPoint}/${id}`, object, this.getHeaders());
  }

  runUpdate(endPoint: string, id: any, object: any){
    return this.http.put(`${this.url}${endPoint}/${id}`, object, this.getHeaders());
  }

  runPostFormData(endPoint: string, file: any){
    return this.http.post(`${this.url}${endPoint}`, file);
  }

  private getHeaders(){
    let token =  JSON.parse(localStorage.getItem('user')).token;
    return { headers: new HttpHeaders({'Authorization': 'Bearer '+token,'Content-Type': 'application/json'}) };
  }

}
