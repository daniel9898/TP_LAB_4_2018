import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {

	//'AIzaSyBler0kWXTrnFDMtfcapTesNBgRLZt6EPw'

    constructor(public _http: Http) { }

	getPlace(lat:number, lng:number){
	   
	    let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat +","+ lng + "&key=AIzaSyBler0kWXTrnFDMtfcapTesNBgRLZt6EPw";
	    return this._http.get(url).toPromise();
	}

  //METODO -> OBTENER COORDENADAS (a partir de una dirección)
    /*obtenerCoordenadas(direccion:string){
        let promesa = new Promise<number[]>((resolve, reject)=>{
        let url = "https://maps.googleapis.com/maps/api/geocode/json?address="+ direccion +"&key=" + environment.geocoding.apiKey;
        this._http.get(url)
            .subscribe( (data:any) =>{
                let latlng:number[] = [data.json().results[0].geometry.location.lat, data.json().results[0].geometry.location.lng];
                console.log("LatLng: " + latlng);
                resolve(latlng);
          }, error=>{
            console.log("ERROR! al obtener coordenadas: " + error);
          });
    });
    return promesa;
  }*/

}
