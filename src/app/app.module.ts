import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DatepickerHeaderComponent } from './datepicker/datepicker-header/datepicker-header.component';
import { DatepickerBodyComponent } from './datepicker/datepicker-body/datepicker-body.component';
import { DatepickerService } from './datepicker/datepicker.service';
import { DateTableComponent } from './datepicker/datepicker-body/date-table/date-table.component';
import { MonthListComponent } from './datepicker/datepicker-body/month-list/month-list.component';
import { YearListComponent } from './datepicker/datepicker-body/year-list/year-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DatepickerComponent,
    DatepickerHeaderComponent,
    DatepickerBodyComponent,
    DateTableComponent,
    MonthListComponent,
    YearListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DatepickerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
