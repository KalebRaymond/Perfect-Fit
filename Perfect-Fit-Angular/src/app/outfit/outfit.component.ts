import { Component, OnInit } from '@angular/core';
import { ClothesDbService } from '../clothes-db.service';

@Component({
	selector: 'app-outfit',
	templateUrl: './outfit.component.html',
	styleUrls: ['./outfit.component.css']
})
export class OutfitComponent implements OnInit 
{
	articles: Array<any> = [
		{name: 'SHIRT', color: 'WHITE', material: 'COTTON'},
		{name: 'PANTS', color: 'BLUE', material: 'DENIM'},
		{name: 'JACKET', color: 'BLACK', material: 'LEATHER'},
		{name: 'PANTS', color: 'BROWN', material: 'KHAKI'},
	];
	
	constructor(private clothesService: ClothesDbService) { }

	ngOnInit(): void 
	{
	}
}
