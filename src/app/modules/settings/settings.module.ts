import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbNavModule, NgbDropdownModule, NgbModalModule, NgbTooltipModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { LightboxModule } from 'ngx-lightbox';

import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { UserModule } from './user/user.module';
import { PermissionComponent } from './permission/permission.component';
import { PermissionService } from 'src/app/core/services/settings/permission.service';
import { AgGridModule } from 'ag-grid-angular';
import { UserRoleComponent } from './user-role/user-role.component';
import { GlobalSettingComponent } from './global-setting/global-setting.component';
import { GlobalSettingService } from 'src/app/core/services/settings/global-setting.service';
import { NotificationAreaComponent } from './notification-area/notification-area.component';
import { NotificationAreaService } from 'src/app/core/services/settings/notification-area.service';
import { UserRoleService } from 'src/app/core/services/settings/user-role.service';
import { OrganizationModule } from './organization/organization.module';
import { PermissionRoleMapComponent } from './permission-role-map/permission-role-map.component';
import { DistrictService } from 'src/app/core/services/settings/district.service';
import { DivisionService } from 'src/app/core/services/settings/division.service';
import { OrganizationAdministrativeUnitMapService } from 'src/app/core/services/settings/organization-administrative-unit-map.service';
import { UpazilaCityCorporationService } from 'src/app/core/services/settings/upazila-city-corporation.service';
import { ThanaService } from 'src/app/core/services/settings/thana.service';
import { UnionWardService } from 'src/app/core/services/settings/union-ward.service';
import { VillageAreaService } from 'src/app/core/services/settings/village-area.service';
import { CountryComponent } from './administrative-unit/country/country.component';
import { CountryService } from 'src/app/core/services/settings/country.service';
import { ParaService } from 'src/app/core/services/settings/para.service';
import { DistrictComponent } from './administrative-unit/district/district.component';
import { DivisionComponent } from './administrative-unit/division/division.component';
import { ParaComponent } from './administrative-unit/para/para.component';
import { ThanaComponent } from './administrative-unit/thana/thana.component';
import { UnionWardComponent } from './administrative-unit/union-ward/union-ward.component';
import { UpazilaCityCorporationComponent } from './administrative-unit/upazila-city-corporation/upazila-city-corporation.component';
import { VillageAreaComponent } from './administrative-unit/village-area/village-area.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DesignationsComponent } from './designations/designations.component';
import { MouzaComponent } from './administrative-unit/mouza/mouza.component';
import { DpzComponent } from './administrative-unit/dpz/dpz.component';
import { DepartmentDesignationMapComponent } from './department-designation-map/department-designation-map.component';
import { DepartmentDesignationMapService } from 'src/app/core/services/settings/departmentDesignationMap.service';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);

@NgModule({
  declarations: [
    PermissionComponent,
    GlobalSettingComponent,
    NotificationAreaComponent,
    UserRoleComponent,
    PermissionRoleMapComponent,
    CountryComponent,
    DivisionComponent,
    DistrictComponent,
    ThanaComponent,
    UpazilaCityCorporationComponent,
    UnionWardComponent,
    ParaComponent,
    VillageAreaComponent,
    DepartmentsComponent,
    DesignationsComponent,
    MouzaComponent,
    DpzComponent,
    DepartmentDesignationMapComponent,
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
    SettingsRoutingModule,
    UIModule,
    Ng2SmartTableModule,
    UserModule,
    OrganizationModule,
    AgGridModule,
    
  ],
  providers: [
    PermissionService,
    GlobalSettingService,
    NotificationAreaService,
    UserRoleService,
    CountryService,
    DivisionService,
    DistrictService,
    UpazilaCityCorporationService,
    ThanaService,
    UnionWardService,
    VillageAreaService,
    ParaService,
    OrganizationAdministrativeUnitMapService, 
    DepartmentDesignationMapService
  ]
})
export class SettingsModule { }
