import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { ClothesDbService } from '../clothes-db.service';
import { EventFlagsService } from '../event-flags.service';

@Component({
	selector: 'app-clothing-form',
	templateUrl: './clothing-form.component.html',
	styleUrls: ['./clothing-form.component.css']
})
export class ClothingFormComponent
{	  
	@Input('imgSrc') imgSrc: string;
	
	constructor(private fb: FormBuilder, private clothesService: ClothesDbService, private eventFlagsService: EventFlagsService) { }
	
	clothingForm = this.fb.group(
	{
		article: ['', [Validators.required, Validators.minLength(5)] ],
		color: [''],
		material: ['', Validators.required]
	});
	
	postToServer(): void
	{
		var articleArr = JSON.parse(this.clothingForm.get('article').value);
		
		var clothingObject = {	article: articleArr[0],
								color: this.clothingForm.get('color').value,
								material: this.clothingForm.get('material').value,
								type: articleArr[1]
		};
		
		this.clothesService.addArticle(clothingObject);
	}
	
	resetValues(): void
	{
		this.clothingForm.patchValue(
		{
			article: '',
			color: '',
			material: ''
		});
		
		this.imgSrc = '';
	}

	onSubmit(): void
	{
		this.postToServer();
		this.eventFlagsService.updateMyClothesFlag = true;
		this.resetValues();
	}
	
	updateImage(): void
	{
		var curArticle = JSON.parse(this.clothingForm.get('article').value)[0];
		
		if(curArticle === '')
		{
			this.imgSrc = 'assets/DEFAULT.png';
			return;
		}
		
		var curColor = this.clothingForm.get('color').value.toUpperCase();
		if(curColor === '')
		{
			curColor = 'WHITE';
		}
		
		var filename = curArticle + '_' + curColor;
		
		if(this.clothesService.validPaths.has(filename))
		{
			this.imgSrc = 'assets/' + curArticle + '_' + curColor + '.png';
		}
		else
		{
			this.imgSrc = 'assets/DEFAULT.png';
		}
	}
	
	get article() { return this.clothingForm.get('article'); }
}
