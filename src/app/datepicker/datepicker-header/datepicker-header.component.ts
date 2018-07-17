import { Component, OnInit, Input, Output, ChangeDetectorRef } from "@angular/core";
import { DatepickerService } from "../datepicker.service";

@Component({
  selector: "datepicker-header",
  templateUrl: "./datepicker-header.component.html",
  styleUrls: ["./datepicker-header.component.scss"]
})
export class DatepickerHeaderComponent implements OnInit {

  public month: string;
  public action: string;
  public yearRange: string;
  public year: number;

  private date: Date;
  private months: string[];
  private years: number[];

  constructor(
    private readonly datepickerService: DatepickerService,
    private readonly cdr: ChangeDetectorRef
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
      this.datepickerService.firstInitYears(this.year);
    });

    this.datepickerService.headerAction.subscribe(action => this.action = action);

    this.datepickerService.yearsRange.subscribe(years => { if (years) this.initYear(years); } );
  }

  /**
   * Sélectionne une action du header
   * @param {string} action
   */
  selectAction(action: string): void {
    this.datepickerService.setHeaderAction(action);
  }

  /**
   * Change le mois:
   * @param {number} number
   */
  changeMonth(number: number): void {
    const newMonth = this.date.getMonth() + number;
    this.date.setMonth(newMonth);
    this.datepickerService.setNewDate(this.date);
  }

  /**
   * Change la liste des années:
   * @param {boolean} bool
   */
  changeYear(bool: boolean): void {
    if (!bool) this.datepickerService.initYearsFromEnd(this.years[0] - 1);
    else this.datepickerService.initYearsFromStart(this.years[this.years.length - 1] + 1);
  }

  initYear(years: number[]): void {
    this.years = years;
    this.yearRange = `${years[0]} - ${years[years.length - 1]}`;
  }

}
