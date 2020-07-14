import { Injectable } from '@angular/core';
import { ClothingCardComponent } from './clothing-card/clothing-card.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClothingObject } from './clothing-object';
import { OutfitComponent } from './outfit/outfit.component';

@Injectable({
	providedIn: 'root'
})
export class ClothesDbService
{
	validPaths = new Map([
		['PANTS_BLUE', true],
		['PANTS_BROWN', true],
		['SLACKS_BLACK', true],
		['SLACKS_GRAY', true],
		['SHIRT_WHITE', true],
		['SHIRT_RED', true],
		['SHIRT_GREEN', true],
		['SHIRT_BLUE', true],
		['SHIRT_PURPLE', true],
		['SHIRT_NAVY', true],
		['SHIRT_BURGUNDY', true],
		['DRESS SHIRT_WHITE', true],
		['DRESS SHIRT_GREEN', true],
		['DRESS SHIRT_BLUE', true],
		['DRESS SHIRT_NAVY', true],
		['T-SHIRT_WHITE', true],
		['T-SHIRT_RED', true],
		['T-SHIRT_GREEN', true],
		['T-SHIRT_BLUE', true],
		['T-SHIRT_PURPLE', true],
		['T-SHIRT_NAVY', true],
		['T-SHIRT_BURGUNDY', true],
		['SWEATSHIRT_BLACK', true],
		['SWEATSHIRT_RED', true],
		['SWEATPANTS_BLACK', true],
		['SWEATPANTS_GRAY', true],
		['BOMBER_GREEN', true],
		['BLAZER_BLACK', true],
		['BLAZER_NAVY', true],
		['BLAZER_GRAY', true]
	]);
	
	//colorMatches is copied from colorMatches.json (because pinging the server would be really slow, and for 
	//proof of concept purposes the colorMatches isn't going to change).
	colorMatches = 
	{
		'BLACK': 'Red, Orange, Yellow, Green, Blue, Purple, Brown, Navy, Burgundy, Gray, White',
		'GRAY': 'Red, Orange, Yellow, Blue, Purple, Brown, Navy, Burgundy, White, Black',
		'WHITE': 'Red, Orange, Yellow, Green, Blue, Purple, Brown, Navy, Burgundy, Gray, Black',
		
		'RED': 'Blue, Gray, White, Black',
		'ORANGE': 'Blue, Navy, Green, Purple, Brown, White, Black',
		'YELLOW': 'Blue, Navy, Green, Brown, White, Black',
		'GREEN': 'Brown, Orange, Yellow, Purple, Burgundy, White, Black',
		'BLUE': 'Red, Orange, Yellow, Purple, Brown, Burgundy, Navy, White, Gray, Black',
		'PURPLE': 'Orange, Green, Blue, Brown, Navy, White, Gray, Black',
		
		'BROWN': 'Orange, Yellow, Green, Blue, Purple, Navy, Burgundy, White, Black',
		
		'NAVY': 'Orange, Yellow, Blue, Purple, Brown, Burgundy, White, Gray, Black',
		
		'BURGUNDY': 'Green, Blue, Brown, Navy, White, Gray, Black'
	};
	
	formalities = ['Streetwear', 'Casual', 'Business Casual', 'Business Formal'];
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
					clothes.push( new ClothingCardComponent(this) );
					clothes[i].setProperties(data[i].article, data[i].color, data[i].material, data[i].type, data[i].formality);
				}
			},
			error => {
				console.log(error)
			});
		
		return clothes;
	}
	
	//Inserts article into myclothes database via server backend
	addArticle(clothingObject: ClothingObject): void
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
		var filename = clothingObject.article + '_' + clothingObject.color;
		
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
	
	//Returns an array of OutfitComponents containing outfits that look good when matched with clothingObject
	getOutfits(clothingObject: ClothingObject): Array<OutfitComponent>
	{	
		var outfits = [];
		
		this.http.post('http://localhost:4200/api/getOutfits', clothingObject, { headers: this.headers })
			.subscribe(data => {
				//Would be cool if I didn't have to loop over all the clothes after retrieving them just to copy them over...
				for(var curOutfit in data)
				{
					var newOutfit = new OutfitComponent(this);
					newOutfit.articles.push(clothingObject);
					
					for(var curArticle in data[curOutfit])
					{
						var newArticle = {
											article: data[curOutfit][curArticle].article,
											color: data[curOutfit][curArticle].color,
											material: data[curOutfit][curArticle].material,
											type: data[curOutfit][curArticle].type,
											formality: data[curOutfit][curArticle].type,
						}
						
						newOutfit.articles.push(newArticle);
					}
					
					outfits.push(newOutfit);
				}
			},
			error => {
				console.log(error)
			});
			
		return outfits;
	}
	
	getFormalities(formality: number): string
	{
		//formality ranges between 0 for casual and 2 for formal. this.formalities has four values representing
		//different formalities, from -1 to 2. To get the correct formality, the value passed to this function
		//must be incremented by 1.
		return this.formalities[formality + 1] + ' / ' + this.formalities[formality];
	}
	
	getColors(color: string): string
	{
		return this.colorMatches[color.toUpperCase()];
	}
}
