import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, CdkDragEnd} from "@angular/cdk/drag-drop";
import { moveItemInArray } from '@angular/cdk/drag-drop';
import {DomSanitizer} from "@angular/platform-browser";
import {WebDashboard} from "../../../@core/domains/webdashboard.model";

@Component({
  selector: 'youtube-list',
  templateUrl: './youtube-list.component.html',
  styleUrls: ['./youtube-list.component.scss']
})
export class YoutubeListComponent implements OnInit {

  videos = [];
  safeURL: any;
  webDashboard : WebDashboard;
  //youtubeUrl="https://www.youtube.com/embed/";

  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.videos =new Array();

    this.webDashboard =new WebDashboard();
    this.webDashboard.userId=1;
    this.webDashboard.dashName="Why Hinawi Name was Selected";
    this.webDashboard.dashOrder=0;
    this.webDashboard.safeURL=this._sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/fIgH3j2ZkKg");

    //this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/fIgH3j2ZkKg");

    this.videos.push(this.webDashboard);

    this.webDashboard =new WebDashboard();
    this.webDashboard.userId=1;
    this.webDashboard.dashName="Introduction to Hinawi Software By Hatem Hinawi In Arabic";
    this.webDashboard.dashOrder=1;
    this.webDashboard.safeURL=this._sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/vrBPm1Ko-QI");
    this.videos.push(this.webDashboard);

    this.webDashboard =new WebDashboard();
    this.webDashboard.userId=1;
    this.webDashboard.dashName="Hinawi Software - Browsing HRMS Menu and HR Reports In Arabic";
    this.webDashboard.dashOrder=2;
    this.webDashboard.safeURL=this._sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/QQstEwvkzK4");
    this.videos.push(this.webDashboard);

    this.webDashboard =new WebDashboard();
    this.webDashboard.userId=1;
    this.webDashboard.dashName="Hinawi Software - Browse Taxes Setup in English";
    this.webDashboard.dashOrder=3;
    this.webDashboard.safeURL=this._sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/t7ysX29WT8Q");
    this.videos.push(this.webDashboard);

  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.videos, event.previousIndex, event.currentIndex);
    console.log(event.currentIndex + " " + event.previousIndex);

    console.log(this.videos);
  }
  dragEnded(event: CdkDragEnd) {
    console.log('dragEnded Event > item', event.source.data);
  }


}
