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
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { HostelsComponent } from './hostels/hostels.component';
import { AgGridModule } from 'ag-grid-angular';
import { HostelsService } from 'src/app/core/services/hms/hostel-settings/hostels.service';
import { HostelSettingsRoutingModule } from './hostel-settings-routing.module';


// register FullCalendar plugins
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);

@NgModule({
  declarations: [
    HostelsComponent,
  ],
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
    HostelSettingsRoutingModule,
    UIModule,
    Ng2SmartTableModule,
    AgGridModule,
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyBiols4lFvOc7_rGeOZVI6l-YE617w7xR0',
      apiKey: environment.MAP_API_KEY,
      libraries: ['places', 'drawing', 'geometry']
    }),
  ],
  providers: [
    HostelsService,
  ]
})
export class HostelSettingsModule { }