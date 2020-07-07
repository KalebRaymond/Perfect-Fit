import { Component, OnInit } from '@angular/core';
import { OutfitComponent } from '../outfit/outfit.component';
import { ClothesDbService } from '../clothes-db.service';

@Component({
	selector: 'app-outfits',
	templateUrl: './outfits.component.html',
	styleUrls: ['./outfits.component.css']
})
export class OutfitsComponent implements OnInit 
{
	outfits: Array<OutfitComponent> = [
		new OutfitComponent(this.clothesService),
		new OutfitComponent(this.clothesService),
		new OutfitComponent(this.clothesService),
	];
	
	constructor(private clothesService: ClothesDbService) { }

	ngOnInit(): void 
	{
		
	}
	
	generateOutfits(): void
	{
		
	}
}
