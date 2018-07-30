import { Injectable } from '@angular/core';
import { CustomHttpService } from '../custom-http.service';

@Injectable({
  providedIn: 'root'
})
export class TripService {

	constructor(private miHttp: CustomHttpService) { }

	getAll(endPoint: string){
	    return this.miHttp.runGet(endPoint);
	}

	getAllbyIdClient(endPoint: string, id:any, state:string){
	    return this.miHttp.runGetWhitParams(endPoint, id, state);
	}

	save(endPoint: string, data: any){
	    return this.miHttp.runPost(endPoint, data);
	}

	update(endPoint: string, trip: any){
	    return this.miHttp.runUpdate(endPoint,trip._id, trip);
	}

	delete(endPoint: string, trip: any){
	    return this.miHttp.runDelete(endPoint,trip._id, trip);
	}

}
