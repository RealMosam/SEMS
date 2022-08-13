import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { participation } from '../../models/participation.model';
import { ParticipationService } from '../participation.service';

@Component({
  selector: 'app-get-participants',
  templateUrl: './get-participants.component.html',
  styleUrls: ['./get-participants.component.css']
})
export class GetParticipantsComponent implements OnInit {

  participations: any=[];
  constructor(private service:ParticipationService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getParticipations();
  }
  getParticipations(){
    this.service.getParticipations().subscribe(
      res=>{
        this.participations=res;
      }
    )
  }

  getPendingParticipants(status:any){
    this.service.getPendingParticipants(status).subscribe(
      res=>{
        this.service.participations=res;
        this.router.navigateByUrl("/home/pending-participants");
      },
      err=>{
        this.toastr.error(err.error);
      }
    )
  }
  getApprovedParticipants(status:any){
    this.service.getApprovedParticipants(status).subscribe(
      res=>{
        this.service.participations=res;
        this.router.navigateByUrl("/home/approved-participants");
      },
      err=>{
        this.toastr.error(err.error);
      }
    )
  }
  getDeclinedParticipants(status:any){
    this.service.getDeclinedParticipants(status).subscribe(
      res=>{
        this.service.participations=res;
        this.router.navigateByUrl("/home/declined-participants");
      },
      err=>{
        this.toastr.error(err.error);
      }
    )
  }

}
