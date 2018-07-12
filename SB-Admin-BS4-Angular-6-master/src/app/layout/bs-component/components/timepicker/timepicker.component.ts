import {Component, OnInit, Output, EventEmitter } from '@angular/core';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-timepicker',
    templateUrl: './timepicker.component.html',
    styleUrls: ['./timepicker.component.scss']
})
export class TimepickerComponent implements OnInit {

    defaultTime = { hour: 0, minute: 0 };
    @Output() sendTime : EventEmitter<any> = new EventEmitter<any>();
    
    constructor(){ }

    ngOnInit(){

        let date = new Date();
        this.defaultTime.hour = date.getHours();
        this.defaultTime.minute = date.getMinutes();

        this.sendTime.emit(this.defaultTime);

    }

    onChangeTime(time:any){
        this.sendTime.emit(time);
    }

}
