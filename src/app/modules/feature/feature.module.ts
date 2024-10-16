import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbNavModule, NgbDropdownModule, NgbModalModule, NgbTooltipModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { LightboxModule } from 'ngx-lightbox';

import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { FeatureRoutingModule } from './feature-routing.module';
import { WidgetModule } from "../../shared/widget/widget.module";
import { AgmCoreModule } from '@agm/core';
import { GoogleComponent } from './google/google.component';
import { environment } from 'src/environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';


// register FullCalendar plugins
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);

@NgModule({
  declarations: [DashboardComponent, GoogleComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbModalModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbCollapseModule,
    SimplebarAngularModule,
    LightboxModule,
    FeatureRoutingModule,
    UIModule,
    Ng2SmartTableModule,
    WidgetModule,
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyBiols4lFvOc7_rGeOZVI6l-YE617w7xR0',
      apiKey: environment.MAP_API_KEY,
      libraries: ['places', 'drawing', 'geometry']
    }),
  ],
})
export class FeatureModule { }
