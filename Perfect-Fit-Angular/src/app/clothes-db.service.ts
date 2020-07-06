import { Injectable } from '@angular/core';
import { ClothingCardComponent } from './clothing-card/clothing-card.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ClothesDbService
{
	validPaths = new Map([
		['PANTS_BLUE', true],
		['PANTS_BROWN', true],
		['SHIRT_RED', true],
		['SHIRT_WHITE', true]
	]);
	
	headers = new HttpHeaders().set('Content-Type', 'application/json');
	
	constructor(private http: HttpClient) { }

	//Returns all entries in myclothes database
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
	
	//Inserts article into myclothes database via server backend
	addArticle(clothingObject): void
	{
		this.http.post('http://localhost:4200/api/addClothes', clothingObject, { headers: this.headers })
			.subscribe(data => {
				console.log("Added ", data);
			},
			error => {
				console.log(error)
			});
	}
	
	//Deletes article from myclothes database via server backend
	deleteArticle($event): void
	{
		this.http.post('http://localhost:4200/api/removeClothes', $event, { headers: this.headers })
			.subscribe(data => {
				console.log("Removed ", data);
			},
			error => {
				console.log(error)
			});
	}
	
	getArticleImage(clothingObject: ClothingCardComponent): string
	{
		var filename = clothingObject.name + '_' + clothingObject.color;
		
		/*	Pinging the server to check if the path exists is extremely slow because 
		*	every time the page is refreshed, an http request has to be made for every 
		*	clothing card. Even doing this once on initialization is too slow.
		*/
		
		/*
		this.http.get('/asset/test.txt').subscribe(() => 
			{
				//File at path found, do nothing
			}, (err) => 
			{
				//If file not found, set path to default image
				if (err.status === 404) {
					path = 'assets/DEFAULT.png';
				}
			});
		*/
		
		if(this.validPaths.has(filename))
		{
			return 'assets/' + filename  + '.png';
		}
		else
		{
			return 'assets/DEFAULT.png';
		}
	}
}
