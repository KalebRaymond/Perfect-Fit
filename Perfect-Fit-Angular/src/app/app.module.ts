import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TabComponent } from './tab/tab.component';
import { TabsComponent } from './tabs/tabs.component';
import { ClothingFormComponent } from './clothing-form/clothing-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TabComponent,
    TabsComponent,
    ClothingFormComponent
  ],
  imports: [
    BrowserModule,
	ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
