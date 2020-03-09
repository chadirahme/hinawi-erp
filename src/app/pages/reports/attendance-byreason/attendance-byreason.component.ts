import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiAuth} from "../../../@core/services/api.auth";
import {LocalDataSource} from "ng2-smart-table";
import {NbThemeService} from "@nebular/theme";
import {AttendanceByreasonPiechartComponent} from "../attendance-byreason-piechart/attendance-byreason-piechart.component";
import {ReasonPieComponent} from "./reason-pie.component";

@Component({
  selector: 'attendance-byreason',
  templateUrl: './attendance-byreason.component.html',
  styleUrls: ['./attendance-byreason.component.scss']
})
export class AttendanceByreasonComponent implements OnInit {

  @ViewChild('childRef') child:AttendanceByreasonPiechartComponent;
  @ViewChild('childRef2') child2:ReasonPieComponent;
  selectedMonth: any;

  usersList: any[];
  selectedUser: any;
  source: LocalDataSource = new LocalDataSource();
  reports: any[];
  settings = {
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

  constructor(private apiAuth: ApiAuth) {
  }

  ngOnInit() {
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
      this.apiAuth.getAttendanceByReasonReport(this.selectedMonth,this.selectedUser).subscribe(data => {
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
    if(this.selectedMonth=="0")
    {
      alert("Please select a Month !!");
      return;
    }
    this.loadData();
  }

  fillPieChartData(msg) {
    //console.log(msg);
    this.child.loadData(this.selectedUser,this.selectedMonth);
    this.child2.loadData(this.selectedUser,this.selectedMonth);
  }

}
