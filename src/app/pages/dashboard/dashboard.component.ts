import {Component, OnInit} from '@angular/core';
import {ApiAuth} from "../../@core/services/api.auth";

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  customers: any[];
  vendors: any[];

  constructor(private apiAuth: ApiAuth) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    try {
      this.apiAuth.getCustomersBalance().subscribe(data => {
        this.customers = data.result;
      });

      this.apiAuth.getVendorsBalance().subscribe(data => {
        this.vendors = data.result;
      });

    }
    catch (e) {
      console.log(e);
    }
  }

  goToHome(user): void{
    alert(user.name);
  }
}
