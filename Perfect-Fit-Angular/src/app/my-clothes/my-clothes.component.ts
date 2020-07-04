import { Component, OnInit, Input } from '@angular/core';
import { ClothingCardComponent } from '../clothing-card/clothing-card.component';
import { ClothesDbService } from '../clothes-db.service';

@Component({
	selector: 'app-my-clothes',
	templateUrl: './my-clothes.component.html',
	styleUrls: ['./my-clothes.component.css']
})
export class MyClothesComponent implements OnInit
{
	myClothes: Array<ClothingCardComponent> = [];
	
	constructor(private clothesService: ClothesDbService) { }

	ngOnInit(): void
	{
		this.updateClothes();
	}
	
	updateClothes(): void
	{
		this.myClothes = this.clothesService.getUserClothes();
	}
	
	removeArticle($event): void
	{
		console.log("DELETION", $event.name, $event.color, $event.material);
		this.clothesService.deleteArticle($event);
	}
}
