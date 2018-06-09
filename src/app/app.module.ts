import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SimplemdeModule } from 'ngx-simplemde';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,

    SimplemdeModule.forRoot({}),
    NgZorroAntdModule.forRoot()
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
