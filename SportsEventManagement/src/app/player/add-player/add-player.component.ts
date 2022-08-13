import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent {

  playerModel={
    playerName:"",
    age:"",
    contactNumber:"",
    email:"",
    gender:0,
    sports:{
      sportName:""
    }
  }

  constructor( private service: SharedService, private router:Router, private toastr:ToastrService) {

     }


  onSubmitPlayer(playerData: NgForm){
    //console.warn(playerData);
    this.playerModel.contactNumber=String(playerData.value.contactNumber);
    this.playerModel.gender=Number(playerData.value.gender)
    this.service.addPlayer(this.playerModel).subscribe(
      (res)  => {
      this.toastr.success(res.message);
      this.router.navigateByUrl("/home/add-player");
    },
    // err=>{
    //   this.toastr.error(err.error);
    // }
    )
    playerData.reset();
  }

}

