/*	Why angular doesn't natively support event propogation is beyond me. */

import { Injectable } from '@angular/core';
import { ClothingObject } from './clothing-object';

@Injectable({
	providedIn: 'root'
})
export class EventFlagsService
{
	createOutfitsFlag: boolean = false;
	openOutfitsTabFlag: boolean = false;
	updateMyClothesFlag: boolean = false;
	
	selectedArticle: ClothingObject = {article: 'DEFAULT_A', color: 'DEFAULT_C', material: 'DEFAULT_M'};
	
	constructor() { }
}