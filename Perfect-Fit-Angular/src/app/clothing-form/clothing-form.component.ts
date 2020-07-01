import { Component } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
	selector: 'app-clothing-form',
	templateUrl: './clothing-form.component.html',
	styleUrls: ['./clothing-form.component.css']
})
export class ClothingFormComponent
{
	//Maybe put this header stuff in a service? Maybe.
	headers = new HttpHeaders().set('Content-Type', 'application/json');
		  
	constructor(private fb: FormBuilder, private http: HttpClient) { }
	
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
		
		this.http.post('http://localhost:4200/api/addClothes', clothingObject, { headers: this.headers })
			.subscribe(data => {
				console.log("test ", data);
			},
			error => {
				console.log(error)
			});
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
