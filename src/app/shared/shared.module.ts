import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from './ui/ui.module';

import { WidgetModule } from './widget/widget.module';
import { HttpClientModule } from '@angular/common/http';
// import { HttpHelper } from '../core/helpers/httpHelper';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    UIModule,
    WidgetModule,
    HttpClientModule,
    
  ],
  exports: [
    HttpClientModule
  ]
})

export class SharedModule {
  // static forRoot(): ModuleWithProviders {
  //   return {
  //     ngModule: SharedModule,
  //     providers: [HttpHelper]
  //   };
  // }
}
