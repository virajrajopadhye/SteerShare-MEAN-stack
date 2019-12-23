import { Booking } from './../models/booking.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

//Add Booking to database
  public add(booking: Booking): Observable<Booking>{
    const bookings$ = this.http.post<Booking>('http://localhost:3000/rides', booking);
    return bookings$;
  }
//Fetch Booking based on parameter ID
  public view(id: string): Observable<Booking>{
    const rides$ = this.http.get<Booking>('http://localhost:3000/rides/'+id);
    return rides$;
  }

  public getUserRides(username: string): Observable<Array<Booking>> {
    const rides$ = this.http.get<Array<Booking>>(`${environment.serverBaseURL}/rides/user/` + username);
    return rides$;
  }

  public getUserPosts(username: string): Observable<Array<Booking>> {
    const posts$ = this.http.get<Array<Booking>>(`${environment.serverBaseURL}/posts/user/` + username);
    return posts$;
  }

  public doNothing(){

  }
//Deletes booking from Database
  public delete(id: string): Observable<Booking> {
    const rides$ = this.http.delete<Booking>('http://localhost:3000/rides/'+id);
    return rides$;
  }



}
