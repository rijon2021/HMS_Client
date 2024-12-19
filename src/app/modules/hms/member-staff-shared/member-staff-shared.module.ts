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
import { AgGridModule } from 'ag-grid-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BaseStatusDataService } from 'src/app/core/services/hms/hostel-settings/base-status';
import { MemberComponent } from './member/member.component';
import { MemberService } from 'src/app/core/services/hms/member-settings/member.service';
import { MemberStaffSharedRoutingModule } from './member-staff-shared-routing.module';
import { StaffComponent } from './staff/staff.component';
import { StaffPositionComponent } from './staff-position/staff-position.component';
import { StaffPositionService } from 'src/app/core/services/hms/member-settings/staff-position.service';


// register FullCalendar plugins
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);

@NgModule({
  declarations: [
    MemberComponent,
    StaffPositionComponent,
    StaffComponent,

 
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
    MemberStaffSharedRoutingModule,
    UIModule,
    Ng2SmartTableModule,
    AgGridModule,
    NgMultiSelectDropDownModule.forRoot(),
   
  ],
  providers: [
    MemberService,
    StaffPositionService,
    BaseStatusDataService,
    DatePipe
  ]
})
export class MemberStaffSharedModule{ }
