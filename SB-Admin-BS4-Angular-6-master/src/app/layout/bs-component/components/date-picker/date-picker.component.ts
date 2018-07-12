import { Component, OnInit, Output, EventEmitter  } from '@angular/core';


@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

    model: any;
    min_date : any;
    max_date : any;
    start_date : any;
    @Output() sendDate : EventEmitter<any> = new EventEmitter<any>();
   
    constructor() { }

    ngOnInit() {
        let date = new Date();
        let d = {
        	day : date.getDate(),
        	month : date.getMonth()+1,
        	year : date.getFullYear()
        }

    	this.min_date =   { year: d.year , month: d.month , day: d.day };
    	this.max_date =   { year: d.year+1, month: 1 , day: 31 }; //falta validacion
    	this.start_date = { year: d.year, month: d.month, day: d.day };

        this.sendDate.emit(d);
    }

    onChangeDate(date:any){
        this.sendDate.emit(date);
    }
}
