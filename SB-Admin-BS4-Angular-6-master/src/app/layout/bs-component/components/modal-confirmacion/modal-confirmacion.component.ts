import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReservService } from '../../../../servicios/reserv/reserv.service';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.scss']
})
export class ModalConfirmacionComponent implements OnInit {

	  modalReference : any;
	  view_msg : boolean = false;
    preferences : string;
    @Input() reserv : any;
    @Input() car_selected : any;
    @Input() default_destiny : any;
    @Output() sendResult : EventEmitter<any> = new EventEmitter<any>();
    alert = {
      type : '',
      title : 'Informe',
      message: 'test 01'
    };
   

    constructor(private modalService: NgbModal,
                private spinner: NgxSpinnerService,
                private _reserv: ReservService) { }

    ngOnInit() {}

    open(content) {
        if(this.reserv.destiny == null || this.default_destiny == ''){
           this.sendResult.emit(true);
           return ;
        }

        this.preferences = this.car_selected != null ? `${this.car_selected.brand}-${this.car_selected.model}`
                                                     : 'Ninguna.';

        this.modalReference = this.modalService.open(content);
        this.modalReference.result.then((result) => {
        }, (reason) => { this.view_msg = false});
    }

    save(){
      this.spinner.show();
      console.log(this.reserv);
      this.reserv.car_selected = this.reserv.car_selected != null ? this.reserv.car_selected._id : null;
      this.reserv.date_created = new Date().toLocaleString();
      this.createReserv();
    
    }

    async createReserv(){

      try{
        //this.reserv.hour = null; //SOLO TEST
        let result:any  = await this._reserv.save('reserv',this.reserv).toPromise();
        console.log('ok',result);
        this.showAlert(result.message,'success');
      }catch(e){
        this.showAlert(e.error['message'] != null ? e.error['message'] : e.error ,'warning');
        console.log('error en crear la reserva',e);
      }

      this.view_msg = true;
      this.spinner.hide();

    }

    updateReserv(){

    }

    showAlert(message:any,type:string){
      this.alert.type = type;
      this.alert.message = message;
      this.alert.title = 'Informe : ';
  }

}
