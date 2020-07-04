import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-clothing-popup',
	templateUrl: './clothing-popup.component.html',
	styleUrls: ['./clothing-popup.component.css']
})
export class ClothingPopupComponent implements OnInit
{
	@Output('closePopupEvent') closePopupEvent: EventEmitter<any> = new EventEmitter();
	
	@Input('articleName') article: string = 'DEFAULT_A';
	@Input('color') color: string = 'DEFAULT_C';
	@Input('material') material: string = 'DEFAULT_M'
	
	@Input('hide') hide: boolean = true;
	
	constructor() { }

	ngOnInit(): void 
	{
	  
	}
	
	closeMe(): void
	{
		this.closePopupEvent.emit();
	}
	
}
