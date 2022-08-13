import { Component, OnInit } from '@angular/core';
import { SporteventService } from '../sportevent.service';

@Component({
  selector: 'app-get-sport-by-name',
  templateUrl: './get-sport-by-name.component.html',
  styleUrls: ['./get-sport-by-name.component.css']
})
export class GetSportByNameComponent implements OnInit {

  constructor(public service:SporteventService) { }

  ngOnInit(): void {
  }

}
