/* 	TabComponent and TabsComponent are built from https://juristr.com/blog/2016/02/learning-ng2-creating-tab-component/
*	Reproducing the Bootstrap nav style in CSS sure was fun...
*/

import { Component, AfterContentInit, ContentChildren, Directive, QueryList } from '@angular/core';

import { TabComponent } from '../tab/tab.component';

@Component({
	selector: 'app-tabs',
	templateUrl: './tabs.component.html',
	styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterContentInit {

	//Retrieve children <app-tag> from <app-tabs> element
	@ContentChildren(TabComponent) tabChildren: QueryList<TabComponent>;
	 
	constructor() { }
	
	ngAfterContentInit()
	{
		this.selectTab(this.tabChildren.first);
	}
	
	selectTab(tab: TabComponent)
	{
		//Deactivate all tabs
		this.tabChildren.toArray().forEach(tab=>tab.active = false);
		
		tab.active = true;
	}
}
