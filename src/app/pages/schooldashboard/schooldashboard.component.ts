import { Component, OnInit } from '@angular/core';
import {ApiAuth} from "../../@core/services/api.auth";
import {WebDashboard} from "../../@core/domains/webdashboard.model";

@Component({
  selector: 'schooldashboard',
  templateUrl: './schooldashboard.component.html',
  styleUrls: ['./schooldashboard.component.scss']
})
export class SchooldashboardComponent implements OnInit {

  webDashboard : WebDashboard;
  constructor(private apiAuth: ApiAuth) { }

  ngOnInit() {
    this.loadData();
  }

  isNatFav = false;
  isReligionFav = false;

  loadData(): void {
    try {
      const that = this;
      this.apiAuth.getUserDashboards(1).subscribe(data => {
        data.result.forEach(function (value) {
          if(value.dashName=='nat')
            that.isNatFav=true;
          if(value.dashName=='religion')
            that.isReligionFav=true;

          //console.log(value);
        });
      });
    }
    catch (e) {
      console.log(e);
    }
  }

  addNatFav(){
    this.isNatFav=!this.isNatFav;
    this.saveData("nat" , !this.isNatFav);
  }

  addReligionFav(){
    this.isReligionFav=!this.isReligionFav;
    this.saveData("religion" , !this.isReligionFav);
  }

    saveData(dashname , isDelete): void {
    try
    {
      // console.log("grade>> "+ this.apiParam.grade);
      this.webDashboard =new WebDashboard();
      this.webDashboard.userId=1;
      this.webDashboard.dashName=dashname;

      if(!isDelete) {
        this.apiAuth.addWebDashboard(this.webDashboard).subscribe(data => {
          console.log(data);
        });
      }
      else {
        this.apiAuth.deleteWebDashBoard(this.webDashboard).subscribe(data => {
          console.log(data);
        });
      }
    }

    catch (e) {
      console.log(e);
    }
  }

}
