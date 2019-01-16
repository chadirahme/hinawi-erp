import { Component, OnInit } from '@angular/core';
import {ApiAuth} from "../../@core/services/api.auth";

@Component({
  selector: 'favdashboard',
  templateUrl: './favdashboard.component.html',
  styleUrls: ['./favdashboard.component.scss']
})
export class FavdashboardComponent implements OnInit {

  isNatFav = false;
  isReligionFav = false;

  constructor(private apiAuth: ApiAuth) { }

  ngOnInit() {
    this.loadData();
  }

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

}
