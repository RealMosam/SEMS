import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SporteventService } from '../sportevent.service';
import { EventsComponent } from '../events/events.component';
import { event } from 'src/app/models/event.model';

@Component({
  selector: 'app-get-event-by-name',
  templateUrl: './get-event-by-name.component.html',
  styleUrls: ['./get-event-by-name.component.css']
})
export class GetEventByNameComponent implements OnInit {

  constructor(public service:SporteventService) { }
  ngOnInit(): void {
  }

  
    

}
