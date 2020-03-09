import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {balance} from "../../../mycomponent/balance.pipe";
import {DecimalPipe, DatePipe} from "@angular/common";
import {ApiAuth} from "../../../@core/services/api.auth";

@Component({
  selector: 'employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {

  reports: any[];
  source: LocalDataSource = new LocalDataSource();
  settings = {
    pager: {
      display: true,
      perPage: 50
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      // custKey: {
      //   title: 'ID',
      //   type: 'number',
      // },
      idx: {
        title : "Sr. No.",
        type : "text",
        filter:false,
        valuePrepareFunction:(value,row,cell) =>{
          const pager = this.source.getPaging();
          const ret = (pager.page-1) * pager.perPage + cell.row.index+1;
          //const ret =  cell.row.index+1;
          return ret;
        }
      },
      employeeNumber: {
        title: 'Empl. No.',
        type: 'string',
        width: '220px',
      },
      englishFullName: {
        title: 'Employee Name',
        type: 'string',
      },

      employeementDate:{
        title: 'Start Work',
        type: 'date',
        valuePrepareFunction: (date) => {
          if (date) {
            return new DatePipe('en-GB').transform(date, 'dd.MM.yyyy');
          }
          return null;
        }
      },
      ratePerHour: {
        title: 'Rate/Hour',
        type: 'number',
        valuePrepareFunction: (amount) => {
          return this.cp.transform(amount);
        }
      },
      active: {
        title: 'Active',
        type: 'string',
      },
    },

  };
  constructor(private apiAuth: ApiAuth,private cp: DecimalPipe,
              private balancePie: balance) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    try
    {
      this.apiAuth.getEmployeesList('A').subscribe(data => {
        this.reports=data.result;
        this.source.load(data.result);
      });
    }
    catch (e) {
      console.log(e);
    }
  }

}
