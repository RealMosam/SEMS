import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { player } from '../../models/player.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

 constructor(private router: Router, private service: SharedService,private toastr:ToastrService) { }

 playersList: any = [];

 ngOnInit(): void {
    this.refreshPlayers();
 }

 refreshPlayers() {
  this.service.players().subscribe(data => 
    { this.playersList = data; }
  )
 }

 onDelete(playerId: any) {
  this.service.deletePlayer(playerId)
  .subscribe(
    (res:any)=>{
      this.toastr.success(res.message);
      this.router.navigateByUrl('/home')
    },
    err=>{
      this.toastr.error(err.error);
      this.router.navigateByUrl('/home/players')
    }
  )
}
 

  // players: player[] = [
  //   new player(1, "Balaji", 22, 9276543345, "balaji@gmail.com", 1, "Cricket"),
  //   new player(2, "Sanket", 22, 9963224652, "sanket@gmail.com", 1, "Football"),
  //   new player(3, "Hema Sundar", 22, 8769857846, "hemasundar@gmail.com", 1, "Football"),
  //   new player(4, "Anitha", 22, 7128747345, "anitha@gmail.com", 2, "Cricket"),
  //   new player(5, "Yash", 22, 9564618345, "yash@gmail.com", 1, "Football")

  // ]

}
