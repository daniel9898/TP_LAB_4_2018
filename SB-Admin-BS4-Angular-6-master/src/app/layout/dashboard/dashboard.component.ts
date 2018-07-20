import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DirectionsRenderer } from '@ngui/map';
import { GeocodeService } from '../../servicios/geocode/geocode.service';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})

export class DashboardComponent implements OnInit {

    selection = {
      date : '',
      time : ''
    }

    reserv : any = {
        date : '',
        hour : '',
        origin : '',
        destiny :'' ,
        coord_origin : {
            lat : '',
            lon : ''
        },
        coord_destiny : {
            lat : '',
            lon : ''
        },
        client : JSON.parse(localStorage.getItem('user')).user._id,
        state : 'pendiente',
        date_created : '',
        kilometers : '',
        duration : '', 
    }

    address: any = {};
    center: any;
    marker_origin : any;
    marker_destiny : any;
    default_origin : string;

    @ViewChild(DirectionsRenderer) directionsRendererDirective: DirectionsRenderer;
    directionsRenderer: google.maps.DirectionsRenderer;
    directionsResult: google.maps.DirectionsResult;
    direction: any = {
        provideRouteAlternatives : true,
        origin: {lat: 0, lng: 0},
        destination: {lat: 0, lng: 0},
        travelMode: 'DRIVING'
    };
    line = [];

 
    constructor(public _geocode:GeocodeService) {}

    ngOnInit() {
        this.default_origin = 'Mi ubicación';
        this.goMyUbication();
        this.directionsRendererDirective['initialized$'].subscribe( directionsRenderer => {
           this.directionsRenderer = directionsRenderer;
        });
    }

    showDirection() {
        this.directionsRendererDirective['showDirections'](this.direction);
    }

    directionsChanged() {
        this.directionsResult = this.directionsRenderer.getDirections();
        
        if (this.directionsResult['status'] == 'OK') {
            this.removePolyline();
    
            this.reserv.kilometers = this.directionsResult.routes[0].legs[0].distance.text;
            this.reserv.duration = this.directionsResult.routes[0].legs[0].duration.text;

            for(let i in this.directionsResult.routes) {
                
                this.line.push(new google.maps.Polyline({
                  path: this.directionsResult.routes[i].overview_path,
                  strokeColor: "#808080", 
                  strokeOpacity: 0.7,
                  strokeWeight: 3
                }));
               
                this.line[i].setMap(this.directionsRenderer.getMap());
            }
          }
    }

    addPolyline(){

    }
 
    removePolyline(){
        if(this.line.length > 0){
            for (var i = 0; i < this.line.length; i++) {
                this.line[i].setMap(null);
            }
            this.line = [];
        }
    }

    placeChanged(place:any, type:string) {
        console.log(place,type);
        
        if(place['geometry'] != null){

            this.setDataLocation(place,type);       
            this.center = place.geometry.location;

            for (let i = 0; i < place.address_components.length; i++) {
                  let addressType = place.address_components[i].types[0];
                  this.address[addressType] = place.address_components[i].long_name;
            }
        }
    }

    setDataLocation(place:any, type:string){

        if(type == 'ori'){
            this.marker_origin = place.geometry.location;
            this.reserv.origin = place.formatted_address;
            this.reserv.coord_origin.lat = place.geometry.location.lat();
            this.reserv.coord_origin.lon = place.geometry.location.lng();
            this.direction.origin = place.geometry.location;
        }else{
            this.marker_destiny = place.geometry.location;
            this.reserv.destiny = place.formatted_address;
            this.reserv.coord_destiny.lat = place.geometry.location.lat();
            this.reserv.coord_destiny.lon = place.geometry.location.lng();
            this.direction.destination = place.geometry.location;  
        }
        
        this.showDirection();
    }

    takeTime(time:any){
        this.selection.time = time.hour +':'+ time.minute;
        this.reserv.hour = this.selection.time;
    }

    takeDate(date:any){
        this.selection.date = date.day +'/'+ date.month +'/'+ date.year ;
        this.reserv.date = this.selection.date;
    }

    goMyUbication(){
        navigator.geolocation.getCurrentPosition( pos => {
            this.default_origin = 'Mi ubicación';
            this.center = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
            this.marker_origin = this.center;
            this.direction.origin = this.center;
            this.reserv.coord_origin.lat = pos.coords.latitude;
            this.reserv.coord_origin.lon = pos.coords.longitude;
            this.setPlace(pos.coords.latitude,pos.coords.longitude);
               
            if(this.direction.destination.lat != 0){
               this.showDirection(); 
            }
        });
    }

    async setPlace(lat:number, lng:number){
        try{
            let result = await this._geocode.getPlace(lat,lng);
            this.reserv.origin = result.json().results[0].formatted_address;
        }catch(e){
            console.log('error en getPlace ',e);
        }
    }

    save(){
       this.reserv.date_created = new Date().toLocaleString(); 
       console.log(this.reserv);
    }
    
}




