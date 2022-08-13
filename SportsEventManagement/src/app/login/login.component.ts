import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { UserService } from '../User/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  formModel={
    Username:'',
    Password:''
  }
  constructor(public service:UserService,private router:Router,private toastr:ToastrService) { }
  
  
  ngOnInit(): void {
    if(localStorage.getItem('token')!=null){
      this.router.navigateByUrl('/home');
    }
  }

  onSubmit(form:NgForm){
    this.service.login(form.value).
    subscribe(
    (res:any)=>{
        localStorage.setItem('token',res.token);
        this.router.navigateByUrl('/home')
    },
      err=>{
        if(err.status == 401){
          this.toastr.error('Incorrect Username or Password','Authentication failed');
        }  
      }
    );

  }
}
