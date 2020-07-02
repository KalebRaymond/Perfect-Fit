import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyClothesComponent } from './my-clothes.component';

describe('MyClothesComponent', () => {
  let component: MyClothesComponent;
  let fixture: ComponentFixture<MyClothesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyClothesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyClothesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
