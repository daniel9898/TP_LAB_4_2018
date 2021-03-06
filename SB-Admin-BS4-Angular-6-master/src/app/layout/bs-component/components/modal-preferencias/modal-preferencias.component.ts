import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CarService } from '../../../../servicios/car/car.service';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-modal-preferencias',
  templateUrl: './modal-preferencias.component.html',
  styleUrls: ['./modal-preferencias.component.scss']
})
export class ModalPreferenciasComponent implements OnInit {
    modalReference : any;
    cars : any;
    listSub : Subscription; 
    see_table : boolean = true;

    //selectedCar: any;
    displayDialog: boolean;
    sortOptions: any[];
    sortKey: string;
    sortField: string;
    sortOrder: number;

    @Input() reserv : any;
    @Output() sendCar : EventEmitter<any> = new EventEmitter<any>();
    
    constructor(private modalService: NgbModal,private _car : CarService) { }

    ngOnInit() {
    	this.getCars();
    }

    open(content) {
        this.modalReference = this.modalService.open(content, { size: 'lg' });
        this.modalReference.result.then((result) => {}, (reason) => {/*this.view_msg = false;*/});
        
        this.getCarsNotAvailable();
    }

    async getCarsNotAvailable(){
        console.log('reserva desde preferencias ',this.reserv);
        let result = await this._car.notAvailables('cars/dates',{
            start_date : this.reserv.date,
            start_time : this.reserv.hour,
            end_date : this.reserv.ending_date,
            end_time : this.reserv.ending_hour
        }).toPromise();
        console.log('RESULT ',result);
    }

    getCars(){
	    this.listSub = this._car.getAll('cars').subscribe(
	      resp => {this.cars = resp['cars']; console.log(resp['cars'])},
	      error => {
            console.log(error.error)
	        //this.showAlert(error.error.message,'warning');
	        //this.see_table = false;
	        
	      }
	    )
    }

    selectCar(event: Event, car: any) {
        //this.selectCar = car;
        //this.displayDialog = true;
        this.sendCar.emit(car);
        this.modalReference.close();
        //event.preventDefault();
    }

    onSortChange(event) {
        let value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        }
        else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    /*onDialogHide() {
        this.selectedCar = null;
    }*/

    ngOnDestroy() {
       this.listSub.unsubscribe();
    }

}
