import {Injectable, EventEmitter, Output} from "@angular/core";
import {Stomp} from "@stomp/stompjs";
import * as SockJS from 'sockjs-client';
@Injectable()
export class WsTopic {

   //baseUrl: string ='http://localhost:8091/ws';
    baseUrl: string = 'http://hinawi2.dyndns.org:8091/ws';
  private stompClient = null;
  demo: boolean =false;
  //baseUrl: string;


  @Output() change: EventEmitter<string> = new EventEmitter();

  constructor(){
    let url = window.location.href;
    this.demo= url.indexOf("demo")>0;
    if (this.demo==true) {
      this.baseUrl = 'https://hinawi2.dyndns.org:8092/ws/';
    }
    else{
      this.baseUrl = 'https://hinawi2.dyndns.org:8091/ws/';
      //this.baseUrl = 'https://localhost:8091/ws/';
    }
  }

  connect() {
    const socket = new SockJS(this.baseUrl);
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame) {
      //_this.setConnected(true);
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe('/topic/hi', function (hello) {
        _this.showGreeting(JSON.parse(hello.body));
      });
    });
  }

  sendMessage(message) {
    //this.name="chadi rahme";
    console.log('sendMessage>> '+message);
    if (this.stompClient == null) {
      console.log('stompClient = nul');
      this.connect();
    }
    console.log('stompClient != nul');
    this.stompClient.send(
      '/app/hello',
      {},
      JSON.stringify({ 'userName': localStorage.getItem('username') ,
        'message':message ,'userId': localStorage.getItem('userid') })
    );
  }

  showGreeting(message) {
    console.log(message);
    this.change.emit(message.result);
    //this.greetings.push(message);
  }
}
