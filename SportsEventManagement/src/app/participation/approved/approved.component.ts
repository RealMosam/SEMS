import { Component, OnInit } from '@angular/core';
import { ParticipationService } from '../participation.service';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css']
})
export class ApprovedComponent implements OnInit {

  constructor(public service:ParticipationService) { }

  ngOnInit(): void {
  }

}
