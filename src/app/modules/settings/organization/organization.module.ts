import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { OrganizationRoutingModule } from './organization-routing';
import { OrganizationService } from 'src/app/core/services/settings/organization.service';
import { OrganizationCreateComponent } from './organization-create/organization-create.component';
import { OrganizationAdministrativeUnitMapComponent } from './organization-administrative-unit-map/organization-administrative-unit-map.component';



@NgModule({
  declarations: [
    OrganizationListComponent,
    OrganizationCreateComponent,
    OrganizationAdministrativeUnitMapComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbAlertModule,
    CarouselModule,
    UIModule,
    OrganizationRoutingModule,
    AgGridModule,
    NgbAccordionModule
  ],
  providers:[
    OrganizationService
  ]
})
export class OrganizationModule { }









// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
// import { CarouselModule } from 'ngx-owl-carousel-o';
// import { UserRoutingModule } from './user-routing';
// import { UIModule } from 'src/app/shared/ui/ui.module';
// import { AgGridModule } from 'ag-grid-angular';
// import { UserService } from 'src/app/core/services/settings/user.service';
// import { UserListComponent } from './user-list/user-list.component';
// import { UserCreateComponent } from './user-create/user-create.component';


// @NgModule({
//     declarations: [
//         UserCreateComponent, 
//         UserListComponent
//     ],
//     imports: [
//         CommonModule,
//         ReactiveFormsModule,
//         FormsModule,
//         NgbAlertModule,
//         CarouselModule,
//         UIModule,
//         UserRoutingModule,
//         AgGridModule
//     ],
//     providers:[UserService]
// })
// export class UserModule { }
