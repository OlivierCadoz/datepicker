import { Component, OnInit, EventEmitter } from '@angular/core';
import { DatepickerService } from "../../datepicker.service";

@Component({
  selector: 'month-list',
  templateUrl: './month-list.component.html',
  styleUrls: ['./month-list.component.scss']
})
export class MonthListComponent implements OnInit {

  public months: string[];
  public monthActive: string;

  private date: Date;

  constructor(
    private readonly datepickerService: DatepickerService
  ) {
    this.months = [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet",
      "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ]
  }

  ngOnInit() {
    this.datepickerService.date.subscribe(date => {
      this.date = date;
      this.monthActive = this.months[date.getMonth()];
    });
  }

  /**
   * Sélectionne le mois:
   * @param {number} index
   */
  selectMonth(index: number): void {
    this.datepickerService.selectMonth(this.date, index);
  }

}
