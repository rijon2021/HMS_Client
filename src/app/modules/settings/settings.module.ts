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
import { OrganizationAdministrativeUnitMapService } from 'src/app/core/services/settings/organization-administrative-unit-map.service';


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
    // OrganizationModule,
    AgGridModule,
    
  ],
  providers: [
    PermissionService,
    GlobalSettingService,
    NotificationAreaService,
    UserRoleService,
    OrganizationAdministrativeUnitMapService, 
  ]
})
export class SettingsModule { }
