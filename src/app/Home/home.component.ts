import 'rxjs/add/operator/finally';
import { Component, OnInit } from '@angular/core';
import { QuoteService } from './quote.service';
import { Message } from '../message.service';
import { MessageService } from '../message.service';
import { NgModel } from '@angular/forms';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  user: string;
  message: string;
  messages: Array<Message>;
  constructor(private messageService: MessageService, public http: Http) {
    this.messages = [];
    this.user = '';
  }

  ngOnInit() {
    this.messageService.messagesStream
      .subscribe(this.newMessageEventHandler.bind(this));

      this.http.get('http://localhost:3000/get')
       .subscribe(res => {
         this.messages = res.json();
         console.dir(this.messages);
       });
  }

  private newMessageEventHandler(event: Message): void {
    this.messages.push(event);
  }

  newMessage(text: string, user: string): void {
    this.messageService.send({text: text, user: user});
    this.message = '';
    var data = {
      user: user,
      text: text 
   }
    this.http.post('http://localhost:3000/insert', data)
       .subscribe(res => {
         console.log(res);
       });
  }


}
