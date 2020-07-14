import { Component, OnInit } from '@angular/core';
import { OutfitComponent } from '../outfit/outfit.component';
import { ClothesDbService } from '../clothes-db.service';
import { EventFlagsService } from '../event-flags.service';
import { ClothingObject } from '../clothing-object';

@Component({
	selector: 'app-outfits',
	templateUrl: './outfits.component.html',
	styleUrls: ['./outfits.component.css']
})
export class OutfitsComponent implements OnInit 
{
	outfits: Array<OutfitComponent> = [];
	
	constructor(private clothesService: ClothesDbService, private eventFlagsService: EventFlagsService) { }

	ngOnInit(): void 
	{
		
	}
	
	ngDoCheck(): void
	{
		if(this.eventFlagsService.createOutfitsFlag == true)
		{
			this.generateOutfits(this.eventFlagsService.selectedArticle);
			this.eventFlagsService.createOutfitsFlag = false;
		}
	}
	
	generateOutfits(clothingObject: ClothingObject): void
	{
		this.outfits = this.clothesService.getOutfits(clothingObject);
	}
	
	clearOutfits(): void
	{
		this.outfits = [];
	}
}
