import { Component, OnInit } from "@angular/core";
import { DatepickerService } from "../../datepicker.service";

@Component({
  selector: "date-table",
  templateUrl: "./date-table.component.html",
  styleUrls: ["./date-table.component.scss"]
})
export class DateTableComponent implements OnInit {

  public daysName: string[];
  public days: {id: number, disabled: boolean}[];
  public dayActive: number;

  private date: Date;
  private lastDate = new Date();

  constructor(
    private readonly datepickerService: DatepickerService
  ) {
    this.daysName = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  }

  ngOnInit() {
    this.datepickerService.date.subscribe(date => {
      this.date = date;
      this.initDates();
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
   * Sélectionne une nouvelle DatepickerService
   * @param {number} day
   */
  selectDate(day) {
    const newDate = new Date(this.date.getFullYear(), this.date.getMonth(), day);
    this.datepickerService.date.next(newDate);
  }

}
