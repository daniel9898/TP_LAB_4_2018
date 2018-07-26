import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from '../../../../servicios/user/usuarios.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: 'app-modal-baja-reserva',
  templateUrl: './modal-baja-reserva.component.html',
  styleUrls: ['./modal-baja-reserva.component.scss']
})
export class ModalBajaReservaComponent implements OnDestroy {

    @Input() reserv : any;
    view_msg : boolean;
    reservSubs : Subscription;
    modalReference : any;
    alert = {
        view : false,
        type : '',
        title : 'Informe',
        message: 'test 01'
    };
    @Output() refreshList : EventEmitter<any> = new EventEmitter<any>();

    constructor(private modalService: NgbModal,
                private _user : UsuariosService,
                private spinner: NgxSpinnerService) { }
    

    open(content) {
        this.modalReference = this.modalService.open(content);
        this.modalReference.result.then((result) => {
 
        }, (reason) => {
            this.view_msg = false;
       
        });
    }

    deleteReserv(){
      
        this.spinner.show();
        console.log("reserva a borrar en modal",this.reserv);

        this.reserv.isActive = false;
        this.reservSubs = this._user.delete('reserv',this.reserv).subscribe(
          resp => {
              console.log(resp);
              this.modalReference.close();
              this.refreshList.emit(true);
              this.spinner.hide();
          },
          error => {
              console.log(error.json())
              this.spinner.hide();
              this.view_msg = true;
              this.showAlert(error.json().message,'warning');
              this.spinner.hide();
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
        if(this.reservSubs){
           this.reservSubs.unsubscribe();
        } 
    }
}
