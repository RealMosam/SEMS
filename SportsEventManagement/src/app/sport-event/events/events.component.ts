import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared.service';
import { event } from '../../models/event.model';
import { SporteventService } from '../sportevent.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {


  constructor(private service: SporteventService,private toastr:ToastrService,private router:Router) { }

 eventsList: any = [];

 ngOnInit(): void {
    this.getEvents();
 }

 getEvents() {
  this.service.Events().subscribe(
    data=>{
      this.eventsList=data;
    }
  )
 }
 getEventByName(name:any){
  this.service.getEventByName(name).subscribe(
    res=>{
      this.service.event=res;
      this.router.navigateByUrl("/home/get-event-by-name");
    },
    err=>{
      this.toastr.error(err.error);
      this.router.navigateByUrl("/home/events");
    }
  )
}
onDelete(eventId: any) {
  this.service.deleteEvent(eventId)
  .subscribe(
    (res:any)=>{
      this.toastr.success(res.message);
      this.router.navigateByUrl('/home');
    },
    err=>{
      this.toastr.error(err.error);
      this.router.navigateByUrl('/home/events');
    }
  )
}


  // events: event[] = [
  //   new event(1001, new Date('2022-07-18'), "IPL", 100, "Cricket"),
  //   new event(1002, new Date('2022-07-18'), "FIFA", 100, "Football"),
  //   new event(1003, new Date('2022-07-18'), "Worldcup", 100, "Cricket")
  // ]

}
