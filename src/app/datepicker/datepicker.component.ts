import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatepickerService } from "./datepicker.service";

@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  @Input() public dateString: string;

  @Output() public newDate = new EventEmitter();

  public date: Date;

  private today: Date = new Date();

  constructor(
    private readonly datepickerService: DatepickerService
  ) {}

  ngOnInit() {
    this.setInitialDate();

    this.datepickerService.date.subscribe(date => {
      this.date = date;
      if (this.datepickerService.getHeaderActionValue() === "date") this.newDate.emit(date);
    });
  }

  /**
   * Initialise la première date:
   */
  setInitialDate(): void {
    this.datepickerService.setInitialDate(this.dateString, this.today);
  }

}
