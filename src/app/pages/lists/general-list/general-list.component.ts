import { Component, OnInit } from '@angular/core';
import {ApiAuth} from "../../../@core/services/api.auth";
import {LocalDataSource} from "ng2-smart-table";
import {HRListValues} from "../../../@core/domains/webdashboard.model";

@Component({
  selector: 'general-list',
  templateUrl: './general-list.component.html',
  styleUrls: ['./general-list.component.scss']
})
export class GeneralListComponent implements OnInit {

  hrFieldsList: any[];
  selectedField: any;
  source: LocalDataSource = new LocalDataSource();
  hrListValues: HRListValues;

  settings = {
    //selectMode: 'multi', // just add this
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
      description: {
        title: 'Description',
        type: 'string',
      },
      arDescription: {
        title: 'Arabic Description',
        type: 'string',
      },
      defaultValue: {
        title: 'Default Value',
        type: 'string',
      },
      // required: {
      //   title: 'Required',
      //   type: 'string',
      // },
      // required: {
      //   title: 'Passed',
      //   filter: {
      //     type: 'checkbox',
      //     config: {
      //       true: 'Y',
      //       false: 'N',
      //       resetText: 'clear',
      //     },
      //   },
      // },
      // required: {
      //   title: 'required checked',
      //   type: 'text',
      //   defaultValue: true,
      //   editor: {
      //     type: 'checkbox'
      //   },
      //   config:{
      //     true: 'Y',
      //     false:'N',
      //     resetText: 'clear',
      //   }
      // },
      required:{
        title: 'required checked',
        type: 'html',
        valuePrepareFunction: (data) => { return '<input type="checkbox" checked>' }
      },
      priorityId: {
        title: 'Priority',
        type: 'number',
      },
      isEdit: {
        title: 'Is Edit',
        type: 'string',
      },
      notes: {
        title: 'Notes',
        type: 'string',
      },
    },
  };

  constructor(private apiAuth: ApiAuth) {
  }

  ngOnInit() {
    // setTimeout(() => {
    //   this.dynamicItems = [{title: 'dItem1'}, {title: 'dItem2'}];
    // }, 1000);
    this.loadHRListFieldsData();
  }

  loadHRListFieldsData(): void {
    try {
      this.apiAuth.getHRListFields().subscribe(data => {
        this.hrFieldsList = data.result;
        this.selectedField=0;
      });
    }
    catch (e) {
      console.log(e);
    }
  }

  callType(value){
    //if(value==null)
    console.log(this.selectedField);
    this.loadData(this.selectedField.fieldId);
    // if(this.selectedSupplier==0){
    //   this.source.load(this.alldata);
    //   this.filterAmount=0;
    //   return;
    // }
    // this.filterData = this.alldata.filter(pilot => pilot.supplier.supplierid===this.selectedSupplier.supplierid);
    // this.source.load(this.filterData);
    // this.source.refresh();
    // this.calTotalSupplierPayments(this.selectedSupplier.suppliername);

  }

  loadData(fieldId): void {
    try {
      this.apiAuth.getHRListValues(fieldId).subscribe(data => {
        this.source.load(data.result);
        //this.dataSource = new MatTableDataSource(data);
        //this.dataSource.paginator = this.paginator;
        // this.fileUploads =data;
        // this.student=data;
        //this.dataSource = new MatTableDataSource(data);
        // this.loadStudentData(); getHRListValues(fieldId)
      });
    }
    catch (e) {
      console.log(e);
    }
  }

  onCreateConfirm(event):void {
    if (window.confirm('Are you sure you want to create?')) {
      //event.newData['description'] += ' + added in code';
      event.confirm.resolve(event.newData);
      this.hrListValues=new HRListValues();
      this.hrListValues = event.newData;
      this.hrListValues.id=0;
      this.hrListValues.subId=0;
      this.hrListValues.priorityId=1;
      this.hrListValues.fieldId=this.selectedField.fieldId;
      this.hrListValues.fieldName=this.selectedField.fieldName;

      this.apiAuth.saveHRListValues(this.hrListValues).subscribe(data => {
        console.log(data);
        alert('save');
      });

    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event):void {
    console.log(event.newData);
    event.confirm.resolve(event.newData);
    this.hrListValues=new HRListValues();
    this.hrListValues = event.newData;

    this.apiAuth.saveHRListValues(this.hrListValues).subscribe(data => {
      console.log(data);
      alert('save');
    });

  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
