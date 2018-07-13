import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { routerTransition } from '../../router.animations';

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

    autocomplete: any;
    address: any = {};
    center: any;

    //[43.73154789999999, -79.7449296972229]

    constructor(private ref: ChangeDetectorRef) {}

    ngOnInit() {
      //this.center = 'Tokio, Japón';

    }

    initialized(autocomplete: any) {
        this.autocomplete = autocomplete;
    }

    placeChanged(place:any, type:string) {
        console.log(place,type);
        this.setDataLocation(place,type);       
  
        this.center = place.geometry.location;
        for (let i = 0; i < place.address_components.length; i++) {
              let addressType = place.address_components[i].types[0];
              this.address[addressType] = place.address_components[i].long_name;
        }

        this.ref.detectChanges();
    }

    setDataLocation(place:any, type:string){

        if(type == 'ori'){
            this.reserv.origin = place.formatted_address;
            this.reserv.coord_origin.lat = place.geometry.location.lat();
            this.reserv.coord_origin.lon = place.geometry.location.lng();
        }else{
            this.reserv.destiny = place.formatted_address;
            this.reserv.coord_destiny.lat = place.geometry.location.lat();
            this.reserv.coord_destiny.lon = place.geometry.location.lng();
        }

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
          this.center =  new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
        });
    }

    log(event, str) {

        if (event instanceof MouseEvent) {
          return false;
        }
        console.log('event .... >', event, str);
    }

    save(){ 
       console.log(this.reserv);
    }
    
}




