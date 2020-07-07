/*	Why angular doesn't natively support event propogation is beyond me. */

import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class EventFlagsService
{
	createOutfitsFlag: boolean = false;
	updateMyClothesFlag: boolean = false;
	
	constructor() { }
}