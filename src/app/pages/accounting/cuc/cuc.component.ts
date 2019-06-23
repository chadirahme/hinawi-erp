import { Component, OnInit } from '@angular/core';
import {ApiAuth} from "../../../@core/services/api.auth";
import {LocalDataSource} from "ng2-smart-table";
import {CurrencyPipe, DecimalPipe} from "@angular/common";
import {NbDialogService} from "@nebular/theme";
import {EditCucComponent} from "../edit-cuc/edit-cuc.component";

@Component({
  selector: 'cuc',
  templateUrl: './cuc.component.html',
  styleUrls: ['./cuc.component.scss']
})
export class CucComponent implements OnInit {

  customers: any[];
  source: LocalDataSource = new LocalDataSource();
  settings = {
    mode: 'external',
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    actions: { add: false, edit: true, delete: false ,position:'right'},
    columns: {
      rvno: {
        title: 'RV No',
        type: 'string',
      },
      rvdate: {
        title: 'RV Date',
        type: 'string',
      },
      customerName: {
        title: 'Payee Name',
        type: 'string',
      },
      chequeNo: {
        title: 'Cheque No',
        type: 'string',
      },
      chequeDate: {
        title: 'Cheque Date',
        type: 'string',
      },
      amount: {
        title: 'Amount',
        type: 'number',
        valuePrepareFunction: (amount) => {
          return this.cp.transform(amount);
        }
      },

      status: {
        title: 'Status',
        type: 'string',
      },

      postToQBBy: {
        title: 'Post To QB By',
        type: 'string',
      },

    },
  };

  constructor(private apiAuth: ApiAuth,private cp: DecimalPipe,private dialogService: NbDialogService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    try
    {
      // console.log("grade>> "+ this.apiParam.grade);
      this.apiAuth.getCUCList().subscribe(data => {
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

  editRow(event) {
    console.log('event: ', event.data);
    this.dialogService.open(EditCucComponent,{
      context: {
        title: 'Cheque Details: ' + event.data.customerName,
        payment: event.data,
      }
    }).onClose.subscribe (name => name && this.checkResult(name));

  }

  checkResult(msg){
    console.log(msg);
    //this.loadData();
    //console.log(this.selectedSupplier);
    //this.callType("");
  }

}
