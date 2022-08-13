import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {
  readonly APIurl = "https://localhost:44313/api";
  public participations: any=[];
  

  constructor(private http:HttpClient) { }
  getParticipations():Observable<any[]>{
    return this.http.get<any>(this.APIurl +"/Participation");
  }
  getPendingParticipants(status:any):Observable<any[]>{
    return this.http.get<any>(this.APIurl+"/Participation/getPendingParticipations/"+status);
  }
  getApprovedParticipants(status:any):Observable<any[]>{
    return this.http.get<any>(this.APIurl+"/Participation/getApprovedParticipations/"+status);
  }
  getDeclinedParticipants(status:any):Observable<any[]>{
    return this.http.get<any>(this.APIurl+"/Participation/getDeclinedParticipations/"+status);
  }

  updateStatus(participantId:any,status:any){
    console.log(status);
    return this.http.put<any>(this.APIurl+"/Participation/"+participantId,status);
  }
  addParticipant(data: any): Observable<any>{
    return this.http.post(this.APIurl +"/Participation", data);
  }
}
