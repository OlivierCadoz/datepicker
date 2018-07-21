import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class DatepickerService {

  public date: BehaviorSubject<Date> = new BehaviorSubject(undefined);
  public headerAction: BehaviorSubject<string> = new BehaviorSubject("date");
  public yearsRange: BehaviorSubject<number[]> = new BehaviorSubject(undefined);

  constructor() {}

  // Getters:

  getHeaderActionValue() {
    return this.headerAction.getValue();
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

  // DatepickerComponent:

  /**
   * Initialise la première date:
   * @param {string} dateString
   * @param {Date} today
   */
  setInitialDate(dateString, today): void {
    let dateStr: string[];
    if (dateString) dateStr = dateString.split("-");
    const initialDate = dateStr ? new Date(+dateStr[0], +dateStr[1], +dateStr[3]) : today;
    this.setNewDate(initialDate);
  }

  // DatepickerHeaderComponent:

  /**
   * Change le mois:
   * @param {Date} date
   * @param {number} number
   */
  changeMonth(date: Date, number: number): void {
    const newMonth = date.getMonth() + number;
    date.setMonth(newMonth);
    this.setNewDate(date);
  }

  /**
   * Change la liste des années:
   * @param {number[]} years
   * @param {boolean} bool
   */
  changeYear(years: number[], bool: boolean): void {
    if (!bool) this.initYearsFromEnd(years[0] - 1);
    else this.initYearsFromStart(years[years.length - 1] + 1);
  }

  // DateTableComponent:

  /**
   * Initialise les numéros des semaines:
   * @param {Date} date
   * @param {number} dayActive
   * @param {number} dayOne
   */
  initWeeks(date: Date, dayActive: number, dayOne: number): number[] {
    const weeks = [];
    const actualWeek = date.getWeekNumber();
    const minus = Math.ceil((((dayActive + dayOne)/ 7)) - 1);
    for (let i = actualWeek - minus; i <= actualWeek + (5 - minus); i++) weeks.push(i);
    return weeks;
  }

  /**
   * Sélectionne une nouvelle date:
   * @param {Date} date
   * @param {number} day
   */
  selectDate(date: Date, day: number): void {
    const newDate = new Date(date.getFullYear(), date.getMonth(), day);
    this.setNewDate(newDate);
  }

  // MonthListComponent:

  /**
   * Sélectionne le mois:
   * @param {Date} date
   * @param {number} index
   */
  selectMonth(date: Date, index: number): void {
    date.setMonth(index);
    this.setNewDate(date);
    this.setHeaderAction("date");
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

/**
 * Déclaration globale d'extension:
 * getWeekNumber(): number
 */
declare global {
  interface Date {
    getWeekNumber(): number;
  }
}

/**
 * Extension pour récupérer le nombre de la semaine dont la date actuelle fait partie:
 */
Date.prototype.getWeekNumber = function (): number {
  var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((+d - +yearStart) / 86400000) + 1)/7);
};
