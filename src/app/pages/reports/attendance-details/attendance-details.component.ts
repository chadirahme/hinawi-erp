import { Component, OnInit } from '@angular/core';
import {ApiAuth} from "../../../@core/services/api.auth";

@Component({
  selector: 'attendance-details',
  templateUrl: './attendance-details.component.html',
  styleUrls: ['./attendance-details.component.scss']
})
export class AttendanceDetailsComponent implements OnInit {

  rows: any[];
  // rows = [
  //   { name: 'Austin', gender: 'Male', company: 'Swimlane' },
  //   { name: 'Dany', gender: 'Male', company: 'KFC' },
  //   { name: 'Molly', gender: 'Female', company: 'Burger King' },
  // ];
  columns = [
    { prop: 'userName' , name: 'Employee' },
    // { name: 'userName' },
    { name: 'customerName' },
    { name: 'reasonDesc' },
    { name: 'checkinNote' },
    { name: 'checkoutReasonDesc' },
    { name: 'checkoutNote' },
    { name: 'checkinTime' },
    { name: 'checkoutTime' },
    { name: 'visitDuration' },
  ];

  loadingIndicator = true;

  constructor(private apiAuth: ApiAuth) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    try {
      this.apiAuth.getMobileAttendanceList(3).subscribe(data => {
        this.rows = data.result;
        console.log("done...");
        this.loadingIndicator=false;
      });
    }
    catch (e) {
      console.log(e);
    }
  }

}
