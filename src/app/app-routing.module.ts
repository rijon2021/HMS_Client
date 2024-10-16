import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout.component';


const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./account/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    redirectTo: 'feature/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'feature',
    component: LayoutComponent,
    loadChildren: () => import('./modules/feature/feature.module').then(m => m.FeatureModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: LayoutComponent,
    loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule),
    canActivate: [AuthGuard]
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
