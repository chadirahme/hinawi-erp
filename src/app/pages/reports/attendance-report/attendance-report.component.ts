import { Component, OnInit } from '@angular/core';
import {ApiAuth} from "../../../@core/services/api.auth";
import {LocalDataSource} from "ng2-smart-table";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss']
})
export class AttendanceReportComponent implements OnInit {

  selectedMonth: any;
  source: LocalDataSource = new LocalDataSource();
  reports: any[];
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
      checkinTime: {
        title: 'First Checkin Time',
        type: 'string',
        valuePrepareFunction: (val) => {
          return this.datePipe.transform(val,'dd.MM.yyyy h:mm:ss a ');
        }
      },
      checkoutTime: {
        title: 'Last Checkout Time',
        type: 'string',
        valuePrepareFunction: (val) => {
          return this.datePipe.transform(val,'dd.MM.yyyy h:mm:ss a ');
        }
      },
      visitDuration: {
        title: 'Duration',
        type: 'string',
      },
    },
  };
  constructor(private apiAuth: ApiAuth , private datePipe: DatePipe) {
  }

  ngOnInit() {
    let month = new Date();
    this.selectedMonth=month.getMonth()+1;
    //this.loadData();
  }

  loadData(): void {
    try {
      if(this.selectedMonth=="0")
      {
        alert("Please select a Month !!");
        return;
      }

      this.apiAuth.getDailyAttendanceReport(this.selectedMonth).subscribe(data => {
        this.reports = data.result;
        this.source.load(data.result);
      console.log("done...");
      });
    }
    catch (e) {
      console.log(e);
    }
  }

}
