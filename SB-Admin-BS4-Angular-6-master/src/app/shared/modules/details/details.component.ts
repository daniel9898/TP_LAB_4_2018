import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs/Subscription";
import { DirectionsRenderer } from '@ngui/map';
import { UsuariosService } from '../../../servicios/user/usuarios.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
    
    paramSubs : Subscription;
    header : string;
    action : string;
    reserv : any;
    trip : any;

    drivers : any;
    driver_name :string = 'Sin asignar';
    id_driver : string = 'Seleccionar';
    car_selected : string;
    center: any;
    marker_origin : any;
    marker_destiny : any;
    direction: any;
  
    constructor(private act_router: ActivatedRoute,
    	        public _user: UsuariosService) {  }

  	getUser(){
		return JSON.parse(localStorage.getItem('user')).user;
	}

    ngOnInit() {
    	this.paramSubs = this.act_router.params.subscribe(
		    params => {
		    	this.defineDetailToRender(params);
		    	setTimeout(this.setMap.bind(this),1000);
		    },
		    error => console.log('error', error)
	   );
    }
	//Asignar -- encargado -- reservas pendientes
	//Viajes -- encargado -- todos los viajes
	//Asignaciones -- chofer -- sus viajes en estado pendiente
	//Historial -- chofer/cliente -- sus viajes en estado finalizado
    async defineDetailToRender(params:any){
    	this.action = params.action;
    	if(this.action == 'Asignar'){
    	   this.reserv = JSON.parse(params.reserv);
    	   console.log('reserva', this.reserv);
    	   this.car_selected = this.reserv.car_selected != null ? `${this.reserv.car_selected.brand}-${this.reserv.car_selected.model}` : 'Ninguna.';  
    	   let resp : any = await this._user.getAllbyProfile('users/profile','chofer').toPromise();
    	   this.drivers = resp.users;
    	   console.log('choferes ', this.drivers); 
    	   this.header = 'Asigne un conductor';
    	   	
    	}

    }

    changeDriver(){
        console.log('driver ',this.id_driver);
    }

    setMap(){ //si es un viaje la reserva esta adentro
    	//if(){
    		this.marker_origin = new google.maps.LatLng(this.reserv.coord_origin.lat,this.reserv.coord_origin.lon);
    		this.marker_destiny = new google.maps.LatLng(this.reserv.coord_destiny.lat,this.reserv.coord_destiny.lon);
    		this.center = this.marker_destiny;
    		this.direction = {
    			provideRouteAlternatives: true,
	    		origin: this.marker_origin,
	            destination: this.marker_destiny,
	            travelMode: 'DRIVING'
    	    }
    	//}
    }

    get toogleHeader(){
    	return this.header;
    }

}
