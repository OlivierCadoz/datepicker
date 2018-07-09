import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerBodyComponent } from './datepicker-body.component';

describe('DatepickerBodyComponent', () => {
  let component: DatepickerBodyComponent;
  let fixture: ComponentFixture<DatepickerBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
