import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbNavModule, NgbDropdownModule, NgbModalModule, NgbTooltipModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { LightboxModule } from 'ngx-lightbox';

import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { AgGridModule } from 'ag-grid-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MealManagementRoutingModule } from './meal-management-routing.module';
import { FoodCategoryComponent } from './food-category/food-category.component';
import { FoodItemComponent } from './food-item/food-item.component';
import { FoodCategoryService } from 'src/app/core/services/hms/meal-management/food-category.service';
import { FoodItemService } from 'src/app/core/services/hms/meal-management/food-item.service';


// register FullCalendar plugins
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);

@NgModule({
  declarations: [
    FoodCategoryComponent,
    FoodItemComponent
    // HostelsComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbModalModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbCollapseModule,
    SimplebarAngularModule,
    LightboxModule,
    MealManagementRoutingModule,
    UIModule,
    Ng2SmartTableModule,
    AgGridModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyBiols4lFvOc7_rGeOZVI6l-YE617w7xR0',
      apiKey: environment.MAP_API_KEY,
      libraries: ['places', 'drawing', 'geometry']
    }),
  ],
  providers: [
    FoodCategoryService,
    FoodItemService
  ]
})
export class MealManagementModule { }
