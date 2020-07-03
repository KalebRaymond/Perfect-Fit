import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-clothing-card',
  templateUrl: './clothing-card.component.html',
  styleUrls: ['./clothing-card.component.css']
})
export class ClothingCardComponent
{
	@Input('articleName') name: string = 'DEFAULT';

	constructor() {}

	setName(val: string): void
	{
		this.name = val;
	}
	
	getName(): string
	{
		return this.name;
	}
}