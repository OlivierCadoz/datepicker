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

  constructor(
    private readonly datepickerService: DatepickerService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.daysName = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  }

  ngOnInit() {
    console.log(this.lastDate.getDate());
    this.datepickerService.date.subscribe(date => {
      this.date = date;
      console.log(this.date.getDate());
      this.initDates();
      this.initWeeks();
    });
  }

  /**
   * Initialise le tableau des dates
   */
  initDates() {
    this.days = [];
    this.dayActive = this.date.getDate();
    const month = this.date.getMonth();
    const prevMthYear = month === 0 ? this.date.getFullYear() - 1 : this.date.getFullYear();
    const nextMthYear = month === 11 ? this.date.getFullYear() + 1 : this.date.getFullYear();
    const prevMthDays = new Date(prevMthYear, month, 0).getDate();
    const mthDays = new Date(nextMthYear, month + 1, 0).getDate();
    const dayOne = new Date(prevMthYear, month, 1).getDay();

    for (let i = dayOne; i >= 0; i--) this.days.push({id: prevMthDays - i, disabled: true});
    for (let i = 1; i <= mthDays; i++) this.days.push({id: i, disabled: false});

    if (this.days.length % 7 !== 0) {
      for (let i = 1; this.days.length % 7 !== 0; i++) this.days.push({id: i, disabled: true});
    }
  }

  /**
   * Initialise les numéros des semaines
   */
  initWeeks() {
    this.weeks = [];
     const actualWeek = this.date.getWeekNumber();
     let minus: number;
     if (this.days.length < 36) minus = Math.floor(this.dayActive % 5);
     else minus = Math.floor(this.dayActive % 6);
     for (let i = actualWeek - minus; i <= actualWeek + 2; i++) this.weeks.push(i);
     this.cdr.markForCheck();
     console.log(this.weeks);
  }

  /**
   * Sélectionne une nouvelle date
   * @param {number} day
   */
  selectDate(day) {
    const newDate = new Date(this.date.getFullYear(), this.date.getMonth(), day);
    this.datepickerService.setNewDate(newDate);
  }


}

declare global {
  interface Date {
    getWeekNumber(): number;
  }
}

Date.prototype.getWeekNumber = function () {
  var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - Number(onejan)) / 86400000) + onejan.getDay() + 1) / 7);
};
