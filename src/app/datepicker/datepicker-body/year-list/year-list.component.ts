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
    });

    this.datepickerService.yearsRange.subscribe(years => {
      this.years = years;
      this.cdr.markForCheck();
    });
  }

  /**
   * Initialise la liste des années en prenant l'année en paramètre comme point de départ:
   * @param {number} year
   */
  initYearsFromStart(year: number): void {
    this.datepickerService.initYearsFromStart(year);
  }

  /**
   * Initialise la liste des années en prenant l'année en paramètre comme point d'arrivée:
   * @param {number} year
   */
  initYearsFromEnd(year: number): void {
    this.datepickerService.initYearsFromEnd(year);
  }

  /**
   * Actualise la date après avoir sélectionné une année:
   * @param {number} newYear
   */
  selectYear(newYear: number): void {
    this.datepickerService.selectYear(this.date, newYear);
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
