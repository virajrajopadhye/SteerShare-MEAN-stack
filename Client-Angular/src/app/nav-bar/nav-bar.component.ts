import { BookingService } from './../services/booking.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Booking } from './../models/booking.model';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  currentUser: User;
  loggedin: boolean;
  booking: Booking;

  constructor(
    private router: Router,
    private userService: UserService,
    private bookingService: BookingService

  ) {}

  ngOnInit() {
    //Check for current loggedin user 
    if(this.userService.currentUserValue){
      console.log(this.userService.currentUserValue);
      this.loggedin = true;
      this.currentUser = this.userService.currentUserValue;
    }
    this.userService.getCurrentUser.subscribe((user)=>{
      this.loggedin = true;
      this.currentUser = user;
    })
  }

  //Log the user out
  logout(){
    this.loggedin = false;
    this.userService.logout();
  }

  //Routing settings for post button
  ifLoggedIn(event:Event){
    if(this.userService.currentUserValue){
      this.router.navigate(['/post']);

  } else{
    this.router.navigate(['/login']);
  }}

  /**Checks if user is logged in or not(for chat) */
  ifLoggedInchat(event:Event){
  if(this.userService.currentUserValue){
    this.router.navigate(['/chat']);
  } else{
    window.alert('Please check if a booking is confirmed to chat with your SteerMate')
  }}






}
