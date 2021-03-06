import { Component, Input, OnInit } from '@angular/core';

import {
  NbMenuService, NbSidebarService, NbSearchService, NbWindowService, NbWindowRef,
  NbDialogService, NbDialogRef
} from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
// import {Stomp} from "@stomp/stompjs";
// import * as SockJS from 'sockjs-client';
import {WsTopic} from "../../../@core/services/ws.topic";
import {ApiAuth} from "../../../@core/services/api.auth";
import {Router} from "@angular/router";
import {AddAttendanceComponent} from "../add-attendance/add-attendance.component";
import {NotificationsService} from "angular2-notifications";

//https://www.trycatchclasses.com/how-to-make-facebook-like-notification-popup-tutorial/
@Component({
  //templateUrl: '././chartdashboard.component.html',
  template: `
    <form class="form">
      <label for="subject">Subject:</label>
      <input nbInput id="subject" type="text">

      <label class="text-label" for="text">Text:</label>
      <textarea nbInput id="text"></textarea>
    </form>
    
    
    <!--<div id="notificationContainer">-->
<!--<div id="notificationTitle">Notifications</div>-->
<!--<div id="notificationsBody" class="notifications">111111111111</div>-->
<!--<div id="notificationFooter"><a href="/pages/lists/mobile-attendance">See All</a>222222222</div>-->
<!--</div>-->

  `,
})
export class NbFormComponent {
  constructor(public windowRef: NbWindowRef) {}

  close() {
    this.windowRef.close();
  }
}

@Component({
  selector: 'nb-dialog',
  template: `
    <nb-card [style.width.px]="600" [style.height.px]="500">
      <nb-card-header>{{ title }}</nb-card-header>
      <nb-card-body>
         <nb-list>
        <nb-list-item *ngFor="let message of messages">
        {{ message.userName }} :  {{ message.message }}
        </nb-list-item>
      </nb-list>
      </nb-card-body>
      <nb-card-footer>
        <button nbButton hero status="primary" (click)="dismiss()">Close</button>
      </nb-card-footer>
    </nb-card>
  `,
})
export class NbShowcaseDialogComponent {
  @Input() title: string;
  messages: any[];

  constructor(protected ref: NbDialogRef<NbShowcaseDialogComponent> , private apiAuth: ApiAuth) {
    this.apiAuth.getmessagesList().subscribe(data => {
      this.messages=data.result;
    });
  }

  dismiss() {
    this.ref.close();
  }
}

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  //https://github.com/akveo/nebular/blob/master/src/framework/theme/components/actions/actions.component.ts
  @Input() position = 'normal';

  user: any;
  userName:string;
  battleInit: number;
  customers: any[];
  companyName: string;
  subscription: any;

  //userMenu = [{ title: 'Attendance' }, { title: 'Log out' }];
  userMenu = [{ title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,private windowService: NbWindowService,
              private analyticsService: AnalyticsService,private search: NbSearchService,
              private dialogService: NbDialogService,
              private wsTopic: WsTopic, private apiAuth: ApiAuth,private router: Router,
              private _notifications: NotificationsService) {

    search.onSearchSubmit().subscribe(data => this.sendName(data.term));
  }

  ngOnInit() {
    this.battleInit=0;
    //  setInterval(() => {
    //   this.battleInit++;
    // }, 10000);

    this.user={};
    this.user.name = "ADMIN" //window.localStorage.getItem('email');
    this.user.picture ='assets/images/avatar.jpg';

    // this.userService.getUsers()
     // .subscribe((users: any) => this.user = users.nick);

    //get message count
    this.apiAuth.getmessagesList().subscribe(data => {
      this.battleInit=data.result.length;
    });

    this.wsTopic.change.subscribe(count => {
      this.battleInit = count;
      //this.isOpen = isOpen;
      //this.user.name=isOpen;
    });

    if(this.subscription==null) {
      this.subscription = this.wsTopic.attendanceResult.subscribe(msg => {
        console.log("attendanceResult.subscribe");
        this.notifyUser(msg);
      });
    }

    this.user.name =localStorage.getItem('username');
    this.menuService.onItemClick().subscribe(( event ) => {
      this.onItemSelection(event.item.title);
    });

    this.companyName=localStorage.getItem("companyName");
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  sendName(search) {
    this.wsTopic.sendMessage(search);
    this.battleInit++;
  }

  //(click)="openWindow()"
  openWindow1() {
   // this.windowService.open(NbFormComponent, { title: `Attendance` });
    //this.windowService.open(AddAttendanceComponent, { title: `Attendance` });
    this.dialogService.open(AddAttendanceComponent, {
      context: {
        title: 'Add Attendance: ',
      },
    }).onClose.subscribe (name => name && this.attDone(name));
  }

  attDone(msg){
    alert(msg);
  }

  openWindow() {
    //this.loadData();
    this.dialogService.open(NbShowcaseDialogComponent, {
      context: {
        title: 'Messages List',
        //customers: this.customers,
      },
    });
  }

  loadData(): void {
    try
    {
      // console.log("grade>> "+ this.apiParam.grade);
      this.apiAuth.getCustomersList().subscribe(data => {
        this.customers=data.result;
      });

    }
    catch (e) {
      console.log(e);
    }
  }

  onItemSelection( title ) {
    if ( title === 'Log out' ) {
      // Do something on Log out
      console.log('Log out Clicked ');
      localStorage.removeItem('token');
      localStorage.removeItem('userid');
      localStorage.removeItem('username');
      this.router.navigate(['auth/login']);

    } else if ( title === 'Attendance' ) {
      // Do something on Profile
      //console.log('Profile Clicked ')
      this.openWindow1();
    }
  }

  options = {
    position: ["bottom", "right"],
    timeOut: 9000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    animate: 'scale'
  };

  notifyUser(msg): void{
    let content=localStorage.getItem('username') + " checkIn";
    //this._notifications.create('User Attendance', 'content', 'success', options);
    //msg="123" + "<br/>" + "456" + "<br/>" + "789" + "<br/>" + "101112..."
    const toast = this._notifications.success('Attendance created!', msg );

    //this._notificationService.generateNotification(data);

    var audio = new Audio('assets/images/sms-alert.mp3');
    audio.play();

    this.subscription.unsubscribe();

    // toast.click.subscribe((event) => {
    //   //alert(event)
    //   //reload my component
    // });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  // greetings: string[] = [];
  // disabled = true;
  // name: string;
  // private stompClient = null;
  //
  // connect() {
  //   const socket = new SockJS('http://localhost:8091/gkz-stomp-endpoint');
  //   this.stompClient = Stomp.over(socket);
  //
  //   const _this = this;
  //   this.stompClient.connect({}, function (frame) {
  //     _this.setConnected(true);
  //     console.log('Connected: ' + frame);
  //
  //     _this.stompClient.subscribe('/topic/hi', function (hello) {
  //       _this.showGreeting(JSON.parse(hello.body));
  //     });
  //   });
  // }
  //
  // setConnected(connected: boolean) {
  //   this.disabled = !connected;
  //
  //   if (connected) {
  //     this.greetings = [];
  //   }
  // }
  //
  // disconnect() {
  //   if (this.stompClient != null) {
  //     this.stompClient.disconnect();
  //   }
  //
  //   this.setConnected(false);
  //   console.log('Disconnected!');
  // }
  //
  // sendName() {
  //   this.name="chadi rahme";
  //   this.stompClient.send(
  //     '/gkz/hello',
  //     {},
  //     JSON.stringify({ 'userName': this.name })
  //   );
  // }
  //
  // showGreeting(message) {
  //   console.log(message);
  //   this.greetings.push(message);
  // }

}
