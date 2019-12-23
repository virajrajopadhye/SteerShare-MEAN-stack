

import { Post } from './../models/post.model';
import { Location } from './../rides/locations.model';
import { Injectable, EventEmitter} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

//Import data models



@Injectable({
  providedIn: 'root'
})
export class RideService {



  constructor(private http: HttpClient) { }


  public list(): Observable<Array<Location>> {
    const locations$ = this.http.get<Location[]>('assets/locations.json');
    return locations$;
  }

  public view(id: string): Observable<Post>{
    const posts$ = this.http.get<Post>('http://localhost:3000/posts/'+id);
    return posts$;
  }

  //Searches rides based on Location and Time
  public searchByLocationAndTime(from: string, to: string, travel_date: string, travel_time: string): Observable<Array<Post>> {
    const params = new HttpParams()
      .set('from', from)
      .set('to', to)
      .set('travel_date', travel_date)
      .set('travel_time', travel_time);
    let posts$ = this.http.get<Array<Post>>("http://localhost:3000/posts", {params});



    return posts$;

  }
//Send email function
  public sendEmail(url, data){
    return this.http.post(url,data);
  }

//Add Post to database
  public add(post: Post): Observable<Post>{
    const posts$ = this.http.post<Post>('http://localhost:3000/posts', post);
    return posts$;
  }

  public searchByExactDateTime(from: string, to: string, travel_date: string, travel_time: string): Observable<Array<Post>> {
    const params = new HttpParams()
      .set('from', from)
      .set('to', to)
      .set('travel_date', travel_date)
      .set('travel_time', travel_time)
      .set('exact', 'true');
    const posts$ = this.http.get<Array<Post>>("http://localhost:3000/posts", {params});
    return posts$;
  }
//Searches rides just by location(Unused)
  public searchByLocation(from: string, to: string, travel_date: string): Observable<Array<Post>> {
    const params = new HttpParams()
      .set('from', from)
      .set('to', to)
      .set('travel_date', travel_date);
    const posts$ = this.http.get<Array<Post>>("http://localhost:3000/posts", {params});
    return posts$;
  }



}
