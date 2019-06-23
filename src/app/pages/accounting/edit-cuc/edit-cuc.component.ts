import {Component, OnInit, Input} from '@angular/core';
import {ApiAuth} from "../../../@core/services/api.auth";
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'edit-cuc',
  templateUrl: './edit-cuc.component.html',
  styleUrls: ['./edit-cuc.component.scss']
})
export class EditCucComponent implements OnInit {

  @Input() title: string;
  @Input() payment: any;
  disabled:boolean;

  constructor(protected ref: NbDialogRef<EditCucComponent>,
              private authService: ApiAuth) { }

  ngOnInit() {
    this.disabled=true;
  }

  submit() {
    this.ref.close("done");
  }

}
