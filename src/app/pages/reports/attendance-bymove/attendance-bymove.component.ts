import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {ApiAuth} from "../../../@core/services/api.auth";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'attendance-bymove',
  templateUrl: './attendance-bymove.component.html',
  styleUrls: ['./attendance-bymove.component.scss']
})
export class AttendanceBymoveComponent implements OnInit {

  ngModelDate: Date;
  usersList: any[];
  selectedUser: any;
  source: LocalDataSource = new LocalDataSource();
  reports: any[];

 //"checkinTime":"2020-03-06 00:10:40","checkoutTime":"2020-03-06 00:04:08","monthName":null,"totalHours":0,"totalMinutes":0,
  // "reasonDesc":"Personal","checkDate":null,"ratePerHour":null,"checkinLatitude":null,"checkinLongitude":null,"checkoutLatitude":null,"checkoutLongitude":null,
  // "checkinNote":null,"checkoutNote":null,"customerType":null,"customerName":null,"checkoutReasonDesc":"Finish Work",
  // "fromCustomerName":"Customer 02","toCustomerName":"New Vendor","visitDuration":"0 Hours -6 Minutes ",
  // "monthlyDuration":"0 Hours 00 Minutes","monthlyRate":0.0}],"success":false}

  settings = {
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      fromCustomerName: {
        title: 'Move From'
      },
      checkoutTime: {
        title: 'Move At'
      },
      checkoutReasonDesc: {
        title: 'Check Out Reason'
      },
      toCustomerName: {
        title: 'Arrive To'
      },
      checkinTime: {
        title: 'Arrive At'
      },
      reasonDesc: {
        title: 'Check In Reason'
      },
      moveDuration: {
        title: 'Move Duration'
      },
      visitDistance: {
        title: 'Distance'
      },
      reportVisitDuration: {
        title: 'Visit Duration'
      },
    }
  };

  data = [
    {
      checkInVisitor: "Customer 01",
      checkInReason: "Visiting - Training Customer",
      checkOutReason: "Moving In \ Out (Transportation)",
      checkOutVisitor: "Explorer Computer",
      duration: "0 Hours 45 Minutes",
      distance: "3 K.M",
    },
    {
      checkInVisitor: "Prospective 01",
      checkInReason: "Demo",
      checkOutReason: "Moving In \ Out (Transportation)",
      checkOutVisitor: "Customer 01",
      duration: "0 Hours 35 Minutes",
      distance: "4.5 K.M",

    },
    {
      checkInVisitor: "Vendor 01",
      checkInReason: "Visit",
      checkOutReason: "Moving In \ Out (Transportation)",
      checkOutVisitor: "Prospective 01",
      duration: "1 Hours 5 Minutes",
      distance: "7.5 K.M",
    },

    {
      checkInVisitor: "Explorer Computer",
      checkInReason: "At Work",
      checkOutReason: "Moving In \ Out (Transportation)",
      checkOutVisitor: "Vendor 01",
      duration: "0 Hours 15 Minutes",
      distance: "3 K.M",
    },
  ];
  constructor(private apiAuth: ApiAuth,private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.ngModelDate = new Date();
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
      let start = this.datePipe.transform(this.ngModelDate,"yyyy-MM-dd");

      this.apiAuth.getAttendanceByMovement(this.selectedUser,start,'').subscribe(data => {
        this.reports = data.result;
        this.source.load(data.result);
        console.log("done...");
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

}
