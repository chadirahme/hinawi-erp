import { Component, OnInit } from '@angular/core';
import {ApiAuth} from "../../@core/services/api.auth";
import {CdkDragDrop, CdkDragEnd} from "@angular/cdk/drag-drop";
import { moveItemInArray } from '@angular/cdk/drag-drop';
import {WebDashboard} from "../../@core/domains/webdashboard.model";

@Component({
  selector: 'favdashboard',
  templateUrl: './favdashboard.component.html',
  styleUrls: ['./favdashboard.component.scss']
})
export class FavdashboardComponent implements OnInit {

  webDashboard: any;
  isNatFav = false;
  isReligionFav = false;
  isProfitFav = false;
  isFixedAssetFav = false;
  //items = ["nat","religion"];

  items:any[]; //= ['profit','nat','rel'];


  constructor(private apiAuth: ApiAuth) { }

  drop(event: CdkDragDrop<string[]>) {
    let i=0;
    const that = this;
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    console.log(event.currentIndex + " " + event.previousIndex);
    console.log(this.items);
    this.items.forEach(function (value) {
      that.saveData(value,false,i);
      i++;
    });
  }

  dragEnded(event: CdkDragEnd) {
    console.log('dragEnded Event > item', event.source.data);
  }


  ngOnInit() {
    this.items =new Array();
    //this.items.push("profit");
    //this.items.push("nat");
    //this.items.push("rel");
    this.loadData();
  }

  loadData(): void {
    try {
      const that = this;
      this.apiAuth.getUserDashboards(1).subscribe(data => {
        data.result.forEach(function (value) {
          that.items.push(value.dashName);
          if(value.dashName=='nat')
            that.isNatFav=true;
          if(value.dashName=='religion')
            that.isReligionFav=true;
          if(value.dashName=='profit')
            that.isProfitFav=true;
          if(value.dashName=='fixedassets')
            that.isFixedAssetFav=true;

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
    //this.saveData("nat" , !this.isNatFav);
    this.deleteMsg("nat");
    console.log(this.items.length);
  }
  addReligionFav(){
    this.isNatFav=!this.isNatFav;
    //this.saveData("nat" , !this.isNatFav);
    this.deleteMsg("religion");
    console.log(this.items.length);
  }
  addProfitFav(){
    this.deleteMsg("profit");
    //this.saveData("profit" , !this.isProfitFav);
  }
  addFixedAssetFav(){
    this.deleteMsg("fixedassets");
   //this.saveData("fixedassets" , !this.isFixedAssetFav);
  }

  deleteMsg(msg:string) {
    this.saveData(msg,true,0);
    const index: number = this.items.indexOf(msg);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  saveData(dashname , isDelete,dashOrder): void {
    try
    {
      // console.log("grade>> "+ this.apiParam.grade);
      this.webDashboard =new WebDashboard();
      this.webDashboard.userId=1;
      this.webDashboard.dashName=dashname;
      this.webDashboard.dashOrder=dashOrder;

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
