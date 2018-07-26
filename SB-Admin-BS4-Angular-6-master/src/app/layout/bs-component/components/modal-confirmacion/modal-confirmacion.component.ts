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
    modal_title : string;
    @Input() create : boolean;
    @Input() reserv : any;
    @Input() default_destiny : any;
    @Output() sendValidation : EventEmitter<any> = new EventEmitter<any>();
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
           this.sendValidation.emit(true);
           return ;
        }

        this.modal_title = this.create ? 'Reserva a Crear' : 'Datos Actualizados'
        this.preferences = this.reserv.car_selected != null ? `${this.reserv.car_selected.brand}-${this.reserv.car_selected.model}`
                                                            : 'Ninguna.';

        this.modalReference = this.modalService.open(content);
        this.modalReference.result.then((result) => {
        }, (reason) => { this.view_msg = false});
    }

    save(){
      this.spinner.show();
      this.reserv.car_selected = this.reserv.car_selected != null ? this.reserv.car_selected._id : null;
      this.create ? this.createReserv() : this.updateReserv();
    }

    async createReserv(){
      try{
        this.reserv.date_created = new Date().toLocaleString();
        let result:any  = await this._reserv.save('reserv',this.reserv).toPromise();
        this.showAlert(result.message,'success');
        this.sendResult.emit(true);
      }catch(e){
        this.showAlert(e.error['message'] != null ? e.error['message'] : e.error ,'danger');
        console.log('error en crear la reserva',e);
      }
      this.spinner.hide();
      this.view_msg = true;
    }

    async updateReserv(){
      console.log('modified ',this.reserv);
      try{
        await this._reserv.update('reserv',this.reserv).toPromise();
        this.showAlert('Reserva Modificada Exitosamente !','success');
        this.sendResult.emit(true);
      }catch(e){
        this.showAlert(e.error['message'] != null ? e.error['message'] : e.error ,'danger');
        console.log('error ala actaulizar la reserva',e);
      }
      this.spinner.hide();
      this.view_msg = true;
    }

    showAlert(message:any,type:string){
      this.alert.type = type;
      this.alert.message = message;
      this.alert.title = 'Informe : ';
  }

}
