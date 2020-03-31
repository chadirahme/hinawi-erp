import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {ApiAuth} from "../../../@core/services/api.auth";
import {DatePipe, DecimalPipe} from "@angular/common";

@Component({
  selector: 'vendors-list',
  templateUrl: './vendors-list.component.html',
  styleUrls: ['./vendors-list.component.scss']
})
export class VendorsListComponent implements OnInit {

  customers: any[];
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
      name: {
        title: 'Name',
        type: 'string',
      },
      arName: {
        title: 'Arabic Name',
        type: 'string',
      },
      companyName: {
        title: 'Company Name',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      balance: {
        title: 'Balance',
        type: 'number',
        valuePrepareFunction: (amount) => {
          return this.cp.transform(amount);
        }
      },
      timeCreated:{
        title: 'Date Created',
        type: 'date',
        valuePrepareFunction: (date) => {
          if (date) {
            return new DatePipe('en-GB').transform(date, 'dd.MM.yyyy');
          }
          return null;
        }
      },
      active: {
        title: 'Active',
        type: 'string',
      },
      note: {
        title: 'Note',
        type: 'string',
      },
    },
  };

  constructor(private apiAuth: ApiAuth,private cp: DecimalPipe) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    try {
      // console.log("grade>> "+ this.apiParam.grade);
      this.apiAuth.getVendorsList().subscribe(data => {
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
