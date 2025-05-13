// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterLink, RouterOutlet } from '@angular/router';

import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    RouterLink,
    HttpClient
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
