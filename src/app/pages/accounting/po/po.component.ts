import { Component, OnInit } from '@angular/core';
import {NbDialogService} from "@nebular/theme";
import {DecimalPipe} from "@angular/common";
import {ApiAuth} from "../../../@core/services/api.auth";
import {LocalDataSource} from "ng2-smart-table";
import {EditPoComponent} from "../edit-po/edit-po.component";

@Component({
  selector: 'po',
  templateUrl: './po.component.html',
  styleUrls: ['./po.component.scss']
})
export class PoComponent implements OnInit {

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
      id: {
        title: 'Ref No',
        type: 'string',
      },
      rvdate: {
        title: 'PO Date',
        type: 'string',
      },
      vendorName: {
        title: 'Vendor Name',
        type: 'string',
      },
      itemName: {
        title: 'Item Name',
        type: 'string',
      },
      amount: {
        title: 'Amount',
        type: 'number',
        valuePrepareFunction: (amount) => {
          return this.cp.transform(amount);
        }
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
      this.apiAuth.getPOList().subscribe(data => {
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
    this.dialogService.open(EditPoComponent,{
      context: {
        title: 'Approve Purchase Order: ' + event.data.vendorName,
        payment: event.data,
      }
    }).onClose.subscribe (wsdata => wsdata && this.checkResult(wsdata));

  }

  checkResult(wsdata){
    console.log(wsdata);
    if(wsdata.result==1){
      alert("Purchase Order approved..");
    }
    this.loadData();
    //console.log(this.selectedSupplier);
    //this.callType("");
  }


}
