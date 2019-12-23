import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ParamMap } from '@angular/router';

import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  @Output() getCurrentUser: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public register(user: User, profileImgName: string){
    user.profileImgName = profileImgName;
    return this.http.post<any>(`${environment.serverBaseURL}/users/register`, user);
  }

  public uploadImage(formData: FormData){
    return this.http.post(`${environment.serverBaseURL}/users/uploadProfileImage`, formData);
  }

  public login(username: string, password: string){
    return this.http.post<any>(`${environment.serverBaseURL}/users/authenticate`, {username, password})
      .pipe(map(user=>{
          if(user && user.token){
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            this.getCurrentUser.emit(user);
          }

          return user;
      }));
  }


  public logout(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    window.location.href = 'http://localhost:4200';
  }
}
