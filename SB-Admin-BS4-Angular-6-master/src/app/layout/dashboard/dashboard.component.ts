import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {

    selection = {
      date : '',
      time : ''
    }

    constructor() {}
    ngOnInit() {}

    takeTime(time:any){
        console.log('takeTime ' ,time);
        this.selection.time = time.hour +':'+ time.minute;
    }

    takeDate(date:any){
        console.log('takeDate ',date);
        this.selection.date = date.day +'/'+ date.month +'/'+ date.year ;
    }

    

    save(){ }

}
