import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs/Subscription";
import { TripService } from '../../../servicios/trip/trip.service';
import { ReservService } from '../../../servicios/reserv/reserv.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

	paramSubs : Subscription;
	user : any;
	action : string;
	endPoint : string;
	list : any;
	
	constructor(private act_router: ActivatedRoute,
		        private router: Router,
		        private _trip: TripService,
		        private _reserv: ReservService) {}

	ngOnInit() {
	    this.user = JSON.parse(localStorage.getItem('user')).user;
	    this.paramSubs = this.act_router.params.subscribe(
		    params => {
		        this.action = params.button;
		        this.defineListToRender();
		    },
		    error =>  console.log('error', error)
	   );
	}
	//Asignar -- encargado -- reservas pendientes
	//Viajes -- encargado -- todos los viajes
	//Asignaciones -- chofer -- sus viajes en estado pendiente
	//Historial -- chofer/cliente -- sus viajes en estado finalizado
	async defineListToRender(){
		console.log('listar : ',this.action);
		try{

		    if(this.action === 'Asignar'){
		       this.endPoint = 'reserv';
		       this.getReservs();
			}
			if(this.action === 'Viajes' && this.user.profile === 'admin'){
			   this.endPoint = 'trips';
		       this.getAlltrips();
			}
			if(this.action === 'Asignaciones'){
			   this.endPoint = 'trips';
               this.getAssignedTrips();
			}
		    if(this.action === 'Historial'){
				
			}

		}catch(e){
          console.log('error en defineListToRender',e.message);
		}

	}

	async getAssignedTrips(){
	   let resp : any = await this._trip.getAssigned(this.endPoint,this.user._id,'pendiente').toPromise();
       this.list = resp.trips;
       console.log('VIAJES ASIGNADOS: ',this.list);

	}

	async getAlltrips(){
	   let resp : any = await this._trip.getAll(this.endPoint).toPromise();
       this.list = resp.trips;
       console.log('VIAJES : ',this.list);
	}

	async getReservs(){
       let resp : any = await this._reserv.getAllbyCondition(this.endPoint,null,'pendiente').toPromise();
       this.list = resp.reservs;
	}

	goToReservView(reserv:any){
       console.log('reserva seleccionada ',reserv);
       this.router.navigate(['dashboard/view/assign',{reserv: JSON.stringify(reserv), action:this.action}]);
	}

	goToTripView(trip:any){

	}


}
