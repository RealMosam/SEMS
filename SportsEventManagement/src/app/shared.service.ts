import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { validateLocaleAndSetLanguage } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIurl = "https://localhost:44357/api";


  constructor(private http: HttpClient) { }

  players():Observable<any[]>{
    return this.http.get<any>(this.APIurl + "/players");
  }

  addPlayer(data: any) {
    return this.http.post<any>(this.APIurl+"/players", data);
  }

  deletePlayer(val: any){
    return this.http.delete(this.APIurl +"/players/"+val);
  }



}
