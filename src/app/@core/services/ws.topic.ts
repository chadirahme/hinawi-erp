import {Injectable, EventEmitter, Output} from "@angular/core";
import {Stomp} from "@stomp/stompjs";
import * as SockJS from 'sockjs-client';
@Injectable()
export class WsTopic {

  private stompClient = null;
  @Output() change: EventEmitter<string> = new EventEmitter();


  connect() {
    const socket = new SockJS('http://localhost:8091/gkz-stomp-endpoint');
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

  sendMessage(name) {
    //this.name="chadi rahme";
    if (this.stompClient == null) {
      this.connect();
    }
    this.stompClient.send(
      '/gkz/hello',
      {},
      JSON.stringify({ 'userName': name })
    );
  }

  showGreeting(message) {
    console.log(message);
    this.change.emit(message.result);
    //this.greetings.push(message);
  }
}
