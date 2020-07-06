import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClothingPopupComponent } from '../clothing-popup/clothing-popup.component';

@Component({
  selector: 'app-clothing-card',
  templateUrl: './clothing-card.component.html',
  styleUrls: ['./clothing-card.component.css']
})
export class ClothingCardComponent
{
	@Output('removeCardEvent') removeCardEvent: EventEmitter<any> = new EventEmitter();
	
	@Input('articleName') name: string = 'DEFAULT_A';
	@Input('color') color: string = 'DEFAULT_C';
	@Input('material') material: string = 'DEFAULT_M';
	
	@Input('imgSrc') imgSrc: string = 'assets/DEFAULT.png';
	
	popupOpen: boolean = false;

	constructor() {}

	setProperties(name: string, color: string, material: string): void
	{
		this.name = name;
		this.color = color;
		this.material = material;
	}
	
	getName(): string
	{
		return this.name;
	}
	
	getColor(): string
	{
		return this.color;
	}
	
	getMaterial(): string
	{
		return this.material;
	}
	
	openPopup(): void
	{
		this.popupOpen = true;
	}
	
	closePopup(): void
	{
		this.popupOpen = false;
	}
	
	removeMe()
	{
		this.removeCardEvent.emit({article: this.name, color: this.color, material: this.material});
	}
}