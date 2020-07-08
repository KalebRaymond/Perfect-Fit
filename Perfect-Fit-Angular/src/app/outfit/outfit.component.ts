import { Component, OnInit, Input } from '@angular/core';
import { ClothesDbService } from '../clothes-db.service';
import { ClothingObject } from '../clothing-object';

@Component({
	selector: 'app-outfit',
	templateUrl: './outfit.component.html',
	styleUrls: ['./outfit.component.css']
})
export class OutfitComponent implements OnInit 
{
	@Input('articles') articles: Array<ClothingObject> = [];
	
	constructor(private clothesService: ClothesDbService) { }

	ngOnInit(): void 
	{
	}
}
