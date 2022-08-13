import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSportByNameComponent } from './get-sport-by-name.component';

describe('GetSportByNameComponent', () => {
  let component: GetSportByNameComponent;
  let fixture: ComponentFixture<GetSportByNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetSportByNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetSportByNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
