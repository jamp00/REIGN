import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { materialModule } from './material.module';
import { ArticulosComponent } from './components/articulos/articulos.component';

import { niceDateFormatPipe } from './services/format-date.service';


@NgModule({
  declarations: [
    AppComponent,
    ArticulosComponent,
    niceDateFormatPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    materialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
