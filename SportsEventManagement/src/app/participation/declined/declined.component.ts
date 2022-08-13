import { Component, OnInit } from '@angular/core';
import { ParticipationService } from '../participation.service';

@Component({
  selector: 'app-declined',
  templateUrl: './declined.component.html',
  styleUrls: ['./declined.component.css']
})
export class DeclinedComponent implements OnInit {

  constructor(public service:ParticipationService) { }

  ngOnInit(): void {
  }

}
