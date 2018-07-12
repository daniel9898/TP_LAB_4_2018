import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { UsuariosService } from '../../servicios/user/usuarios.service';
import { StorageService } from '../../servicios/storage/storage.service';
import { Router } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import { ValidatePassword } from '../../signup/password.validator';
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnDestroy {

  rForm: FormGroup;
  notFocused = false;
  userSubs : Subscription;
  submitted : boolean = false;
  alert = {
    view : false,
    type : '',
    title : 'Informe',
    message: 'test 01'
  }; 
  user_to_update : any;
  alta : boolean = true;
  formdata : FormData;
  changeAvatar : boolean = false;
   
  constructor(public _user: UsuariosService,
              private fb: FormBuilder,
              private router: Router,
              private spinner: NgxSpinnerService,
              public act_router: ActivatedRoute,
              public _storage: StorageService) {}
  //usuarios de prueba : daniel@admin.com,daniel@chofer.com,daniel@cliente.com
  ngOnInit() {

    this.userSubs = this.act_router.params.subscribe(
      params => {
        this.alta = params['alta'] != undefined ? false : true;
        this.user_to_update = JSON.parse(localStorage.getItem('user_to_update'));
        this.initValidator();
      },
      error =>  console.log('error', error)
    );
  }

  initValidator(){
    this.rForm = this.fb.group({
      'name' : [!this.alta ? this.user_to_update.name : 'test1',  Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      'lastName' : [!this.alta ? this.user_to_update.lastName : 'test2', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      'email' : [!this.alta ? this.user_to_update.email : 'test@test01.com',  Validators.compose([Validators.required, Validators.email])],
      'password' : ['123456' , Validators.compose([this.alta ? Validators.required : null, Validators.minLength(4), Validators.maxLength(15)])],
      'password2' : ['123456' ,Validators.compose([this.alta ? Validators.required : null, ValidatePassword ,Validators.minLength(4), Validators.maxLength(15)])],
      'profile' : [!this.alta ? this.user_to_update.profile : 'chofer'],
      'picture' : [!this.alta ? this.user_to_update.picture : 'http://www.cwejournal.org/images/user.jpg'],
      'signUp' : [this.user_to_update.signUp],
      'isActive' : [true]
    });
  }

  save(){
    this.submitted = true;
    this.spinner.show();
    this.alta ? this.createUser() : this.updateUser(); 
  }

  get confirmPassword() {
    return this.rForm.get('password2');
  }

  get toogleHeader(){
    return this.alta ? 'Alta de usuario' : 'Modificación de usuario';
  }

  async createUser(){
    
    console.log(this.rForm.value);
    let user = this.rForm.value;
    user.signUp = new Date().toLocaleString();
    delete user.password2;

    try{
        if(this.changeAvatar){
          let upload = await this.uploadFile();
          user.picture = upload['url'];
        }
   
        await this._user.save('signup',user).toPromise();

        this.showAlert('Usuario Creado Exitosamente !','success');
        setTimeout(this.hideAlert.bind(this),6000);
        this.rForm.reset();
        this.spinner.hide();

    }catch(e){
        this.notFocused = true;
        this.showAlert(e.error['message'] != null ? e.error['message'] : e.error ,'warning');
        this.spinner.hide();
        console.log('error en crear user',e);
    }

  }

  uploadFile(){
    this.formdata = new FormData();
    this.formdata.append('avatar', (<HTMLInputElement>document.getElementById('avatar')).files[0]);
    return this._storage.uploadFile('upload',this.formdata).toPromise();
  }

  async updateUser(){ 
    
    console.log(this.rForm.value);
    let user = this.rForm.value;
    user._id = this.user_to_update._id;
    delete user.password2;

    try{
        if(this.changeAvatar){
          let upload = await this.uploadFile();
          user.picture = upload['url'];
        }

        let result = await this._user.update('users',user).toPromise();

        this.showAlert(result['message'],'success');
        setTimeout(this.hideAlert.bind(this),6000);
        this.rForm.reset();
        this.spinner.hide();

    }catch(e){
        this.notFocused = true;
        this.showAlert(e.error['message'] != null ? e.error['message'] : e.error ,'warning');
        this.spinner.hide();
        console.log('error en crear user',e);
    }

  }

  fileChangeEvent(input: Event){
    console.log('funciona',input.target);
    this.changeAvatar = true;
  }

  showAlert(message:any,type:string){
    this.alert.type = type;
    this.alert.message = message;
    this.alert.title = 'Informe : ';
    this.alert.view = true;

  }

  hideAlert(){
    this.alert.view = false;
  }

  ngOnDestroy() {
    if(this.userSubs){
       this.userSubs.unsubscribe();
    }
    
  }

}
