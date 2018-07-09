import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DatepickerService } from "../../datepicker.service";

@Component({
  selector: 'month-list',
  templateUrl: './month-list.component.html',
  styleUrls: ['./month-list.component.scss']
})
export class MonthListComponent implements OnInit {

  @Output() public monthSelected = new EventEmitter();

  public months: string[];

  private date: Date;

  constructor(
    private readonly datepickerService: DatepickerService
  ) {
    this.months = [
      "janvier", "février", "Mars", "Avril", "Mai", "Juin", "Juillet",
      "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ]
  }

  ngOnInit() {
    this.datepickerService.date.subscribe(date => this.date = date);
  }

  selectMonth(index) {
    this.date.setMonth(index);
    this.monthSelected.emit(this.date);
  }

}
