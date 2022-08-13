import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ParticipationService } from '../participation.service';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.css']
})
export class UpdateStatusComponent implements OnInit {

  stats={
    status:""
  }
 

  constructor(private service:ParticipationService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  updateStatus(id:any,status:any){
    this.stats.status=status;
    this.service.updateStatus(id,this.stats).subscribe(
      res=>{
        console.log(res);
        this.toastr.success(res.message);
        this.router.navigateByUrl('/home/get-participants')
      },
      err=>{
        console.log(err);
        this.toastr.error(err.error);
        this.router.navigateByUrl('/home/update-status')
      }
    )
  }

}
