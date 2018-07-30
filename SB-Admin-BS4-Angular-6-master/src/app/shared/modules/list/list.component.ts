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

		    if(this.action == 'Asignar'){
		       this.endPoint = 'reserv/filter';
		       this.getReservs();
			}else{
          
			}

		}catch(e){
          console.log('error en defineListToRender',e.message);
		}

	}

	goToTripView(trip:any){

	}

	async getReservs(){
       let resp : any = await this._reserv.getAllbyCondition(this.endPoint,null,'pendiente').toPromise();
       this.list = resp.reservs;
	}

	goToReservView(reserv:any){
       console.log('reserva seleccionada ',reserv);
       this.router.navigate(['dashboard/view/assign',{reserv: JSON.stringify(reserv), action:this.action}]);
	}

	getTrips(state:string){

	}



}
