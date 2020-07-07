import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventFlagsService } from '../event-flags.service';

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
	@Input('material') material: string = 'DEFAULT_M';
	@Input('imgSrc') imgSrc: string = 'assets/DEFAULT.png';
	@Input('hide') hide: boolean = true;
	
	constructor(private eventFlagsService: EventFlagsService) { }

	ngOnInit(): void 
	{
	  
	}
	
	closeMe(): void
	{
		this.closePopupEvent.emit();
	}
	
	createOutfits(): void
	{
		this.eventFlagsService.createOutfitsFlag = true;
		this.closePopupEvent.emit();
	}
	
}
