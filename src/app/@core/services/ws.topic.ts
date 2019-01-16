import {Injectable, EventEmitter, Output} from "@angular/core";
import {Stomp} from "@stomp/stompjs";
import * as SockJS from 'sockjs-client';
@Injectable()
export class WsTopic {

   baseUrl: string ='http://localhost:8091/gkz-stomp-endpoint';
   //baseUrl: string = 'http://hinawi2.dyndns.org:8091/gkz-stomp-endpoint';
  private stompClient = null;
  //baseUrl: string;


  @Output() change: EventEmitter<string> = new EventEmitter();

  constructor(){
    //this.baseUrl = baseUrl;
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
    if (this.stompClient == null) {
      this.connect();
    }
    this.stompClient.send(
      '/gkz/hello',
      {},
      JSON.stringify({ 'userName': 'Admin' , 'message':message ,'userId': 1 })
    );
  }

  showGreeting(message) {
    console.log(message);
    this.change.emit(message.result);
    //this.greetings.push(message);
  }
}
