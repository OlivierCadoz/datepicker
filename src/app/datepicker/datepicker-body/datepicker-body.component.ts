import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatepickerService } from "../datepicker.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'datepicker-body',
  templateUrl: './datepicker-body.component.html',
  styleUrls: ['./datepicker-body.component.scss']
})
export class DatepickerBodyComponent implements OnInit {

  public element: string;

  private actionSub: Subscription;

  constructor(
    private readonly datepickerService: DatepickerService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.datepickerService.headerAction.subscribe(action => this.actionHandling(action));
    this.element = "date";
    this.cdr.markForCheck();
  }

  /**
   * Change la vue du body entre les vues 'date', 'month', 'year':
   * @param {string} action
   */
  actionHandling(action: string): void {
    this.element = action;
  }
}
