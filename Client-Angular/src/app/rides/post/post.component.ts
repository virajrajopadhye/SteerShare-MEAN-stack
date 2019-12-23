import { RideService } from './../../services/ride.service';
import { CarService } from '../../services/car.service';
import { UserService } from '../../services/user.service';
import { Post } from 'src/app/models/post.model';

import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  currentUser: User;
  currentCar: Car;

  currentDate: string;
  hours: string;

  post: Post = new Post();
  from: string;
  to: string;
  travel_date: string;
  travel_time: string;
  seats: string;
  price: string;
  description: string;
  address: Object;
  establishmentAddress: Object;
  formattedAddress: string;
  formattedEstablishmentAddress: string;
  phone: string;



  constructor(
    private RideService: RideService,
    private UserService: UserService,
    private CarService: CarService,
    private router: Router,
    public zone: NgZone
    ) { }

  ngOnInit() {
    if((this.currentUser = this.UserService.currentUserValue)){
      this.CarService.get(this.currentUser._id)
        .subscribe((car)=>{
          this.currentCar = car;
        });
    }
    else{
      this.router.navigate(['/login'], {queryParams: {returnUrl: this.router.url}});
    }


    this.currentDate = new Date().toISOString().split('T')[0];
    let date = new Date();
    this.hours = date.getHours().toLocaleString();
    const element = document.getElementById('date') as HTMLInputElement;
    element.valueAsNumber =
      Date.now() - new Date().getTimezoneOffset() * 60000;





  }


//Adds ride to databse
  addRide(event: Event) {
    console.log('Add clicked');
    console.log(this.post);
    let from = this.formattedAddress;
    let to= this.formattedEstablishmentAddress;
    this.post.from=from;
    this.post.to=to;
    this.post.username = this.currentUser.username;
    console.log(this.post);

    //Function for validating price (Field should be number)
    function validatePrice(price) {
      // tslint:disable-next-line: max-line-length
      var re = /^\d*[1-9]+\d*$/;
      return re.test(String(price).toLowerCase());
    }

    if(validatePrice(this.post.price)){
      this.RideService.add(this.post).subscribe();
      window.alert('Ride has been posted'); 
      this.router.navigateByUrl('search');
    }
    else{
      window.alert('invalid price')
    }


    }










  getAddress(place: object) {
    this.address = place['formatted_address'];
    this.phone = this.getPhone(place);
    this.formattedAddress = place['formatted_address'];
    this.zone.run(() => this.formattedAddress = place['formatted_address']);
  }
  getEstablishmentAddress(place: object) {
    this.establishmentAddress = place['formatted_address'];
    this.phone = this.getPhone(place);
    this.formattedEstablishmentAddress = place['formatted_address'];
    this.zone.run(() => {
      this.formattedEstablishmentAddress = place['formatted_address'];
      this.phone = place['formatted_phone_number'];
    });
  }

  getAddrComponent(place, componentTemplate) {
    let result;

    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentTemplate[addressType]) {
        result = place.address_components[i][componentTemplate[addressType]];
        return result;
      }
    }
    return;
  }

  getStreetNumber(place) {
    const COMPONENT_TEMPLATE = { street_number: 'short_name' },
      streetNumber = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return streetNumber;
  }

  getStreet(place) {
    const COMPONENT_TEMPLATE = { route: 'long_name' },
      street = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return street;
  }

  getCity(place) {
    const COMPONENT_TEMPLATE = { locality: 'long_name' },
      city = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    console.log(city);
    return city;

  }

  getState(place) {
    const COMPONENT_TEMPLATE = { administrative_area_level_1: 'short_name' },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getDistrict(place) {
    const COMPONENT_TEMPLATE = { administrative_area_level_2: 'short_name' },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getCountryShort(place) {
    const COMPONENT_TEMPLATE = { country: 'short_name' },
      countryShort = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return countryShort;
  }

  getCountry(place) {
    const COMPONENT_TEMPLATE = { country: 'long_name' },
      country = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return country;
  }

  getPostCode(place) {
    const COMPONENT_TEMPLATE = { postal_code: 'long_name' },
      postCode = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return postCode;
  }

  getPhone(place) {
    const COMPONENT_TEMPLATE = { formatted_phone_number: 'formatted_phone_number' },
      phone = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return phone;
  }


}
