import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
declare const Pusher: any;

@Injectable()
export class PusherService {
  pusher: any;
  messagesChannel: any;

  constructor() {
    this.initializePusher();
  }

  initializePusher(): void {
    this.pusher = new Pusher('e2e9213efa7b26524a54', { authEndpoint: 'http://localhost:3000/pusher/auth', cluster: 'ap2' });
    this.messagesChannel = this.pusher.subscribe('private-all-messages');
  }
}