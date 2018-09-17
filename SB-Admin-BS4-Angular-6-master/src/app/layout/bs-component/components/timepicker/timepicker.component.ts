import {Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-timepicker',
    templateUrl: './timepicker.component.html',
    styleUrls: ['./timepicker.component.scss']
})
export class TimepickerComponent implements OnInit {

    defaultTime = { hour: '', minute: '' };
    @Output() sendTime : EventEmitter<any> = new EventEmitter<any>();
    @Input() data : any;
    
    constructor(){ }

    ngOnInit(){
        if(this.data.create){
            let date = new Date();
            let hour = date.getHours();
            let minutes = date.getMinutes();
            this.defaultTime.hour = ("0" + hour).slice(-2);
            this.defaultTime.minute = ("0" + minutes).slice(-2);
         
            this.sendTime.emit(this.defaultTime);
        }else{

            let time = this.data.hour.split(':');
            this.defaultTime.hour = time[0];
            this.defaultTime.minute = time[1];
        }
    }

    onChangeTime(time:any){
        this.sendTime.emit(time);
    }

}
