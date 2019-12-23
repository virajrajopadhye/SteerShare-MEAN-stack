import { UserService } from './../services/user.service';
import { User } from './../models/user.model';
import { Booking } from './../models/booking.model';
import { BookingService } from './../services/booking.service';
import { RideService } from './../services/ride.service';
import { Post } from 'src/app/models/post.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

declare var paypal;


@Component({
  selector: 'app-confirmbooking',
  templateUrl: './confirmbooking.component.html',
  styleUrls: ['./confirmbooking.component.scss']
})
export class ConfirmbookingComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  post: Post;
  booking: Booking = new Booking();

  paidFor = false;


  currentUser: User;

  currentDate: string;
  hours: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private RideService: RideService,
    private userService: UserService,
    private BookingService: BookingService,
    private http: Http) { }

  ngOnInit() {




    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.RideService.view(id).subscribe(newPost => { this.post = newPost; });

    this.currentDate = new Date().toISOString().split('T')[0];
    let date = new Date();
    this.hours = date.getHours().toLocaleString();
    const element = document.getElementById('date') as HTMLInputElement;
    // element.valueAsNumber =
    // Date.now() - new Date().getTimezoneOffset() * 60000;


    /**Paypal payment method function  */
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "Your SteerShare Ride from " + this.post.from + " to " + this.post.to,
                amount: {
                  currency_code: 'USD',
                  value: this.post.price
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.paidFor = true;
          this.confirmBooking(null);
        },
        onError: err => {
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);


  }

  confirmBooking(event: Event) {
    let user = {
      email: this.userService.currentUserValue.username,
      start: this.post.from,
      end: this.post.to,
      date: this.post.travel_date,
      time: this.post.travel_time,
      price: this.post.price,
      desc: this.post.description
    }



    console.log(user.email);
    this.RideService.sendEmail('http://localhost:3000/sendmail', user).subscribe(
      data => {
        let res: any = data;
        console.log('mail sent');
      },
      err => {
        console.log('error', err);

      }
    )



    this.booking.email = this.userService.currentUserValue.username,
    this.booking.from = this.post.from;
    this.booking.to = this.post.to;
    this.booking.price = this.post.price;
    this.booking.travel_date = this.post.travel_date;
    this.booking.travel_time = this.post.travel_time;
    console.log(this.booking.from);
    this.booking.driversusername = this.post.username;

    console.log(this.booking.driversusername);





    // tslint:disable-next-line: no-conditional-assignment

    console.log('email is valid')
    // tslint:disable-next-line: no-conditional-assignment
    if ((this.currentUser = this.userService.currentUserValue)) {
      console.log(this.currentUser.username);
      this.booking.username = this.currentUser.username;
      console.log(this.currentUser._id);
      if (typeof this.currentUser._id === "string") {
        console.log("id is a string");
      }
      this.booking.userid = this.currentUser._id;
      this.BookingService.add(this.booking).subscribe();
      //
    }

    /**Navigation to personal home page after successful booking */
    this.router.navigate(['/personal_home']);




  }


}
