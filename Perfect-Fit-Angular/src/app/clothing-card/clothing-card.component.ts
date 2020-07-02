import { Component } from '@angular/core';

@Component({
  selector: 'app-clothing-card',
  templateUrl: './clothing-card.component.html',
  styleUrls: ['./clothing-card.component.css']
})
export class ClothingCardComponent
{
	name: string = 'DEFAULT';
	
	constructor() {}

	//This doesn't seem right... should be @Input(). Maybe have some kind of function somewhere return a string.
	setName(val: string): void
	{
		this.name = val;
		console.log( this.name );
	}
}