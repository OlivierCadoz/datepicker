import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatepickerService } from "../../datepicker.service";

@Component({
  selector: 'year-list',
  templateUrl: './year-list.component.html',
  styleUrls: ['./year-list.component.scss']
})
export class YearListComponent implements OnInit {

  public years: number[];
  public yearActive: number;

  private date: Date;
  private firstInit = true;
  private fromStart = false;
  private fromEnd = false;

  constructor(
    private readonly datepickerService: DatepickerService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.datepickerService.date.subscribe(date => {
      this.date = date;
      if (!this.firstInit) this.initFromBooleans(date);
      this.yearActive = date.getFullYear();
      if (this.firstInit) this.firstInitYears(this.yearActive);
      else if (this.fromStart && !this.years.includes(this.yearActive)) this.initYearsFromStart(this.yearActive);
      else if (this.fromEnd && !this.years.includes(this.yearActive)) this.initYearsFromEnd(this.yearActive);
    });
  }

  initYearsFromStart(year) {
    console.log("From start");
    this.years = [];
    for (let i = 0; year + i < year + 16; i++) {
      this.years.push(year + i);
    }
    this.cdr.markForCheck();
  }

  initYearsFromEnd(year) {
    console.log("From end");
    this.years = [];
    for (let i = 0; year - i > year - 16; i++) {
      this.years.unshift(year - i);
    }
    this.cdr.markForCheck();
  }

  firstInitYears(year) {
    console.log("First");
    this.years = [];
    for (let i = 7; year - i <= year + 8; i--) {
      this.years.push(year - i);
    }
    this.firstInit = false;
    this.cdr.markForCheck();
  }

  selectYear(newYear) {
    this.date.setFullYear(newYear);
    this.datepickerService.date.next(this.date);
    this.datepickerService.headerAction.next("month");
  }

  initFromBooleans(date) {
    const compareYear = date.getFullYear() > this.yearActive;
    if (!this.fromStart && compareYear) {
      this.fromStart = true;
      this.fromEnd = false;
    }
    else if (!this.fromEnd && !compareYear) {
      this.fromStart = false;
      this.fromEnd = true;
    }
  }
}
