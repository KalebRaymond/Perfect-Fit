import { Component } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
	selector: 'app-clothing-form',
	templateUrl: './clothing-form.component.html',
	styleUrls: ['./clothing-form.component.css']
})
export class ClothingFormComponent
{
	constructor(private fb: FormBuilder) { }
	
	clothingForm = this.fb.group(
	{
		article: ['', [Validators.required, Validators.minLength(5)] ],
		color: [''],
		material: ['', Validators.required]
	});
	
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
		// TODO: Use EventEmitter with form value (according to https://angular.io/guide/reactive-forms)
		console.warn("something");
		this.resetValues();
	}
	
	get article() { return this.clothingForm.get('article'); }
}
