import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {ApiAuth} from "../../../@core/services/api.auth";
import {NbDialogService} from "@nebular/theme";
import {EditProspectiveComponent} from "../edit-prospective/edit-prospective.component";

@Component({
  selector: 'ngx-prospective-list',
  templateUrl: './prospective-list.component.html',
  styleUrls: ['./prospective-list.component.scss']
})
export class ProspectiveListComponent implements OnInit {


  customers: any[];
  contacts: any[];

  source: LocalDataSource = new LocalDataSource();
  contactSource: LocalDataSource = new LocalDataSource();

  settings = {
    mode: 'external',
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
      // recNo: {
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
      telephone1: {
        title: 'Telephone',
        type: 'string',
      },
      // telephone2: {
      //   title: 'Mobile',
      //   type: 'string',
      // },
      // note: {
      //   title: 'Note',
      //   type: 'string',
      // },

      active: {
        title: 'Active',
        type: 'string',
      },
    },
    actions: {
      position: 'right',
      add: true,
      edit:true,
      editable:false,
      columnTitle: '',
    },
  };
  constructor(private apiAuth: ApiAuth,private dialogService: NbDialogService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    try
    {
      // console.log("grade>> "+ this.apiParam.grade);
      this.apiAuth.getProspectiveList().subscribe(data => {
        this.customers=data.result;
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

  createRow(event: any) {
    // console.log('on add event: ', event);
    this.dialogService.open(EditProspectiveComponent, {
      context: {
        title: 'Add New Prospective',
        prospective: null,
      },
    }).onClose.subscribe (name => name && this.checkResult(name));
  }

  checkResult(msg){
    alert('done '+ msg);
    console.log(msg);
    this.loadData();
  }

  editRow(event) {
    console.log('event: ', event.data);
    // this.windowService.open(VendorsListComponent, { title: `Window` });
    //this.windowService.open(EditEmployeeComponent, { title: `Window` });

    this.dialogService.open(EditProspectiveComponent, {
      context: {
        title: 'Edit Prospective: '+ event.data.name,
        prospective: event.data,
      },
    }).onClose.subscribe (name => name && this.checkResult(name));
    //(name => this.result && console.log(name));

  }


}
