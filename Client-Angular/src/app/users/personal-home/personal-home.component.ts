import { BookingService } from './../../services/booking.service';
import { RideService } from './../../services/ride.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CarService } from '../../services/car.service';
import { User } from '../../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { Booking } from 'src/app/models/booking.model';


@Component({
  selector: 'app-personal-home',
  templateUrl: './personal-home.component.html',
  styleUrls: ['./personal-home.component.scss']
})
export class PersonalHomeComponent implements OnInit {
  currentUser: User;
  currentCar: Car;
  userRides: Array<Booking>;
  userPosts: Array<Booking>;
  upcomingRides: Array<Booking>;
  historyRides: Array<Booking>;
  booking: Booking;
  bookings: Array<Booking>;

  constructor(
    private userService: UserService,
    private carService: CarService,
    private bookingService: BookingService,
    private router: Router,
    private route: ActivatedRoute,
    private rideService: RideService,
  ) { }

  ngOnInit() {
    //Check for current user and fetch their car information
    if((this.currentUser = this.userService.currentUserValue)){
      this.carService.get(this.currentUser._id)
        .subscribe((car)=>{
          this.currentCar = car;
          this.bookingService.getUserRides(this.currentUser.username).subscribe((rides) => {
            this.userRides = rides;
          });
          this.bookingService.getUserPosts(this.currentUser.username).subscribe((posts) => {
            this.userPosts = posts;
            console.log(this.userPosts);
          });
        })
    }
    else{
      this.router.navigate(['/login'], {queryParams: {returnUrl: this.router.url}});
    }

  }

deleteRides(ride: Booking){
  this.bookingService.delete(ride._id).subscribe();
  window.alert('ride deleted');
  location.reload();
}

}
