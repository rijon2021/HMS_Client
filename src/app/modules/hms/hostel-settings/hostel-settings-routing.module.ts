import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HostelsComponent } from './hostels/hostels.component';


const routes: Routes = [
  { path: 'hostels', component: HostelsComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostelSettingsRoutingModule { }
