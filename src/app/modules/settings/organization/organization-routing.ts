import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationAdministrativeUnitMapComponent } from './organization-administrative-unit-map/organization-administrative-unit-map.component';
import { OrganizationCreateComponent } from './organization-create/organization-create.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';

const routes: Routes = [
    { path: 'organization-list', component: OrganizationListComponent },
    { path: 'organization-create/:organizationID', component: OrganizationCreateComponent },
    { path: 'organization-administrative-map', component: OrganizationAdministrativeUnitMapComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrganizationRoutingModule { }
