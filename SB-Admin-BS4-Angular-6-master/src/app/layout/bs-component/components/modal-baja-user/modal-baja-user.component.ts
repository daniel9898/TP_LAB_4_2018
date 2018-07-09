import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from '../../../../servicios/user/usuarios.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'modal-delete-user',
    templateUrl: './modal-baja-user.component.html',
    styleUrls: ['./modal-baja-user.component.scss']
})
export class ModalBajaUserComponent implements OnDestroy {

    @Input() user : any;
    view_msg : boolean;
    userSubs : Subscription;
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

    deleteUser(){
      
        this.spinner.show();
        console.log("user a borrar en modal",this.user);

        this.user.isActive = false;
        this.userSubs = this._user.delete('users',this.user).subscribe(
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
        if(this.userSubs){
           this.userSubs.unsubscribe();
        } 
    }

}
