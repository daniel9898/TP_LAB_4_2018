import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarService } from '../../servicios/car/car.service';
import { StorageService } from '../../servicios/storage/storage.service';
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
  formdata : FormData;
  changeAvatar : boolean = false;

  constructor(private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private _car : CarService,
              public act_router: ActivatedRoute,
              public _storage: StorageService) {}

  ngOnInit() {

    this.carSub = this.act_router.params.subscribe(
      params => {
        this.alta = params['alta'] != undefined ? false : true;
        this.car_to_update = JSON.parse(localStorage.getItem('car_to_update'));
        this.initValidator();
      },
      error =>  console.log('error', error)
    );
  }

  initValidator(){
    this.rForm = this.fb.group({
      'brand' : [!this.alta ? this.car_to_update.brand : 'fiat',  Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])],
      'patent' : [!this.alta ? this.car_to_update.patent : 'ab123ab', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(7)])],
      'number_people' : [!this.alta ? this.car_to_update.number_people : 4,  Validators.compose([Validators.required,Validators.min(2),Validators.max(10)])],
      'air_conditioned' : [!this.alta ? this.car_to_update.air_conditioned : false],
      'big_trunk' : [!this.alta ? this.car_to_update.big_trunk : false],
      'usb_music' : [!this.alta ? this.car_to_update.usb_music : false],
      'airbags' : [!this.alta ? this.car_to_update.airbags : false],
      'year' : [!this.alta ? this.car_to_update.year : '2017', Validators.compose([Validators.required, Validators.min(2000), Validators.max(2500)])],
      'model' : [!this.alta ? this.car_to_update.model : 'fire2',Validators.compose([Validators.required,,Validators.minLength(2), Validators.maxLength(15)])],
      'pictures' : [!this.alta ? this.car_to_update.pictures : "http://www.digitaltrends.com/wp-content/uploads/2013/04/Koenigsegg-Agera-R.jpg"],
      'date_created' : [!this.alta ? this.car_to_update.date_created : ''],
      'isActive' : [true],
    });
  }

  get toogleHeader(){
    return this.alta ? 'Alta de vehiculo' : 'Modificación de vehiculo';
  }

 
  save(){
    this.submitted = true;
  	this.spinner.show();
    this.alta ? this.createCar() : this.updateCar();
  }

  showAlert(message:any,type:string){
    this.alert.type = type;
    this.alert.message = message;
    this.alert.title = 'Informe : ';
    this.alert.view = true;

  }

  async updateCar(){

    console.log(this.rForm.value);
    let car = this.rForm.value;
    car._id = this.car_to_update._id;

    try{
        if(this.changeAvatar){
          let upload = await this.uploadFile();
          car.pictures = upload['url'];
        }
   
        await this._car.update('cars',car).toPromise();

        this.showAlert('Vehiculo Actualizado Exitosamente !','success');
        setTimeout(this.hideAlert.bind(this),6000);
        this.rForm.reset();
        this.spinner.hide();

    }catch(e){
        this.submitted = false;
        this.showAlert(e.error['message'] != null ? e.error['message'] : e.error ,'warning');
        this.spinner.hide();
        console.log('error al Actualizar el vehiculo',e);
    }
  }

  uploadFile(){
    this.formdata = new FormData();
    this.formdata.append('avatar', (<HTMLInputElement>document.getElementById('avatar')).files[0]);
    return this._storage.uploadFile('upload',this.formdata).toPromise();
  }

  async createCar(){

    this.rForm.value.date_created = new Date().toLocaleString();
    console.log(this.rForm.value);
    let car = this.rForm.value;

    try{
        if(this.changeAvatar){
          let upload = await this.uploadFile();
          car.pictures = upload['url'];
        }
   
        await this._car.save('cars',car).toPromise();

        this.showAlert('Vehiculo Creado Exitosamente !','success');
        setTimeout(this.hideAlert.bind(this),6000);
        this.rForm.reset();
        this.spinner.hide();

    }catch(e){
        this.submitted = false;
        this.showAlert(e.error['message'] != null ? e.error['message'] : e.error ,'warning');
        this.spinner.hide();
        console.log('error en crear el vehiculo',e);
    }

  }

  fileChangeEvent(input: Event){
    console.log('funciona',input.target);
    this.changeAvatar = true;
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