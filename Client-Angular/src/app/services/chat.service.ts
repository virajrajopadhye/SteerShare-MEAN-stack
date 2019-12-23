import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = 'http://localhost:3000/';
  private socket;
  private http;

  constructor(http: Http) {

    this.socket = io(this.url);
   }


  public joinRoom(data)
   {
       this.socket.emit('join',data);
   }

 

  public newUserJoined()
   {
       let observable = new Observable<{user:String, message:String}>(observer=>{
           this.socket.on('new user joined', (data)=>{
               observer.next(data);
           });
           return () => {this.socket.disconnect();}
       });

       return observable;
   }

  public leaveRoom(data){
    this.socket.emit('leave',data);
}


public userLeftRoom(){
  let observable = new Observable<{user:String, message:String}>(observer=>{
      this.socket.on('left room', (data)=>{
          observer.next(data);
      });
      return () => {this.socket.disconnect();}
  });

  return observable;
}



   public sendMessage(message){
     this.socket.emit('message', message);
   }


    public getChatbyRoom(room){
    let observable = new Observable<{room: String, name : String, message : String, updated_at: {type: Date}}>(observer=>{
        observer.next(this.http.get('http://localhost:3000/chat/'+room));
        
    })
    return observable;
}





 public newMessageReceived(){
  let observable = new Observable<{user:String, message:String}>(observer=>{
      this.socket.on('new message', (data)=>{
          observer.next(data);
      });
      return () => {this.socket.disconnect();}
  });

  return observable;
}


}


