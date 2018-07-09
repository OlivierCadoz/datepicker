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

  constructor(
    private readonly datepickerService: DatepickerService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.years = [];
  }

  ngOnInit() {
    this.datepickerService.date.subscribe(date => {
      this.date = date;
      this.yearActive = date.getFullYear();
      this.initYears(this.yearActive)
    });
  }

  initYears(yearActive) {
    for (let i = 7; yearActive - i <= yearActive + 8; i--) {
      this.years.push(yearActive - i);
    }
    this.cdr.markForCheck();
  }

  selectYear(newYear) {
    this.date.setFullYear(newYear);
    this.datepickerService.date.next(this.date);
    this.datepickerService.headerAction.next("month");
  }
}
