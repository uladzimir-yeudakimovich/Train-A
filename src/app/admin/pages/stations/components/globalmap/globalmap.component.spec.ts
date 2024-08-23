import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalmapComponent } from './globalmap.component';

describe('GlobalmapComponent', () => {
  let component: GlobalmapComponent;
  let fixture: ComponentFixture<GlobalmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalmapComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(GlobalmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
