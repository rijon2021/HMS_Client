import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalSettingComponent } from './global-setting/global-setting.component';
import { NotificationAreaComponent } from './notification-area/notification-area.component';
import { PermissionRoleMapComponent } from './permission-role-map/permission-role-map.component';
import { PermissionComponent } from './permission/permission.component';
import { UserRoleComponent } from './user-role/user-role.component';

const routes: Routes = [
  // { path: '', redirectTo: 'settings' },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'organization', loadChildren: () => import('./organization/organization.module').then(m => m.OrganizationModule) },
  { path: 'permission', component: PermissionComponent },
  { path: 'user-role', component: UserRoleComponent },
  { path: 'global-setting', component: GlobalSettingComponent },
  { path: 'notification-area', component: NotificationAreaComponent },
  { path: 'permission-role-map', component: PermissionRoleMapComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
