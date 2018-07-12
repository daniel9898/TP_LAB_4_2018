import { Component, OnDestroy } from '@angular/core';
import { CarService } from '../../servicios/car/car.service';
import { Subscription } from "rxjs/Subscription";
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnDestroy {

  public list : any;
  listSub : Subscription; 
  see_table : boolean = true;
  alert = {
      view : false,
      type : '',
      title : 'Informe',
      message: ''
  };
  
  constructor(private _car : CarService, public router: Router) {
    this.getCars();
  }

  getCars(){
    this.listSub = this._car.getAll('cars').subscribe(
      resp => this.list = resp['cars'],
      error => {
        this.showAlert(error.error.message,'warning');
        this.see_table = false;
        
      }
    )
  }

  refresh(refresh){
    if(refresh){
       this.getCars();
    }
  }

  editCar(car:any){
    localStorage.setItem('car_to_update',JSON.stringify(car));
    this.router.navigate(['car/add',{ alta: false }]);
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
