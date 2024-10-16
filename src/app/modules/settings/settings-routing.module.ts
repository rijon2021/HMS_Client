import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryComponent } from './administrative-unit/country/country.component';
import { DistrictComponent } from './administrative-unit/district/district.component';
import { DivisionComponent } from './administrative-unit/division/division.component';
import { ParaComponent } from './administrative-unit/para/para.component';
import { ThanaComponent } from './administrative-unit/thana/thana.component';
import { UnionWardComponent } from './administrative-unit/union-ward/union-ward.component';
import { UpazilaCityCorporationComponent } from './administrative-unit/upazila-city-corporation/upazila-city-corporation.component';
import { VillageAreaComponent } from './administrative-unit/village-area/village-area.component';
import { GlobalSettingComponent } from './global-setting/global-setting.component';
import { NotificationAreaComponent } from './notification-area/notification-area.component';
import { PermissionRoleMapComponent } from './permission-role-map/permission-role-map.component';
import { PermissionComponent } from './permission/permission.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DesignationsComponent } from './designations/designations.component';
import { MouzaComponent } from './administrative-unit/mouza/mouza.component';
import { DpzComponent } from './administrative-unit/dpz/dpz.component';
import { DepartmentDesignationMapComponent } from './department-designation-map/department-designation-map.component';

const routes: Routes = [
  // { path: '', redirectTo: 'settings' },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'organization', loadChildren: () => import('./organization/organization.module').then(m => m.OrganizationModule) },
  { path: 'permission', component: PermissionComponent },
  { path: 'user-role', component: UserRoleComponent },
  { path: 'global-setting', component: GlobalSettingComponent },
  { path: 'notification-area', component: NotificationAreaComponent },
  { path: 'permission-role-map', component: PermissionRoleMapComponent },
  { path: 'country', component: CountryComponent },
  { path: 'division', component: DivisionComponent },
  { path: 'district', component: DistrictComponent },
  { path: 'thana', component: ThanaComponent },
  { path: 'mouzas', component: MouzaComponent },
  { path: 'upazila-city-corporation', component: UpazilaCityCorporationComponent },
  { path: 'union-ward', component: UnionWardComponent },
  { path: 'dpzs', component: DpzComponent },    
  { path: 'village-area', component: VillageAreaComponent },
  { path: 'paras', component: ParaComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'designations', component: DesignationsComponent },
  { path: 'department-designation-map', component: DepartmentDesignationMapComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
