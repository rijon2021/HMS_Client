import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HostelsComponent } from './hostels/hostels.component';
import { BranchComponent } from './branch/branch.component';
import { RoomComponent } from './room/room.component';
import { BedComponent } from './bed/bed.component';


const routes: Routes = [
  { path: 'hostels', component: HostelsComponent },
  { path: 'branch', component: BranchComponent },
  { path: 'room', component: RoomComponent },
  { path: 'bed', component: BedComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostelSettingsRoutingModule { }
