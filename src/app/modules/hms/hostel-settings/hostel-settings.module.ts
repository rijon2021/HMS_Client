import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import { BranchComponent } from './branch/branch.component';
import { RoomComponent } from './room/room.component';
import { BedComponent } from './bed/bed.component';
import { BranchService } from 'src/app/core/services/hms/hostel-settings/branch.service';
import { RoomService } from 'src/app/core/services/hms/hostel-settings/room.service';
import { BedService } from 'src/app/core/services/hms/hostel-settings/bed.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RoomCategoryComponent } from './room-category/room-category.component';
import { RoomCategoryService } from 'src/app/core/services/hms/hostel-settings/room-category.service';


// register FullCalendar plugins
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);

@NgModule({
  declarations: [
    HostelsComponent,
    BranchComponent,
    RoomCategoryComponent,
    RoomComponent,
    BedComponent,
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
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyBiols4lFvOc7_rGeOZVI6l-YE617w7xR0',
      apiKey: environment.MAP_API_KEY,
      libraries: ['places', 'drawing', 'geometry']
    }),
  ],
  providers: [
    HostelsService,
    BranchService,
    RoomCategoryService,
    RoomService,
    BedService,
    DatePipe
  ]
})
export class HostelSettingsModule { }
