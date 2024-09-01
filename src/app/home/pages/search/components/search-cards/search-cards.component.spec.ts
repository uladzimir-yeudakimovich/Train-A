import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCardsComponent } from './search-cards.component';

xdescribe('SearchCardsComponent', () => {
  let component: SearchCardsComponent;
  let fixture: ComponentFixture<SearchCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
