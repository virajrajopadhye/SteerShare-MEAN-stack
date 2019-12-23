import { Router } from '@angular/router';
import { RideService } from './../../services/ride.service';
import { Location } from './../locations.model';
import { Component, OnInit, EventEmitter, NgZone } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  locations: Array<Location>;
  currentDate: string;
  hours: string;
  address: Object;
  establishmentAddress: Object;
  formattedAddress: string;
  formattedEstablishmentAddress: string;
  phone: string;

  constructor(private rideService: RideService, private router: Router, public zone: NgZone) { }

  ngOnInit() {
    this.rideService.list().subscribe(locations => {
      this.locations = locations;
      this.currentDate = new Date().toISOString().split('T')[0];
      let date = new Date();
      this.hours = date.getHours().toLocaleString();
      const element = document.getElementById('date') as HTMLInputElement;
      element.valueAsNumber =
        Date.now() - new Date().getTimezoneOffset() * 60000;
    });
  }
//Google api functionalities
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

//validate search inputs and send as a query parameter
  validate(event: Event) {
    //let from = (document.getElementById('from') as HTMLInputElement).value;
    //let to = (document.getElementById('to') as HTMLInputElement).value;
    let from = this.formattedAddress;
    let to= this.formattedEstablishmentAddress;
    let date = (document.getElementById('date') as HTMLInputElement).value;
    let time = (document.getElementById('time') as HTMLInputElement).value;
    console.log(date);
    console.log(time);
    //console.log(from);
    console.log(this.formattedAddress);
    console.log(this.getCity);

    if (from === undefined || to === undefined) {
      window.alert('fields cannot be empty');
    }
    else {
      this.rideService
        .searchByLocationAndTime(from, to, date, time)
        .subscribe(posts => {
          if (posts.length !== 0) {
            /**sending parameters to query */
            this.router.navigate(['/result'], {
              queryParams: { from, to, date, time }
            });
          } else {
            window.alert('No rides found between the given locations');
          }
        });
    }
  }
}
