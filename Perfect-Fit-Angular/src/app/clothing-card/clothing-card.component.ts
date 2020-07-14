import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ClothesDbService } from '../clothes-db.service';
import { ClothingPopupComponent } from '../clothing-popup/clothing-popup.component';

@Component({
  selector: 'app-clothing-card',
  templateUrl: './clothing-card.component.html',
  styleUrls: ['./clothing-card.component.css']
})
export class ClothingCardComponent
{
	@Output('removeCardEvent') removeCardEvent: EventEmitter<any> = new EventEmitter();
	
	@Input('articleName') article: string = 'DEFAULT_A';
	@Input('color') color: string = 'DEFAULT_C';
	@Input('material') material: string = 'DEFAULT_M';
	@Input('type') type: string = 'DEFAULT_T';
	@Input('formality') formality: number = -1;
	
	@Input('imgSrc') imgSrc: string = 'assets/DEFAULT.png';
	
	popupOpen: boolean = false;

	constructor(private clothesService: ClothesDbService) {}

	setProperties(name: string, color: string, material: string, type: string, formality: number): void
	{
		this.article = name;
		this.color = color;
		this.material = material;
		this.type = type;
		this.formality = formality;
	}
	
	openPopup(): void
	{
		console.log(this.type, this.formality);
		this.popupOpen = true;
	}
	
	closePopup(): void
	{
		this.popupOpen = false;
	}
	
	removeMe()
	{
		this.removeCardEvent.emit({article: this.article, color: this.color, material: this.material});
	}
}