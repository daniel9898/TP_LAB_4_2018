import { Component, OnInit ,OnDestroy} from '@angular/core';
import { ReservService } from '../../../servicios/reserv/reserv.service';
import { Subscription } from "rxjs/Subscription";
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserv-list',
  templateUrl: './reserv-list.component.html',
  styleUrls: ['./reserv-list.component.scss']
})
export class ReservListComponent implements OnDestroy {

  public list : any;
  listSub : Subscription; 
  see_table : boolean = true;
  alert = {
      view : false,
      type : '',
      title : 'Informe',
      message: ''
  };
  
  constructor(private _reserv : ReservService, public router: Router) {
    this.getReservs();
  }

  getReservs(){
  	let id = JSON.parse(localStorage.getItem('user')).user._id;
    this.listSub = this._reserv.getAllbyCondition('reserv/filter',id,'pendiente').subscribe(
      (resp:any) => this.list = resp.reservs,
      error => {
        this.showAlert(error.error.message,'warning');
        this.see_table = false;
        
      }
    )
  }

  refresh(refresh){
    if(refresh){
       this.getReservs();
    }
  }

  editReserv(reserv:any){
    localStorage.setItem('reserv_to_update',JSON.stringify(reserv));
    this.router.navigate(['/dashboard/reserv',{ create: false }]);
  }

  showAlert(message:any,type:string){
    this.alert.type = type;
    this.alert.message = message;
    this.alert.title = 'Informe : ';
    this.alert.view = true;

  }

  ngOnDestroy() {
    this.listSub.unsubscribe();
  }

}
