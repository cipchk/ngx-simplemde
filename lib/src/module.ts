import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { SimplemdeComponent } from './component';
import { SimplemdeConfig } from './config';

@NgModule({
  imports: [CommonModule],
  declarations: [SimplemdeComponent],
  exports: [SimplemdeComponent],
})
export class SimplemdeModule {
  static forRoot(
    config?: SimplemdeConfig,
  ): ModuleWithProviders<SimplemdeModule> {
    return {
      ngModule: SimplemdeModule,
      providers: [{ provide: SimplemdeConfig, useValue: config }],
    };
  }
}
