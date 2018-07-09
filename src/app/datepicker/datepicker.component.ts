import { Component, OnInit, Input, Output } from '@angular/core';
import { DatepickerService } from "./datepicker.service";

@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  @Input() public dateString: string;

  public date: Date;

  private today: Date = new Date();

  constructor(
    private readonly datepickerService: DatepickerService
  ) {}

  ngOnInit() {
    this.datepickerService.date.next(this.today);

    this.datepickerService.date.subscribe(date => {
      this.date = date;
      console.log("Date:", date);
    });
  }

}
