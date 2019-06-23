import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {NbDialogService} from "@nebular/theme";
import {DecimalPipe} from "@angular/common";
import {ApiAuth} from "../../../@core/services/api.auth";
import {EditPettycashComponent} from "../edit-pettycash/edit-pettycash.component";

@Component({
  selector: 'pettycash',
  templateUrl: './pettycash.component.html',
  styleUrls: ['./pettycash.component.scss']
})
export class PettycashComponent implements OnInit {

  //reports: any[];
  source: LocalDataSource = new LocalDataSource();
  settings = {
    mode: 'external',
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    //,"memo":"","checkNo":"2","checkDate":"2014-09-28T04:00:00.000+0000","swiftCode":null,"pvdate":"2014-09-28T04:00:00.000+0000","cheque":"Cheque"

    actions: { add: false, edit: true, delete: false ,position:'right'},
    columns: {
      pvNo: {
        title: 'PV No',
        type: 'string',
      },
      pvDate: {
        title: 'PV Date',
        type: 'string',
      },
      payeeType: {
        title: 'Payee Type',
        type: 'string',
      },
      printName: {
        title: 'Print Name',
        type: 'string',
      },
      amount: {
        title: 'Amount',
        type: 'number',
        valuePrepareFunction: (amount) => {
          return this.cp.transform(amount);
        }
      },

      memo: {
        title: 'Memo',
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
      this.apiAuth.getPettyCashList().subscribe(data => {
        //this.reports=data.result;
        this.source.load(data.result);
      });
    }
    catch (e) {
      console.log(e);
    }
  }

  editRow(event) {
    console.log('event: ', event.data);
    this.dialogService.open(EditPettycashComponent,{
      context: {
        title: 'Petty Cash Info: ' + event.data.pvNo,
        payment: event.data,
      }
    }).onClose.subscribe (wsdata => wsdata && this.checkResult(wsdata));
  }

  checkResult(wsdata){
    console.log(wsdata);
  }


}
