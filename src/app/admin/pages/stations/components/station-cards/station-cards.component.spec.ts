import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationCardsComponent } from './station-cards.component';

describe('StationCardComponent', () => {
  let component: StationCardsComponent;
  let fixture: ComponentFixture<StationCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationCardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StationCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
