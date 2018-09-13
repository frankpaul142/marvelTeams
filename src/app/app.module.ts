import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GroupsService } from './service/groups.service';
import { MarvelService } from './service/marvel.service';
import { Constants } from './providers/constants';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule, HttpClientModule,
    CommonModule,
    BrowserModule,
    FormsModule 
  ],
  providers: [GroupsService,MarvelService,Constants],
  bootstrap: [AppComponent]
})
export class AppModule { }
