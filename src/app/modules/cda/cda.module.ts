import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CdaRoutingModule } from './cda-routing.module';
import { ApplicationMigrationComponent } from './application-migration/application-migration.component';
import { AgGridModule } from 'ag-grid-angular';
import { UIModule } from "../../shared/ui/ui.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbDropdownModule, NgbModalModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LightboxModule } from 'ngx-lightbox';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ApplicationMigrationService } from 'src/app/core/services/cda/application-migration.service';
import { ApplicationFileMasterComponent } from './application-file-master/application-file-master.component';
import { ApplicationFileMasterService } from 'src/app/core/services/cda/application-file-master.service';
import { ApplicationFileUserMapService } from 'src/app/core/services/cda/application-file-user-map.service';
import { InspectionMonitoringComponent } from './inspection-monitoring/inspection-monitoring.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { AdminDashboardService } from 'src/app/core/services/cda/admin-dashboard.service';
import { InspectionMonitoringService } from 'src/app/core/services/cda/inspection-monitoring.service';
import { AttachmentsService } from 'src/app/core/services/cda/attachments.service';
import { ApplicationFileMasterSearchComponent } from './common/application-file-master-search/application-file-master-search.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RptBcCaseInspectionComponent } from './report/rpt-bc-case-inspection/rpt-bc-case-inspection.component';
import { RptSPCaseComponent } from './report/rpt-sp-case/rpt-sp-case.component';
import { RptBcCaseInspectionPrintComponent } from './report/rpt-bc-case-inspection-print/rpt-bc-case-inspection-print.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { InspectionDetailsBCSPCaseComponent } from './inspection-details-bcspcase/inspection-details-bcspcase.component';
import { UserService } from 'src/app/core/services/settings/user.service';
import { RptBcCaseTechnicalComponent } from './report/rpt-bc-case-technical/rpt-bc-case-technical.component';
import { RptBcCaseTechnicalPrintComponent } from './report/rpt-bc-case-technical-print/rpt-bc-case-technical-print.component';
import { InspectionDetailsBCspcaseService } from 'src/app/core/services/cda/inspection-details-bcspcase.service';
import { BcCaseInspectionListComponent } from './bc-case-inspection-list/bc-case-inspection-list.component';
import { LucListComponent } from './report/luc-list/luc-list.component';
import { LucAtpComponent } from './luc-atp/luc-atp.component';
import { LucDraftmanComponent } from './luc-draftman/luc-draftman.component';
import { LucGisComponent } from './luc-gis/luc-gis.component';
import { LucAtpPrintComponent } from './report/luc-atp-print/luc-atp-print.component';
import { LucDraftmanPrintComponent } from './report/luc-draftman-print/luc-draftman-print.component';
import { LucGisPrintComponent } from './report/luc-gis-print/luc-gis-print.component';
import { BcCaseTechnicalComponent } from './bc-case-technical/bc-case-technical.component';
import { DataPullComponent } from './data-pull/data-pull.component';


@NgModule({
  declarations: [
    ApplicationMigrationComponent,
    ApplicationFileMasterComponent,
    InspectionMonitoringComponent,
    ApplicationFileMasterSearchComponent,
    RptBcCaseTechnicalPrintComponent,
    RptBcCaseInspectionComponent,
    RptSPCaseComponent,
    RptBcCaseInspectionPrintComponent,
    InspectionDetailsBCSPCaseComponent,
    BcCaseInspectionListComponent,
    RptBcCaseTechnicalComponent,
    LucListComponent,
    LucAtpComponent,
    LucDraftmanComponent,
    LucGisComponent,
    LucAtpPrintComponent,
    LucDraftmanPrintComponent,
    LucGisPrintComponent,
    BcCaseTechnicalComponent,
    DataPullComponent
  ],
  imports: [
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CommonModule,
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
    UIModule,
    NgSelectModule,
    Ng2SmartTableModule,
    AgGridModule,
    CdaRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyBiols4lFvOc7_rGeOZVI6l-YE617w7xR0',
      apiKey: environment.MAP_API_KEY,
      libraries: ['places', 'drawing', 'geometry']
    }),
  ],
  providers: [
    ApplicationMigrationService,
    ApplicationFileMasterService,
    InspectionDetailsBCspcaseService,
    ApplicationFileUserMapService,
    AdminDashboardService,
    InspectionMonitoringService,
    AttachmentsService,
    DatePipe,
    UserService
  ]
})
export class CdaModule { }
