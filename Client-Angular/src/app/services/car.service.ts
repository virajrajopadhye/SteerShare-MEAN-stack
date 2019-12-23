import { Injectable } from '@angular/core';
import { Car } from '../models/car.model';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { 

  }

  public add(car: Car, user_id: string): Observable<Car>{
    car.user_id = user_id;
    const car$ = this.http.post<Car>(`${environment.serverBaseURL}/cars`, car);
    return car$;
  }

  public get(user_id: string): Observable<Car>{
    const car$ = this.http.get<Car>(`${environment.serverBaseURL}/cars/` + user_id);
    return car$;
  }

  public update(car: Car, user_id: string): Observable<Car>{
    car.user_id = user_id;
    const car$ = this.http.put<Car>(`${environment.serverBaseURL}/cars/`, car);
    return car$;
  }
}
