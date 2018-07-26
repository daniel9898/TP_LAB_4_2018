import { Component, OnInit, Output, Input, EventEmitter  } from '@angular/core';


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
    placeholder: string;
    @Output() sendDate : EventEmitter<any> = new EventEmitter<any>();
    @Input() data : any;
   
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
       
        if(this.data.create){
            this.placeholder = `${d.year}-${d.month}-${d.day}`;
            this.start_date = { year: d.year, month: d.month, day: d.day };
            this.sendDate.emit(d);
        }else{
            console.log('data date ',this.data);
            this.placeholder = this.data.date;
            let date = this.data.date.split('-');
            this.start_date = { year: date[0], month: date[1], day: date[2] }; 
        }

    }

    onChangeDate(date:any){
        this.sendDate.emit(date);
    }
}
