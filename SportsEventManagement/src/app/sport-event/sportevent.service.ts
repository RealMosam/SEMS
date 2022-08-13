import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class SporteventService {
  readonly APIurl = "https://localhost:44353/api";

  public event: any;
  public sport:any;

  constructor(private http: HttpClient) { }
  Events():Observable<any[]>{
    return this.http.get<any>(this.APIurl + "/Events");
  }
  getEventByName(name:any):Observable<any[]>{
    return this.http.get<any>(this.APIurl + "/Events/GetByName/"+name);
  }
  addEvent(data: any): Observable<any>{
    return this.http.post(this.APIurl + "/Events", data);
  }

  deleteEvent(val: any){
    return this.http.delete(this.APIurl +"/Events/"+val);
  }
  sports():Observable<any[]>{
    return this.http.get<any>(this.APIurl + "/Sports");
  }
  getSportByName(name:any):Observable<any[]>{
    return this.http.get<any>(this.APIurl + "/Sports/GetByName/"+name);
  }
}
