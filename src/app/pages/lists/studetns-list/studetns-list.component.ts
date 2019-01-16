import { Component, OnInit } from '@angular/core';
import {ApiAuth} from "../../../@core/services/api.auth";
import {LocalDataSource} from "ng2-smart-table";

@Component({
  selector: 'studetns-list',
  templateUrl: './studetns-list.component.html',
  styleUrls: ['./studetns-list.component.scss']
})
export class StudetnsListComponent implements OnInit {

  students: any[];
  source: LocalDataSource = new LocalDataSource();
  settings = {
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
      enrollNo: {
        title: 'EnrollNo',
        type: 'number',
      },
      enFirstName: {
        title: 'First Name',
        type: 'string',
      },
      enMiddleName: {
        title: 'Middle Name',
        type: 'string',
      },
      enLastName: {
        title: 'Last Name',
        type: 'string',
      },
    },
  };

  constructor(private apiAuth: ApiAuth) { }

  ngOnInit() {
    this.loadData();
  }

  onSearch(query: string = '') {
    if(query==='') {
      this.source.load(this.students);
      return;
    }
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'enFirstName',
        search: query
      },
      {
        field: 'enMiddleName',
        search: query
      },
      {
        field: 'enLastName',
        search: query
      },
      {
        field: 'enrollNo',
        search: query
      }
    ], false);
    // second parameter specifying whether to perform 'AND' or 'OR' search
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }

  loadData(): void {
    try
    {
      // console.log("grade>> "+ this.apiParam.grade);
      this.apiAuth.getstudentsList().subscribe(data => {
        this.students=data.result;
        this.source.load(data.result);
        //this.source = new LocalDataSource(this.students);
      });

    }
    catch (e) {
      console.log(e);
    }
  }

  onCreateConfirm(event):void {
    if (window.confirm('Are you sure you want to create?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event):void {
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
