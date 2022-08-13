import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../User/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
    console.log(form.value);
    this.service.register(form.value).
    subscribe(
      res=>{
        this.toastr.success("User registered successfully");
        this.router.navigateByUrl('/login')
      },
      err=>{
        this.toastr.error(err.error);
        this.router.navigateByUrl('/SignUp')
      }
    );

  }

}
