import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TabComponent } from './tab/tab.component';
import { TabsComponent } from './tabs/tabs.component';
import { ClothingFormComponent } from './clothing-form/clothing-form.component';
import { ClothingCardComponent } from './clothing-card/clothing-card.component';
import { MyClothesComponent } from './my-clothes/my-clothes.component';
import { ClothingPopupComponent } from './clothing-popup/clothing-popup.component';
import { OutfitComponent } from './outfit/outfit.component';
import { OutfitsComponent } from './outfits/outfits.component';

@NgModule({
  declarations: [
    AppComponent,
    TabComponent,
    TabsComponent,
    ClothingFormComponent,
    ClothingCardComponent,
    MyClothesComponent,
    ClothingPopupComponent,
    OutfitComponent,
    OutfitsComponent
  ],
  imports: [
    BrowserModule,
	ReactiveFormsModule,
	HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
