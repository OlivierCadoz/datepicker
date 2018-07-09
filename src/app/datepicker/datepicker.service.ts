import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class DatepickerService {

  public date: BehaviorSubject<Date> = new BehaviorSubject(undefined);
  public headerAction: BehaviorSubject<string> = new BehaviorSubject(undefined);

  constructor() {}
}
