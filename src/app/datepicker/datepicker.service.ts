import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class DatepickerService {

  public date: BehaviorSubject<Date> = new BehaviorSubject(undefined);
  public headerAction: BehaviorSubject<string> = new BehaviorSubject(undefined);
  public yearsRange: BehaviorSubject<number[]> = new BehaviorSubject(undefined);

  constructor() {}

  // Getters:

  getDate() {
    return this.date;
  }

  getHeaderAction(): BehaviorSubject<string> {
    return this.headerAction;
  }

  getYearsRange(): BehaviorSubject<number[]> {
    return this.yearsRange;
  }

  // Setters:

  setNewDate(param: Date): void {
    this.date.next(param);
  }

  setHeaderAction(param: string): void {
    this.headerAction.next(param);
  }

  setYearsRange(param: number[]): void {
    this.yearsRange.next(param);
  }

  // YearListComponent:

  /**
   * Initialise la liste des années en prenant l'année en paramètre comme point de départ:
   * @param {number} year
   */
  initYearsFromStart(year: number): void {
    const years = [];
    for (let i = 0; year + i < year + 16; i++) {
      years.push(year + i);
    }

    this.setYearsRange(years);
  }

  /**
   * Initialise la liste des années en prenant l'année en paramètre comme point de d'arrivée:
   * @param {number} year
   */
  initYearsFromEnd(year: number): void {
    const years = [];
    for (let i = 0; year - i > year - 16; i++) {
      years.unshift(year - i);
    }

    this.setYearsRange(years);
  }

  /**
   * Initialise la liste des années en prenant l'année en paramètre comme centre:
   * @param {number} year
   */
  firstInitYears(year: number): void {
    const years = [];
    for (let i = 7; year - i <= year + 8; i--) {
      years.push(year - i);
    }

    this.setYearsRange(years);
  }

  /**
   * Actualise la date après avoir sélectionné une année:
   * @param {Date} date
   * @param {number} newYear
   */
  selectYear(date: Date, newYear: number): void {
    date.setFullYear(newYear);
    this.setNewDate(date);
    this.setHeaderAction("month");
  }
}
