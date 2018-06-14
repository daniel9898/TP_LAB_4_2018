import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent{

  constructor(private route: ActivatedRoute) { 
    this.route.queryParams
      .filter(params => params.user)
      .subscribe(params => {
        console.log(params); 
      });
  }

 

}
