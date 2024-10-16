import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationMigrationComponent } from './application-migration/application-migration.component';
import { ApplicationFileMasterComponent } from './application-file-master/application-file-master.component';
import { InspectionMonitoringComponent } from './inspection-monitoring/inspection-monitoring.component';
import { RptBcCaseInspectionComponent } from './report/rpt-bc-case-inspection/rpt-bc-case-inspection.component';
import { RptSPCaseComponent } from './report/rpt-sp-case/rpt-sp-case.component';
import { RptBcCaseInspectionPrintComponent } from './report/rpt-bc-case-inspection-print/rpt-bc-case-inspection-print.component';
import { InspectionDetailsBCSPCaseComponent } from './inspection-details-bcspcase/inspection-details-bcspcase.component';
import { RptBcCaseTechnicalComponent } from './report/rpt-bc-case-technical/rpt-bc-case-technical.component';
import { BcCaseInspectionListComponent } from './bc-case-inspection-list/bc-case-inspection-list.component';
import { LucListComponent } from './report/luc-list/luc-list.component';
import { LucAtpComponent } from './luc-atp/luc-atp.component';
import { LucDraftmanComponent } from './luc-draftman/luc-draftman.component';
import { LucGisComponent } from './luc-gis/luc-gis.component';
import { BcCaseTechnicalComponent } from './bc-case-technical/bc-case-technical.component';
import { DataPullComponent } from './data-pull/data-pull.component';

const routes: Routes = [
  { path: 'application-migration', component: ApplicationMigrationComponent },
  { path: 'application-file-master', component: ApplicationFileMasterComponent },
  { path: 'bc-case-inspection-list', component: BcCaseInspectionListComponent },
  { path: 'bc-case-inspection', component: RptBcCaseInspectionComponent },
  { path: 'rpt-bc-case-inspection', component: RptBcCaseInspectionComponent },
  { path: 'bc-case-technical', component: RptBcCaseTechnicalComponent },
  { path: 'rpt-bc-case-technical', component: RptBcCaseTechnicalComponent },
  { path: 'bc-case-technical/:fileMasterID', component: BcCaseTechnicalComponent },
  { path: 'sp-case', component: RptSPCaseComponent },
  { path: 'rpt-sp-case', component: RptSPCaseComponent },
  { path: 'rpt-bc-case-inspection-print/:fileMasterID', component: RptBcCaseInspectionPrintComponent },
  { path: 'inspection-details-bcspcase/:applicationFileMasterID', component: InspectionDetailsBCSPCaseComponent },
  { path: 'inspection-monitoring', component: InspectionMonitoringComponent },
  //Luc Route =================
  { path: 'luc-atp-list', component: LucListComponent },
  { path: 'luc-dm-list', component: LucListComponent },
  { path: 'luc-gis-list', component: LucListComponent },
  { path: 'luc-atp/:applicationFileMasterID', component: LucAtpComponent },
  { path: 'luc-dm/:applicationFileMasterID', component: LucDraftmanComponent },
  { path: 'luc-gis/:applicationFileMasterID', component: LucGisComponent },

  //Luc Rpt Print Route =================
  { path: 'rpt-luc-atp', component: LucListComponent },
  { path: 'rpt-luc-dm', component: LucListComponent },
  { path: 'rpt-luc-gis', component: LucListComponent },

  { path: 'data-pulling', component: DataPullComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CdaRoutingModule { }
