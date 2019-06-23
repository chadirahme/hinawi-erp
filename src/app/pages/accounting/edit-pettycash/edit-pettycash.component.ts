import {Component, OnInit, Input} from '@angular/core';
import {ChequeModel} from "../../../@core/domains/webdashboard.model";
import {ApiAuth} from "../../../@core/services/api.auth";
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'edit-pettycash',
  templateUrl: './edit-pettycash.component.html',
  styleUrls: ['./edit-pettycash.component.scss']
})
export class EditPettycashComponent implements OnInit {

  @Input() title: string;
  @Input() payment: any;
  disabled:boolean;
  chequeModel: ChequeModel;

  constructor(protected ref: NbDialogRef<EditPettycashComponent>,
              private authService: ApiAuth) { }

  ngOnInit() {
    this.disabled=true;
  }

  submit() {
    this.ref.close('done');
  }

}
