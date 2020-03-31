import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiAuth} from "../../../@core/services/api.auth";
import {LocalDataSource} from "ng2-smart-table";
import {NbThemeService} from "@nebular/theme";
import {AttendanceByreasonPiechartComponent} from "../attendance-byreason-piechart/attendance-byreason-piechart.component";
import {ReasonPieComponent} from "./reason-pie.component";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'attendance-byreason',
  templateUrl: './attendance-byreason.component.html',
  styleUrls: ['./attendance-byreason.component.scss']
})
export class AttendanceByreasonComponent implements OnInit {

  @ViewChild('childRef') child:AttendanceByreasonPiechartComponent;
  @ViewChild('childRef2') child2:ReasonPieComponent;
  selectedMonth: any;

  ngModelDate: Date;
  usersList: any[];
  selectedUser: any;
  start: any;
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
      // monthName: {
      //   title: 'Month',
      //   type: 'string',
      // },
      reasonDesc:{
        title: 'Reason',
        type: 'string',
      },
      monthlyDuration: {
        title: 'Duration',
        type: 'string',
      },
    },
  };

  constructor(private apiAuth: ApiAuth,private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.ngModelDate = new Date();
    let month = new Date();
    this.selectedMonth=month.getMonth()+1;
    this.loadActiveUsersList();
  }

  loadActiveUsersList(): void {
    try {
      this.apiAuth.getActiveUsers().subscribe(data => {
        this.usersList = data.result;
        this.selectedUser=0;
      });
    }
    catch (e) {
      console.log(e);
    }
  }

  loadData(): void {
    try {
       this.start = this.datePipe.transform(this.ngModelDate,"yyyy-MM-dd");

      //this.apiAuth.getAttendanceByReasonDailyReport(this.selectedMonth,this.selectedUser).subscribe(data => {
      this.apiAuth.getAttendanceByReasonDailyReport(this.selectedMonth,this.selectedUser,this.start).subscribe(data => {
        this.reports = data.result;
        this.source.load(data.result);
        console.log("done...");
        this.fillPieChartData('loadData() finished !!');
      });
    }
    catch (e) {
      console.log(e);
    }
  }

  search() {
    console.log(this.selectedUser);
    if(this.selectedUser=="0")
    {
      alert("Please select an Employee !!");
      return;
    }
    // if(this.selectedMonth=="0")
    // {
    //   alert("Please select a Month !!");
    //   return;
    // }
    this.loadData();
  }

  fillPieChartData(msg) {
    //console.log(msg);
    this.child.loadData(this.selectedUser,this.selectedMonth,this.start);
    this.child2.loadData(this.selectedUser,this.selectedMonth,this.start);
  }

}
