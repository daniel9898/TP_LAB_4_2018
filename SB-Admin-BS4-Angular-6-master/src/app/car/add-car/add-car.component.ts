import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarService } from '../../servicios/car/car.service';
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnDestroy {
  
  rForm: FormGroup;
  carSub : Subscription;
  alert = {
    view : false,
    type : '',
    title : 'Informe',
    message: 'test 01'
  };
  car_to_update : any;
  alta : boolean = true;
  submitted : boolean = false;
  

  constructor(private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private _car : CarService,
              public act_router: ActivatedRoute) {}

  ngOnInit() {

    this.carSub = this.act_router.params.subscribe(
      params => {
        this.alta = params['alta'] != undefined ? false : true;
        this.car_to_update = JSON.parse(localStorage.getItem('car_to_update'));
        this.setValidator();
      },
      error =>  console.log('error', error)
    );
  }

  setValidator(){
    this.rForm = this.fb.group({
      'brand' : [!this.alta ? this.car_to_update.brand : '',  Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])],
      'patent' : [!this.alta ? this.car_to_update.patent : '', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(7)])],
      'number_people' : [!this.alta ? this.car_to_update.number_people : '',  Validators.compose([Validators.min(2),Validators.max(10)])],
      'air_conditioned' : [!this.alta ? this.car_to_update.air_conditioned : false],
      'big_trunk' : [!this.alta ? this.car_to_update.big_trunk : false],
      'usb_music' : [!this.alta ? this.car_to_update.usb_music : false],
      'airbags' : [!this.alta ? this.car_to_update.airbags : false],
      'year' : [!this.alta ? this.car_to_update.year : '', Validators.compose([Validators.required, Validators.min(2000), Validators.max(2500)])],
      'model' : [!this.alta ? this.car_to_update.model : '',Validators.compose([Validators.required,,Validators.minLength(4), Validators.maxLength(15)])],
      'pictures' : [!this.alta ? this.car_to_update.pictures : ''],
      'date_created' : [!this.alta ? this.car_to_update.date_created : ''],
      'isActive' : [true],
    });
  }

  saveCar(){
    this.submitted = true;
  	this.spinner.show();
    if(this.alta){
      this.createCar();
    }else{
      this.updateCar();
    }
   

  }

  showAlert(message:any,type:string){
    this.alert.type = type;
    this.alert.message = message;
    this.alert.title = 'Informe : ';
    this.alert.view = true;

  }

  updateCar(){

    console.log(this.rForm.value);
    let car = this.rForm.value;
    car._id = this.car_to_update._id;

    const carSub1 = this._car.update('cars', car).subscribe(
      car => {
          this.showAlert('Vehiculo Actualizado Exitosamente !','success');
          setTimeout(this.hideAlert.bind(this),6000);
          this.rForm.reset();
          this.spinner.hide();
      },
      error => { 
          console.log(error.json());
          this.spinner.hide();
          this.showAlert(error.json().message,'warning');
      }
    )
    this.carSub.add(carSub1);

  }

  createCar(){

    this.rForm.value.date_created = new Date().toLocaleString();
    console.log(this.rForm.value);
    let car = this.rForm.value;

    const carSub2 = this._car.save('cars', car).subscribe(
      car => {
          this.spinner.hide();
          this.showAlert(car.json().message,'success');
          setTimeout(this.hideAlert.bind(this),6000);
          this.rForm.reset();
      },
      error => { 
          this.spinner.hide();
          this.showAlert(error.json().message,'warning');
      }
    )
    this.carSub.add(carSub2);

  }

  hideAlert(){
    this.alert.view = false;
  }

  ngOnDestroy() {
    console.log('se ejecuto ngOnDestroy');
    if(this.carSub){
       this.carSub.unsubscribe();
      } 
  }

  



}


  /*get toogleClass(){ 
  	if(!this.rForm.controls.brand.valid && this.rForm.controls.brand.dirty){
  		return 'is-invalid';
  	}
  	return 'is-valid'; 
  }*/