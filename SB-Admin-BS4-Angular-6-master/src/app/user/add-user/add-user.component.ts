import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { UsuariosService } from '../../servicios/user/usuarios.service';
import { UploadFileService } from '../../servicios/uploadFile/upload-file.service';
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
  warningMsg : string;
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
  userCreated : any;
   
  constructor(public _user: UsuariosService,
              private fb: FormBuilder,
              private router: Router,
              private spinner: NgxSpinnerService,
              public act_router: ActivatedRoute,
              public _fileUploader: UploadFileService) {}
  //usuarios de prueba : daniel@admin.com,daniel@chofer.com,daniel@cliente.com
  ngOnInit() {

    this.userSubs = this.act_router.params.subscribe(
      params => {
        this.alta = params['alta'] != undefined ? false : true;
        this.user_to_update = JSON.parse(localStorage.getItem('user_to_update'));
        this.setValidator();
      },
      error =>  console.log('error', error)
    );
  }

  setValidator(){
    this.rForm = this.fb.group({
      'name' : [!this.alta ? this.user_to_update.name : 'test1',  Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      'lastName' : [!this.alta ? this.user_to_update.lastName : 'test2', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      'email' : [!this.alta ? this.user_to_update.email : 'test@test01.com',  Validators.compose([Validators.required, Validators.email])],
      'password' : ['123456' , Validators.compose([this.alta ? Validators.required : null, Validators.minLength(4), Validators.maxLength(15)])],
      'password2' : ['123456' ,Validators.compose([this.alta ? Validators.required : null, ValidatePassword ,Validators.minLength(4), Validators.maxLength(15)])],
      'profile' : [!this.alta ? this.user_to_update.profile : 'chofer'],
      'picture' : [!this.alta ? this.user_to_update.picture : 'http://www.cwejournal.org/images/user.jpg'],
      'signUp' : [this.user_to_update.signUp]
    });
  }

  save(){
    this.submitted = true;
    //this.spinner.show();
    this.alta ? this.createUser() : this.updateUser(); 
  }

  get confirmPassword() {
    return this.rForm.get('password2');
  }

  get toogleHeader(){
    return this.alta ? 'Alta de usuario' : 'Modificación de usuario';
  }

  createUser(){
    
    console.log(this.rForm.value);
    let user = this.rForm.value;
    user.signUp = new Date().toLocaleString();
    delete user.password2;

    let formData = new FormData();
    console.log('file ',(<HTMLInputElement>document.getElementById('avatar')).files[0] );
    formData.append('avatar', (<HTMLInputElement>document.getElementById('avatar')).files[0]);

    const userSubs1 = this._user.save('signup',user).subscribe(
        resp => {

            this.userCreated = resp['user'];
            this._fileUploader.send('upload',formData).subscribe(
                upload => {

                  console.log('uploadOk',upload);
                  this.userCreated.picture = upload['url'];
                  
                  this._user.update('users',this.userCreated).subscribe(
                     userUpdate => {

                        this.showAlert('Usuario Creado Exitosamente !','success');
                        setTimeout(this.hideAlert.bind(this),6000);
                        this.rForm.reset();
                        console.log(userUpdate);//NO DEBERIA RETORNAR EL PASS Y ID 
                        this.spinner.hide();

                     },
                     error => console.log('error en user update',error)
                  )
                },
                error =>{
                  console.log('error en subir img',error);
                } 
            )
        
        },
        err => {
            this.notFocused = true;
            this.showAlert(err.error['message'],'warning');
            this.spinner.hide();
            console.log('ERROR ',err);
        } 
    )

    this.userSubs.add(userSubs1);

  }

  updateUser(){
    
    console.log(this.rForm.value);
    let user = this.rForm.value;
    user._id = this.user_to_update._id;
    delete user.password2;

    const userSubs2 = this._user.update('users',user).subscribe(
        (userUpdated:any) => {

            this.showAlert(userUpdated['message'],'success');
            setTimeout(this.hideAlert.bind(this),6000);
            this.rForm.reset();
            console.log(userUpdated);
            this.spinner.hide();
        
        },
        err => {
            this.notFocused = true;
            this.showAlert(err['message'],'warning');
            this.spinner.hide();
            console.log('ERROR ',err);
        } 
    )


    this.userSubs.add(userSubs2);

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
