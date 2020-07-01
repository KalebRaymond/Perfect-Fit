import { Component } from '@angular/core';

import { TabsComponent } from './tabs/tabs.component';
import { ClothingCardComponent } from './clothing-card/clothing-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Perfect Fit';
}
