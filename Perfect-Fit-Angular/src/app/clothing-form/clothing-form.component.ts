import { Component } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { ClothesDbService } from '../clothes-db.service';

@Component({
	selector: 'app-clothing-form',
	templateUrl: './clothing-form.component.html',
	styleUrls: ['./clothing-form.component.css']
})
export class ClothingFormComponent
{	  
	constructor(private fb: FormBuilder, private clothesService: ClothesDbService) { }
	
	clothingForm = this.fb.group(
	{
		article: ['', [Validators.required, Validators.minLength(5)] ],
		color: [''],
		material: ['', Validators.required]
	});
	
	postToServer()
	{
		var clothingObject = {	article: this.clothingForm.get('article').value,
								color: this.clothingForm.get('color').value,
								material: this.clothingForm.get('material').value
		};
		
		this.clothesService.addArticle(clothingObject);
	}
	
	resetValues()
	{
		this.clothingForm.patchValue(
		{
			article: '',
			color: '',
			material: ''
		});
	}

	onSubmit()
	{
		this.postToServer();
		this.resetValues();
	}
	
	get article() { return this.clothingForm.get('article'); }
}
