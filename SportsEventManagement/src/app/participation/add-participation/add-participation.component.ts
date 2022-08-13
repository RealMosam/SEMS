import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ParticipationService } from '../participation.service';

@Component({
  selector: 'app-add-participation',
  templateUrl: './add-participation.component.html',
  styleUrls: ['./add-participation.component.css']
})
export class AddParticipationComponent implements OnInit {

  participantModel={
    events:{
      eventName:"",
      sports:{
        sportName:""
      }
    },
    player:[{
      playerName:"",
      age:"",
      contactNumber:"",
      email:"",
      gender:0
    }],
    status:0
  }

  constructor(private service: ParticipationService, private router:Router, private toastr:ToastrService) { }

  onSubmitParticipant(participantData: NgForm){
    //console.warn(participantData);
    this.participantModel.player[0].contactNumber=String(participantData.value.contactNumber);
    this.participantModel.player[0].gender=Number(participantData.value.gender);
    this.participantModel.status=Number(participantData.value.status);
    console.log(this.participantModel);
    this.service.addParticipant(this.participantModel).subscribe(
      (res: any)  => {
      this.toastr.success(res.message);
      this.router.navigateByUrl("/home/add-participation")
    },
    err=>{
      this.toastr.error(err.error);
      this.router.navigateByUrl("/home/add-participation");
    }
    )
    participantData.reset();
  }

  ngOnInit(): void {
  }

}
