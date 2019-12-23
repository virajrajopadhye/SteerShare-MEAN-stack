import { BookingService } from './../services/booking.service';
import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Booking } from './../models/booking.model';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
 chats : any;
 booking : Booking;
 room:String;
 messageText:String;
 messageArray:Array<{user:String,message:String}> = [];
 constructor(private _chatService:ChatService, private userservice:UserService){
     this._chatService.newUserJoined()
     .subscribe(data=> this.messageArray.push(data));


     this._chatService.userLeftRoom()
     .subscribe(data=>this.messageArray.push(data));

     this._chatService.newMessageReceived()
     .subscribe(data=>this.messageArray.push(data));
 }

  ngOnInit() {

    console.log(this.userservice.currentUserValue.username);

  }



 join(){
    this._chatService.joinRoom({user:this.userservice.currentUserValue.username, room:this.room});
    this._chatService.getChatbyRoom(this.room)
       .subscribe(chat => this.chats.push(chat));



}

leave(){
    this._chatService.leaveRoom({user:this.userservice.currentUserValue.username, room:this.room});
}

sendMessage()
{
    this._chatService.sendMessage({user:this.userservice.currentUserValue.username, room:this.room, message:this.messageText});
}











}
