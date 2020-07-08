/* 	TabComponent and TabsComponent are built from https://juristr.com/blog/2016/02/learning-ng2-creating-tab-component/
*	Reproducing the Bootstrap nav style in CSS sure was fun...
*/

import { Component, AfterContentInit, ContentChildren, Directive, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { EventFlagsService } from '../event-flags.service';

@Component({
	selector: 'app-tabs',
	templateUrl: './tabs.component.html',
	styleUrls: ['./tabs.component.css']
})
export class TabsComponent{

	//Retrieve children <app-tag> from <app-tabs> element
	@ContentChildren(TabComponent) tabChildren: QueryList<TabComponent>;
	 
	constructor(private eventFlagsService: EventFlagsService) { }
	
	ngAfterContentInit()
	{
		this.selectTab(this.tabChildren.first);
	}
	
	ngDoCheck()
	{
		if(this.eventFlagsService.openOutfitsTabFlag == true)
		{
			this.selectTab(this.tabChildren.last);
			this.eventFlagsService.openOutfitsTabFlag = false;
		}
	}
	
	selectTab(tab: TabComponent)
	{
		//Deactivate all tabs
		this.tabChildren.toArray().forEach(tab=>tab.active = false);

		tab.active = true;
	}
}
