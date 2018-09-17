import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs/Subscription";
import { DirectionsRenderer } from '@ngui/map';
import { UsuariosService } from '../../../servicios/user/usuarios.service';
import { TripService } from '../../../servicios/trip/trip.service';

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
    driver_id : string = 'Seleccionar';
    car_selected : string;
    center: any;
    marker_origin : any;
    marker_destiny : any;
    direction: any;

    alert = {
        view : false,
        type : '',
        title : 'Informe',
        message: 'test 01'
    };

    block_button : boolean = false;
  
    constructor(private act_router: ActivatedRoute,
    	        private _user: UsuariosService,
                private _trip: TripService) {  }

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
    	   this.drivers = await this._user.getAvailablesDrivers('drivers',this.reserv.hour,this.reserv.date).toPromise();
    	   console.log('choferes disponibles', this.drivers); 
    	   this.header = 'Asigne un conductor';
    	   	
    	}

    }

    changeDriver(){
        console.log('driver ',this.driver_id);
    }

    async assignDriver(){
        console.log(this.driver_id);
        if(this.driver_id === 'Seleccionar'){
           this.showAlert('No a seleccionado ningún chofer para este viaje' ,'warning');
        }else{
            let trip = {
                reservation : this.reserv._id,
                driver : this.driver_id,
                date_created : new Date().toLocaleString()
            }

            try{
              console.log('VIAJE A CREAR : ',trip);
              let resp :any = await this._trip.save('trips',trip).toPromise(); 
              this.block_button = true;
              this.showAlert(resp.message, 'success');
            }catch(e){
              this.showAlert(e.message, 'danger');
            }
            
        }

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

    showAlert(message:any,type:string){
        this.alert.type = type;
        this.alert.message = message;
        this.alert.title = 'Informe : ';
        this.alert.view = true;
    }

    get toogleHeader(){
    	return this.header;
    }

}
