import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesComponent } from './routes.component';

xdescribe('RoutesComponent', () => {
  let component: RoutesComponent;
  let fixture: ComponentFixture<RoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutesComponent],
<<<<<<< HEAD
    })
      .compileComponents();
=======
    }).compileComponents();
>>>>>>> 696896e (chore: run prettier)

    fixture = TestBed.createComponent(RoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
