import { Injectable } from '@angular/core';
import { ClothingCardComponent } from './clothing-card/clothing-card.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ClothesDbService
{
	headers = new HttpHeaders().set('Content-Type', 'application/json');
	
	constructor(private http: HttpClient) { }

	getUserClothes(): Array<ClothingCardComponent>
	{
		var clothes: Array<ClothingCardComponent> = [];

		this.http.get('http://localhost:4200/api/getClothes', { headers: this.headers })
			.subscribe(data => {
				for (var i in data)
				{
					clothes.push( new ClothingCardComponent() );
					clothes[i].setProperties(data[i].article, data[i].color, data[i].material);
				}
			},
			error => {
				console.log(error)
			});
		
		return clothes;
	}
	
	addArticle(): void
	{
		this.http.post('http://localhost:4200/api/addClothes', clothingObject, { headers: this.headers })
			.subscribe(data => {
				console.log("test ", data);
			},
			error => {
				console.log(error)
			});
	}
	
	deleteArticle($event): void
	{
		
	}
}
