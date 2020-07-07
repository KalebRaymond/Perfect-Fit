import { Component, OnInit, Input } from '@angular/core';
import { ClothingCardComponent } from '../clothing-card/clothing-card.component';
import { ClothesDbService } from '../clothes-db.service';
import { EventFlagsService } from '../event-flags.service';

@Component({
	selector: 'app-my-clothes',
	templateUrl: './my-clothes.component.html',
	styleUrls: ['./my-clothes.component.css']
})
export class MyClothesComponent
{
	myClothes: Array<ClothingCardComponent> = [];
	
	constructor(private clothesService: ClothesDbService, private eventFlagsService: EventFlagsService) { }

	ngOnInit(): void
	{
		console.log("oninit");
		this.updateClothes();
	}
	
	ngDoCheck()
	{
		if(this.eventFlagsService.updateMyClothesFlag == true)
		{
			this.updateClothes();
			this.eventFlagsService.updateMyClothesFlag = false;
		}
	}
	
	updateClothes(): void
	{
		this.myClothes = this.clothesService.getUserClothes();
	}
	
	removeArticle($event): void
	{
		this.clothesService.deleteArticle($event);
		this.updateClothes();
	}
}
