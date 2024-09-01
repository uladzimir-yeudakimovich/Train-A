import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidesComponent } from './rides.component';

xdescribe('RidesComponent', () => {
  let component: RidesComponent;
  let fixture: ComponentFixture<RidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RidesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
