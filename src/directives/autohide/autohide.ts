import { Directive,Renderer,ElementRef } from '@angular/core';

/**
 * Generated class for the AutohideDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[autohide]', // Attribute selector,
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})

export class AutohideDirective {
	fabToHide;
	oldScrollTop:number = 0;

  constructor(public renderer:Renderer,public element:ElementRef) {
    console.log('Hello AutohideDirective Directive');
  }
	ngOnInit(){
		this.fabToHide = this.element.nativeElement.getElementsByClassName("fab")[0];
		this.renderer.setElementStyle(this.fabToHide,"opacity","0");
    }
	onContentScroll(e){
		if(e.scrollTop - this.oldScrollTop > 10){
			this.renderer.setElementStyle(this.fabToHide,"opacity","1");	
		}
		else if(e.scrollTop - this.oldScrollTop < 0){
			this.renderer.setElementStyle(this.fabToHide,"opacity","0");
		}
		this.oldScrollTop = e.scrollTop;
		// console.log(e);
	}
}
