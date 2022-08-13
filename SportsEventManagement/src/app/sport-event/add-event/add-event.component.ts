import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, TitleStrategy } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { sport } from 'src/app/models/sport.model';
import { SporteventService } from '../sportevent.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  eventModel={
    eventName:"",
    noOfSlots:"",
    date:"",
    sport:{
      sportName:""
    }
  }

  constructor(private service: SporteventService, private router:Router,private toastr:ToastrService) {  }

  onSubmitEvent(eventData:NgForm){
    console.log(this.eventModel);
    this.service.addEvent(this.eventModel).subscribe(
      (res: any)  =>{
        this.toastr.success(res.message);
        this.router.navigateByUrl("/home/add-event")
      },
      err=>{
        this.toastr.error(err.error);
      }
      );
      eventData.reset();
  }

  ngOnInit(): void {
  }

}
