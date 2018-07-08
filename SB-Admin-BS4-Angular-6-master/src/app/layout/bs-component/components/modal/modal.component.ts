import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CarService } from '../../../../servicios/car/car.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'modal-delete-car',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnDestroy {

    @Input() car : any;
    view_msg : boolean;
    carSub : Subscription;
    modalReference : any;
    alert = {
        view : false,
        type : '',
        title : 'Informe',
        message: 'test 01'
    };
    @Output() refreshList : EventEmitter<any> = new EventEmitter<any>();

    constructor(private modalService: NgbModal,
                private _car : CarService,
                private spinner: NgxSpinnerService) { }
    

    open(content) {
        this.modalReference = this.modalService.open(content);
        this.modalReference.result.then((result) => {
 
        }, (reason) => {
            this.view_msg = false;
       
        });
    }

    deleteCar(){
      
        this.spinner.show();
        console.log("auto a borrar en modal",this.car);

        this.car.isActive = false;
        this.carSub = this._car.delete('cars',this.car).subscribe(
          resp => {
              console.log(resp.json());
              this.modalReference.close();
              this.refreshList.emit(true);
              this.spinner.hide();
          },
          error => {
              console.log(error.json())
              this.spinner.hide();
              this.view_msg = true;
              this.showAlert(error.json().message,'warning');
          }
        )
    }

    showAlert(message:any,type:string){
        this.alert.type = type;
        this.alert.message = message;
        this.alert.title = 'Informe : ';
        this.alert.view = true;

    }

    ngOnDestroy() {
        console.log('se ejecuto ngOnDestroy');
        if(this.carSub){
           this.carSub.unsubscribe();
        } 
    }

}
