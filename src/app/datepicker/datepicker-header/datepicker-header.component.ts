import { Component, OnInit, Input, Output } from '@angular/core';
import { DatepickerService } from "../datepicker.service";

@Component({
  selector: 'datepicker-header',
  templateUrl: './datepicker-header.component.html',
  styleUrls: ['./datepicker-header.component.scss']
})
export class DatepickerHeaderComponent implements OnInit {

  public month: string;
  public year: number;

  private months: string[];

  constructor(
    private readonly datepickerService: DatepickerService
  ) {
    this.months = [
      "janvier", "février", "Mars", "Avril", "Mai", "Juin", "Juillet",
      "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ]
  }

  ngOnInit() {
    this.datepickerService.date.subscribe(date => {
      this.month = this.months[date.getMonth()];
      this.year = date.getFullYear();
    });
  }

  selectAction(action: string): void {
    this.datepickerService.headerAction.next(action);
  }

}
