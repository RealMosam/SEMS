import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './Auth/auth.guard';
import { ErrorHandlingComponent } from './error-handling/error-handling.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AddParticipationComponent } from './participation/add-participation/add-participation.component';
import { ApprovedComponent } from './participation/approved/approved.component';
import { DeclinedComponent } from './participation/declined/declined.component';
import { GetParticipantsComponent } from './participation/get-participants/get-participants.component';
import { PendingComponent } from './participation/pending/pending.component';
import { UpdateStatusComponent } from './participation/update-status/update-status.component';
import { AddPlayerComponent } from './player/add-player/add-player.component';
import { DeletePlayerComponent } from './player/delete-player/delete-player.component';
import { PlayersComponent } from './player/players/players.component';
import { RegisterComponent } from './register/register.component';
import { AddEventComponent } from './sport-event/add-event/add-event.component';
import { EventsComponent } from './sport-event/events/events.component';
import { GetEventByNameComponent } from './sport-event/get-event-by-name/get-event-by-name.component';
import { GetSportByNameComponent } from './sport-event/get-sport-by-name/get-sport-by-name.component';
import { SportEventComponent } from './sport-event/sport-event.component';
import { SportsComponent } from './sport-event/sports/sports.component';

const appRoutes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'SignUp',component:RegisterComponent},
  {path:'home',component:HomeComponent,children:[
    { path: "players", component: PlayersComponent,canActivate:[AuthGuard]},
    { path: "sports", component: SportsComponent,canActivate:[AuthGuard] },
    { path: "events", component: EventsComponent,canActivate:[AuthGuard] },
    { path: "get-participants", component: GetParticipantsComponent,canActivate:[AuthGuard] },
    { path: "add-participation", component: AddParticipationComponent,canActivate:[AuthGuard] },
    { path: "add-player", component: AddPlayerComponent,canActivate:[AuthGuard] },
    { path: "add-event", component: AddEventComponent,canActivate:[AuthGuard] },
    { path: "update-status", component: UpdateStatusComponent,canActivate:[AuthGuard] },
    { path: "get-event-by-name", component: GetEventByNameComponent,canActivate:[AuthGuard] },
    { path: "get-sport-by-name", component: GetSportByNameComponent,canActivate:[AuthGuard] },
    { path: "delete-player", component: DeletePlayerComponent,canActivate:[AuthGuard] },
    { path: "not-found", component: ErrorHandlingComponent},
    {path:"pending-participants",component:PendingComponent,canActivate:[AuthGuard]},
    {path:"approved-participants",component:ApprovedComponent,canActivate:[AuthGuard]},
    {path:"declined-participants",component:DeclinedComponent,canActivate:[AuthGuard]}
  ],canActivate:[AuthGuard]}
  //{ path: "**", redirectTo: "/not-found" }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
