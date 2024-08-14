import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideManagementPageComponent } from './ride-management-page.component';

describe('RideManagementPageComponent', () => {
  let component: RideManagementPageComponent;
  let fixture: ComponentFixture<RideManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideManagementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
