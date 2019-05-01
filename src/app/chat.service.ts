import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

export class ChatService {
  private url = 'http://localhost:4000';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  public getMessages = () => {
    return Observable.create(observer => {
      this.socket.on('output', messages => {
        observer.next(messages);
      });
    });
  }

  public sendMessage(message) {
    this.socket.emit('input', message);
  }

  public clearMessages() {
    this.socket.emit('clear');
  }

  public messagesCleared() {
    return Observable.create(observer => {
    this.socket.on('cleared', (data) => {
      observer.next({message: 'cleared'});
    });
  });
  }
}
