import { Component, OnInit } from '@angular/core';
import {ApiAuth} from "../../../@core/services/api.auth";
import {LocalDataSource} from "ng2-smart-table";
import {DecimalPipe} from "@angular/common";

@Component({
  selector: 'attendance-monthly',
  templateUrl: './attendance-monthly.component.html',
  styleUrls: ['./attendance-monthly.component.scss']
})
export class AttendanceMonthlyComponent implements OnInit {

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
      monthName: {
        title: 'Month',
        type: 'string',
      },
      monthlyDuration: {
        title: 'Duration',
        type: 'string',
      },
      monthlyRate: {
        title: 'Salary',
        type: 'number',
        valuePrepareFunction: (amount) => {
          return this.cp.transform(amount);
        }
      },
    },
  };
  constructor(private apiAuth: ApiAuth,private cp: DecimalPipe) {
  }

  ngOnInit() {
    //this.loadData();
    let month = new Date();
    this.selectedMonth=month.getMonth()+1;
  }

  loadData(): void {
    try {
      if(this.selectedMonth=="0")
      {
        alert("Please select a Month !!");
        return;
      }

      this.apiAuth.getMonthlyAttendanceReport(this.selectedMonth).subscribe(data => {
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
