import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { SportEventComponent } from './sport-event/sport-event.component';
import { ParticipationComponent } from './participation/participation.component';
import { PendingComponent } from './participation/pending/pending.component';
import { DeclinedComponent } from './participation/declined/declined.component';
import { PlayersComponent } from './player/players/players.component';
import { AddPlayerComponent } from './player/add-player/add-player.component';
import { DeletePlayerComponent } from './player/delete-player/delete-player.component';
import { SportsComponent } from './sport-event/sports/sports.component';
import { GetSportByNameComponent } from './sport-event/get-sport-by-name/get-sport-by-name.component';
import { AddEventComponent } from './sport-event/add-event/add-event.component';
import { DeleteEventComponent } from './sport-event/delete-event/delete-event.component';
import { EventsComponent } from './sport-event/events/events.component';
import { GetEventByNameComponent } from './sport-event/get-event-by-name/get-event-by-name.component';
import { UpdateStatusComponent } from './participation/update-status/update-status.component';
import { GetParticipantsComponent } from './participation/get-participants/get-participants.component';
import { AddParticipationComponent } from './participation/add-participation/add-participation.component';
import { ErrorHandlingComponent } from './error-handling/error-handling.component';
import { ApprovedComponent } from './participation/approved/approved.component';
import { SharedService } from './shared.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './User/user.service';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './Auth/auth.interceptor';
import { SporteventService } from './sport-event/sportevent.service';
import { ParticipationService } from './participation/participation.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    SportEventComponent,
    ParticipationComponent,
    PendingComponent,
    DeclinedComponent,
    PlayersComponent,
    AddPlayerComponent,
    DeletePlayerComponent,
    SportsComponent,
    GetSportByNameComponent,
    AddEventComponent,
    DeleteEventComponent,
    EventsComponent,
    GetEventByNameComponent,
    UpdateStatusComponent,
    GetParticipantsComponent,
    AddParticipationComponent,
    ErrorHandlingComponent,
    ApprovedComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar:true
    })
  ],
  providers: [SharedService,SporteventService,UserService,{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  },ParticipationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
