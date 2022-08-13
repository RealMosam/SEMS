import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { sport } from '../../models/sport.model';
import { SporteventService } from '../sportevent.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {

  constructor(private service:SporteventService,private router:Router,private toastr:ToastrService) { }

  sports:any=[];

  ngOnInit(): void {
    this.getSports();
  }
  getSports(){
    this.service.sports().subscribe(
      (res:any)=>{
        this.sports=res;
    })
  }
  getSportByName(name:any){
    this.service.getSportByName(name).subscribe(
      res=>{
        console.log(res);
        this.service.sport=res;
        this.router.navigateByUrl("/home/get-sport-by-name");
      },
      err=>{
        this.toastr.error(err.error);
        this.router.navigateByUrl("/home/sports");
      }
    )
  }

}
