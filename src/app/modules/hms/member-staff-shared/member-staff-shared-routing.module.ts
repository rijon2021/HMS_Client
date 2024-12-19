import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { StaffComponent } from './staff/staff.component';
import { StaffPositionComponent } from './staff-position/staff-position.component';


const routes: Routes = [
  { path: 'members', component: MemberComponent },
  { path: 'staff-position', component: StaffPositionComponent },
  { path: 'staff', component: StaffComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberStaffSharedRoutingModule { }
