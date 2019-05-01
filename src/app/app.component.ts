import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = '';
  message = '';
  chats: any = [];

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    this.getAllMessages();
  }

  getAllMessages() {
    this.chatService
      .getMessages()
      .subscribe(messages => {
        if (messages[0] && !messages[0].id) {
          this.chats.push(messages[0]);
        } else {
          this.chats = JSON.parse(JSON.stringify(messages));
        }
      });
  }

  sendMessage() {
    const obj = {
      name: this.name,
      message: this.message
    };
    this.chatService.sendMessage(obj);
    this.message = '';
  }

  clear() {
    this.chatService.clearMessages();
    this.chatService.messagesCleared().
      subscribe(data => {
        console.log(data);
        if (data.message === 'cleared') {
         this.chats = [];
        }
      });
  }

}
