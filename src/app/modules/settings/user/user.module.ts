import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { UserRoutingModule } from './user-routing';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { AgGridModule } from 'ag-grid-angular';
import { UserService } from 'src/app/core/services/settings/user.service';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
    declarations: [
        UserCreateComponent,
        UserListComponent,
        ChangePasswordComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgbAlertModule,
        CarouselModule,
        UIModule,
        NgbDatepickerModule,
        UserRoutingModule,
        AgGridModule
    ],
    providers:[
        UserService,
    ]
})
export class UserModule { }