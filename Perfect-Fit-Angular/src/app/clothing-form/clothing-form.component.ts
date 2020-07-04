import { Component } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClothesDbService } from '../clothes-db.service';

@Component({
	selector: 'app-clothing-form',
	templateUrl: './clothing-form.component.html',
	styleUrls: ['./clothing-form.component.css']
})
export class ClothingFormComponent
{
	//Maybe put this header stuff in a service? Maybe.
	headers = new HttpHeaders().set('Content-Type', 'application/json');
		  
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
		
		this.clothesService(clothingObject);
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
		
		// TODO: Use EventEmitter with form value (according to https://angular.io/guide/reactive-forms)
		this.resetValues();
	}
	
	get article() { return this.clothingForm.get('article'); }
}
