import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { StartComponent } from './start/start.component';
import { RoutingModule } from './routing.module';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    StartComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
