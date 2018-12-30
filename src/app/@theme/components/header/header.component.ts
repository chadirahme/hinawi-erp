import { Component, Input, OnInit } from '@angular/core';

import {NbMenuService, NbSidebarService, NbSearchService, NbWindowService, NbWindowRef} from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
// import {Stomp} from "@stomp/stompjs";
// import * as SockJS from 'sockjs-client';
import {WsTopic} from "../../../@core/services/ws.topic";

@Component({
  //templateUrl: '././chartdashboard.component.html',
  template: `
    <form class="form">
      <label for="subject">Subject:</label>
      <input nbInput id="subject" type="text">

      <label class="text-label" for="text">Text:</label>
      <textarea nbInput id="text"></textarea>
    </form>
  `,
})
export class NbFormComponent {
  constructor(public windowRef: NbWindowRef) {}

  close() {
    this.windowRef.close();
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
  battleInit: number;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,private windowService: NbWindowService,
              private analyticsService: AnalyticsService,private search: NbSearchService,
              private wsTopic: WsTopic) {

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



    this.wsTopic.change.subscribe(isOpen => {
      //this.isOpen = isOpen;
      this.user.name=isOpen;
    });
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

  openWindow() {
    this.windowService.open(NbFormComponent, { title: `Window` });
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
