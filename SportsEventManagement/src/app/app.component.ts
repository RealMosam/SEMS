import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from './Auth/auth.guard';
import { UserService } from './User/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SportsEventManagement';
  users:any=[];
  constructor(private router:Router,public service:UserService,private auth:AuthGuard) { }
  ngOnInit(): void {
    
  }
  onLogout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
