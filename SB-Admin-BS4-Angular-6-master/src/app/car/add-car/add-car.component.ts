import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CarService } from '../../servicios/car/car.service';


@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit {
  
  rForm: FormGroup;
  warningMsg : string;
  notFocused = false;
  class : string;
  info : any;
  alert = {
    view : false,
    type : '',
    title : 'Informe',
    message: 'test 01'
  }

  constructor(private fb: FormBuilder,
              public router: Router,
              private spinner: NgxSpinnerService,
              private _car : CarService) { }

  ngOnInit() {
    this.setValidator();
  }

  setValidator(){
    this.rForm = this.fb.group({
      'brand' : ['Fiat',  Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])],
      'patent' : ['AB123AC', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(7)])],
      'number_people' : [4,  Validators.compose([Validators.min(2),Validators.max(10)])],
      'air_conditioned' : [false],
      'big_trunk' : [false],
      'usb_music' : [false],
      'airbags' : [false],
      'year' : [2018, Validators.compose([Validators.required, Validators.min(2000), Validators.max(2500)])],
      'model' : ['in-line',Validators.compose([Validators.required,,Validators.minLength(4), Validators.maxLength(15)])],
      'pictures' : ['n/n'],
      'date_created' : [],
      'isActive' : [true],
    });
  }

  saveCar(){
  	this.spinner.show();
  	this.rForm.value.date_created = new Date().toLocaleString();
  	console.log(this.rForm.value);
  	let car = this.rForm.value;
  	this._car.saveCar('cars', car).subscribe(
      car => {
            console.log('car ',car.json());
            this.spinner.hide();

            
            this.alert.type = 'success';
            this.alert.message = car.json().message;
            this.alert.title = 'Informe : ';
            this.alert.view = true;
            
            this.rForm.reset();
      },
      error => { 
      	console.log(error.json());
      	this.spinner.hide();
      }
    )
  }

  



}


  /*get toogleClass(){ 
  	if(!this.rForm.controls.brand.valid && this.rForm.controls.brand.dirty){
  		return 'is-invalid';
  	}
  	return 'is-valid'; 
  }*/