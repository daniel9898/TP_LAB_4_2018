import { Component, OnDestroy } from '@angular/core';
import { UsuariosService } from '../../servicios/user/usuarios.service';
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
  
  constructor(private _user : UsuariosService, public router: Router) {
    this.getUsers();
  }

  getUsers(){
    this.listSub = this._user.getAll('users').subscribe(
     (resp:any) => this.list = resp['users'],
      error => {
        this.showAlert(error.error.message,'warning');
        this.see_table = false;
        
      }
    )
  }

  refresh(refresh){
    if(refresh){
       this.getUsers();
    }
  }

  editUser(user:any){
    localStorage.setItem('user_to_update',JSON.stringify(user));
    this.router.navigate(['user/add',{ alta: false }]);
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
