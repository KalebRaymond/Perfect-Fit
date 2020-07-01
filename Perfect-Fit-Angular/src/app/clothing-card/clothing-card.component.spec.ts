import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothingCardComponent } from './clothing-card.component';

describe('ClothingCardComponent', () => {
  let component: ClothingCardComponent;
  let fixture: ComponentFixture<ClothingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClothingCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
