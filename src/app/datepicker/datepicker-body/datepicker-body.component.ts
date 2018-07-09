import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatepickerService } from "../datepicker.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'datepicker-body',
  templateUrl: './datepicker-body.component.html',
  styleUrls: ['./datepicker-body.component.scss']
})
export class DatepickerBodyComponent implements OnInit, OnDestroy {

  public element = "date";

  private actionSub: Subscription;

  constructor(
    private readonly datepickerService: DatepickerService
  ) { }

  ngOnInit() {
    this.actionSub = this.datepickerService.headerAction.subscribe(action => this.actionHandling(action));
  }

  ngOnDestroy() {
    this.actionSub.unsubscribe();
  }

  actionHandling(action: string ): void {
    this.element = action;
  }
}
