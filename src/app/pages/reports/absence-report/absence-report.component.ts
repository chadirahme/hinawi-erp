import { Component, OnInit } from '@angular/core';
import {NbDateService} from "@nebular/theme";
import {DatePipe} from "@angular/common";
import {ApiAuth} from "../../../@core/services/api.auth";
import {LocalDataSource} from "ng2-smart-table";

@Component({
  selector: 'absence-report',
  templateUrl: './absence-report.component.html',
  styleUrls: ['./absence-report.component.scss']
})
export class AbsenceReportComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();
  reports: any[];
  ngModelDate: any;
  min: Date;
  max: Date;

  settings = {
    pager: {
      display: true,
      perPage: 50
    },
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      userName: {
        title: 'Employee',
        type: 'string',
      },
      checkDate:{
        title: 'Check Date',
        type: 'string',
      },
      monthlyDuration: {
        title: 'Duration',
        type: 'string',
      },
    },
  };

  // ngModelDate = {
  //   start: new Date(),
  //   end: new Date(),
  // };

  constructor(protected dateService: NbDateService<Date>,private datePipe: DatePipe,private apiAuth: ApiAuth) {
    let date = new Date();
    let firstDay =
      new Date(date.getFullYear(), date.getMonth(), 1);

    let lastDay =
      new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.min = this.dateService.addMonth(this.dateService.today(), -1);
    this.max = this.dateService.addMonth(this.dateService.today(), 1);

    this.ngModelDate = {
      start: firstDay, //this.min,
      end: lastDay//this.max
    };
  }

  ngOnInit() {
    //this.ngModelDate = new Date();
    this.min=new Date();
    this.max=new Date();
  }

  loadData(){
    let start = this.datePipe.transform(this.ngModelDate.start,"yyyy-MM-ddTHH:mm:ss");
    let end = this.datePipe.transform(this.ngModelDate.end,"yyyy-MM-ddTHH:mm:ss");
    try {

      this.apiAuth.getAbsenceReport(start,end).subscribe(data => {
        this.source.load(data.result);
        console.log("done...");
      });
    }
    catch (e) {
      console.log(e);
    }
  }

}
