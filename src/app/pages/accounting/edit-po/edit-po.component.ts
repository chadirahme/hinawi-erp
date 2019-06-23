import {Component, OnInit, Input} from '@angular/core';
import {ApiAuth} from "../../../@core/services/api.auth";
import {NbDialogRef} from "@nebular/theme";
import {ChequeModel} from "../../../@core/domains/webdashboard.model";

@Component({
  selector: 'edit-po',
  templateUrl: './edit-po.component.html',
  styleUrls: ['./edit-po.component.scss']
})
export class EditPoComponent implements OnInit {

  @Input() title: string;
  @Input() payment: any;
  disabled:boolean;
  chequeModel: ChequeModel;

  constructor(protected ref: NbDialogRef<EditPoComponent>,
              private authService: ApiAuth) { }

  ngOnInit() {
    this.disabled=true;
  }

  submit() {
    this.chequeModel=new ChequeModel();
    this.chequeModel.id=this.payment.id;
    this.authService.approvePO(this.chequeModel).subscribe(data => {
      console.log(data);
      this.ref.close(data);
    });
  }

}
