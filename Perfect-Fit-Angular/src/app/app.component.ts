import { Component } from '@angular/core';

import { TabsComponent } from './tabs/tabs.component';
import { ClothingCardComponent } from './clothing-card/clothing-card.component';
import { MyClothesComponent } from './my-clothes/my-clothes.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Perfect Fit';
}
