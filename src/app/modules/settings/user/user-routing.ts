import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDpzMapComponent } from './user-dpz-map/user-dpz-map.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
    { path: 'user-create/:userID', component: UserCreateComponent },
    { path: 'user-list', component: UserListComponent },
    { path: 'user-dpz-map', component: UserDpzMapComponent },
    { path: 'change-password', component: ChangePasswordComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
