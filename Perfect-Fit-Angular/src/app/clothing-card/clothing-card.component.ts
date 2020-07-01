import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-clothing-card',
  templateUrl: './clothing-card.component.html',
  styleUrls: ['./clothing-card.component.css']
})
export class ClothingCardComponent
{
	constructor() {}
	
	@Input('tabTitle') name: string;
}