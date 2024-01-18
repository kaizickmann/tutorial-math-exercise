import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { StartComponent } from './start/start.component';
import { RoutingModule } from './routing.module';
import { ResultComponent } from './result/result.component';
import {SaveChoiceService} from "./start/save-choice.service";
import {KeyButtonComponent} from "./task/key-button.component";

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    KeyButtonComponent,
    StartComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule
  ],
  providers: [SaveChoiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
