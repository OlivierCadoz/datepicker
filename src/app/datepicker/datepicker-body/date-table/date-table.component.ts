import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { DatepickerService } from "../../datepicker.service";

@Component({
  selector: "date-table",
  templateUrl: "./date-table.component.html",
  styleUrls: ["./date-table.component.scss"]
})
export class DateTableComponent implements OnInit {

  public daysName: string[];
  public days: {id: number, disabled: boolean}[];
  public weeks: number[];
  public dayActive: number;

  private date: Date;
  private lastDate = new Date();
  private dayOne: number;

  constructor(
    private readonly datepickerService: DatepickerService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.daysName = ["lu", "ma", "me", "je", "ve", "sa", "di"];
  }

  ngOnInit() {
    this.datepickerService.date.subscribe(date => {
      this.date = date;
      this.initDates();
      this.initWeeks();
    });
  }

  /**
   * Initialise le tableau des dates
   */
  initDates(): void {
    this.days = [];
    this.dayActive = this.date.getDate();
    const month = this.date.getMonth();
    const prevMthYear = month === 0 ? this.date.getFullYear() - 1 : this.date.getFullYear();
    const nextMthYear = month === 11 ? this.date.getFullYear() + 1 : this.date.getFullYear();
    const prevMthDays = new Date(this.date.getFullYear(), month, 0).getDate();
    const mthDays = new Date(nextMthYear, month + 1, 0).getDate();
    let dayOne = new Date(this.date.getFullYear(), month, 1).getDay();
    this.dayOne = dayOne === 0 ? 6 : dayOne - 1;

    for (let i = this.dayOne; i > 0; i--) this.days.push({id: prevMthDays - i, disabled: true});
    for (let i = 1; i <= mthDays; i++) this.days.push({id: i, disabled: false});

    if (this.days.length % 7 !== 0) {
      for (let i = 1; this.days.length % 7 !== 0; i++) this.days.push({id: i, disabled: true});
    }
  }

  /**
   * Initialise les numéros des semaines
   */
  initWeeks(): void {
    this.weeks = this.datepickerService.initWeeks(this.date, this.dayActive, this.dayOne);
    this.cdr.markForCheck();
  }

  /**
   * Sélectionne une nouvelle date
   * @param {number} day
   */
  selectDate(day: number): void {
    this.datepickerService.selectDate(this.date, day);
  }
}
