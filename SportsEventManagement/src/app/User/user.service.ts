import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly BaseURL='https://localhost:44366/api/Login';
  constructor(private http:HttpClient) { }
  public status(){
    if(localStorage.getItem('token')!=null){
      return true;
    }
    else{
      return false;
    }
  }
  login(formData:any){
    return this.http.post(this.BaseURL+'/authenticate',formData);
  }

  register(formData:any){
    return this.http.post(this.BaseURL+'/register',formData);
  }
}
