import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetEventByNameComponent } from './get-event-by-name.component';

describe('GetEventByNameComponent', () => {
  let component: GetEventByNameComponent;
  let fixture: ComponentFixture<GetEventByNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetEventByNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetEventByNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
