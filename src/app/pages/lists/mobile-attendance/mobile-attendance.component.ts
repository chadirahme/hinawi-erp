import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {ApiAuth} from "../../../@core/services/api.auth";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'mobile-attendance',
  templateUrl: './mobile-attendance.component.html',
  styleUrls: ['./mobile-attendance.component.scss']
})
export class MobileAttendanceComponent implements OnInit {

  selectedMonth: any;
  customers: any[];
  source: LocalDataSource = new LocalDataSource();
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
      // custom: [
      //   { name: 'editrecord', title: '<div class="customformat"><i class="nb-email"></i></div>' }
      // ],
      // position: 'right',
      // class:'action-column'
    },
    // actions: false,
    // add: {
    //   addButtonContent: '<i class="nb-plus"></i>',
    //   createButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    //   confirmCreate: true,
    // },
    // edit: {
    //   editButtonContent: '<i class="nb-edit"></i>',
    //   saveButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    //   confirmSave: true,
    // },
    // delete: {
    //   deleteButtonContent: '<i class="nb-trash"></i>',
    //   confirmDelete: true,
    // },
    columns: {
      userName: {
        title: 'Employee',
        type: 'string',
        width: '120px',
      },
      // customerType: {
      //   title: 'Type',
      //   type: 'string',
      // },
      customerName: {
        title: 'Name & Type',
        type: 'string',
        valuePrepareFunction: (cell, row) => { return row.customerName + ' - ' + row.customerType },
        width: '200px',
      },
      reasonDesc: {
        title: 'CheckIn Reason',
        type: 'string',
        width: '150px',
      },
      checkinNote: {
        title: 'CheckIn Note',
        type: 'string',
        rowClassFunction: (row) =>{
            return 'checkinNote';
        }
      },
      checkoutReasonDesc: {
        title: 'CheckOut Reason',
        type: 'string',
        class: 'checkinNote',
        width: '150px',
      },
      checkoutNote: {
        title: 'CheckOut Note',
        type: 'string',
      },
      checkinTime: {
        title: 'Checkin Time',
        type: 'string',
        width: '120px',
        valuePrepareFunction: (val) => {
          return this.datePipe.transform(val,'dd.MM.yyyy h:mm:ss a ');
        }
      },
      checkoutTime: {
        title: 'Checkout Time',
        type: 'string',
        width: '120px',
        valuePrepareFunction: (val) => {
          return this.datePipe.transform(val,'dd.MM.yyyy h:mm:ss a ');
        }
      },
      visitDuration: {
        title: 'Duration',
        type: 'string',
        width: '180px',
      },
      // visitDistance: {
      //   title: 'Distance',
      //   type: 'string',
      // },
    },
  };

  constructor(private apiAuth: ApiAuth,private datePipe: DatePipe) {
  }

  ngOnInit() {
    let month = new Date();
    this.selectedMonth=month.getMonth()+1;
    //this.loadData();
  }

  loadData(): void {
    try {
      // console.log("grade>> "+ this.apiParam.grade);
      this.apiAuth.getMobileAttendanceList(this.selectedMonth).subscribe(data => {
        this.customers = data.result;
        this.source.load(data.result);
        //this.dataSource = new MatTableDataSource(data);
        //this.dataSource.paginator = this.paginator;
        // this.fileUploads =data;
        // this.student=data;
        //this.dataSource = new MatTableDataSource(data);
        // this.loadStudentData();
      });

    }
    catch (e) {
      console.log(e);
    }
  }

  onCreateConfirm(event): void {
    if (window.confirm('Are you sure you want to create?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event): void {
    console.log(event.newData);
    event.confirm.resolve(event.newData);
    //alert('save');
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
