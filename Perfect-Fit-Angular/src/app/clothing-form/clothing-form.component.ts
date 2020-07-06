import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { ClothesDbService } from '../clothes-db.service';

@Component({
	selector: 'app-clothing-form',
	templateUrl: './clothing-form.component.html',
	styleUrls: ['./clothing-form.component.css']
})
export class ClothingFormComponent
{	  
	@Input('imgSrc') imgSrc: string;
	
	constructor(private fb: FormBuilder, private clothesService: ClothesDbService) { }
	
	clothingForm = this.fb.group(
	{
		article: ['', [Validators.required, Validators.minLength(5)] ],
		color: [''],
		material: ['', Validators.required]
	});
	
	postToServer(): void
	{
		var clothingObject = {	article: this.clothingForm.get('article').value,
								color: this.clothingForm.get('color').value,
								material: this.clothingForm.get('material').value
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
	}

	onSubmit(): void
	{
		this.postToServer();
		this.resetValues();
	}
	
	updateImage(): void
	{
		var curArticle = this.clothingForm.get('article').value.toUpperCase();
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
