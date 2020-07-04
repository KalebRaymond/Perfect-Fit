import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothingPopupComponent } from './clothing-popup.component';

describe('ClothingPopupComponent', () => {
  let component: ClothingPopupComponent;
  let fixture: ComponentFixture<ClothingPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClothingPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
