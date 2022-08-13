import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetParticipantsComponent } from './get-participants.component';

describe('GetParticipantsComponent', () => {
  let component: GetParticipantsComponent;
  let fixture: ComponentFixture<GetParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetParticipantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
