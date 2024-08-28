import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideCardFormComponent } from './ride-card-form.component';

describe('RideCardFormComponent', () => {
  let component: RideCardFormComponent;
  let fixture: ComponentFixture<RideCardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideCardFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
