import { Component, OnInit, Input, Output } from "@angular/core";
import { DatepickerService } from "../datepicker.service";

@Component({
  selector: "datepicker-header",
  templateUrl: "./datepicker-header.component.html",
  styleUrls: ["./datepicker-header.component.scss"]
})
export class DatepickerHeaderComponent implements OnInit {

  public month: string;
  public year: number;
  public action: string;

  private date: Date;
  private months: string[];

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
      this.month = this.months[date.getMonth()];
      this.year = date.getFullYear();
    });

    this.datepickerService.headerAction.subscribe(action => this.action = action);
  }

  /**
   * Sélectionne une action du header
   * @param {string} action
   */
  selectAction(action: string): void {
    this.datepickerService.headerAction.next(action);
  }

  /**
   * Change le mois
   * @param {number} number
   */
  changeMonth(number: number): void {
    const newMonth = this.date.getMonth() + number;
    this.date.setMonth(newMonth);
    this.datepickerService.date.next(this.date);
  }

  /**
   * Change l'année
   * @param {number} number
   */
  changeYear(number: number): void {
    const newYear = this.date.getFullYear() + number;
    this.date.setFullYear(newYear);
    this.datepickerService.date.next(this.date);
  }

}
