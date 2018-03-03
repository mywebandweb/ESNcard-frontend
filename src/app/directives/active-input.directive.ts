import {Directive, ElementRef,  Input, HostListener, Renderer2, AfterViewInit, AfterViewChecked} from '@angular/core';

@Directive({
  selector: '[appActiveInput]'
})
export class ActiveInputDirective implements AfterViewInit, AfterViewChecked {
    isClicked: boolean = false;
    // public elLabel: ElementRef = null;
    public elLabel: ElementRef | any = null;
    public input: ElementRef | any = null;

  constructor( private el:ElementRef, public renderer: Renderer2 ) {

  }


  @HostListener('mouseenter') mouseEntro(){
      this.renderer.addClass(this.el.nativeElement, 'is-focused');
      this.isClicked = true;
  }

  @HostListener('mouseleave') mouseSalio(){
      this.isClicked = false;

      //this.renderer.removeClass(this.el.nativeElement, 'is-focused');

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.checkValue();
    }, 0);
  }
  ngAfterViewChecked() {
    this.initComponent();
    this.checkValue();
  }

  private initComponent(): void {
    let inputP = this.el.nativeElement;
    this.elLabel = inputP.querySelector("#activeInput");
    this.input = inputP.querySelector("#Input");

    if (this.input != null) {
      this.renderer.addClass(this.elLabel, 'active');
    }
  }

  private checkValue(): void {
    if (this.input == '') {
        this.renderer.removeClass(this.elLabel, 'is-focused');
    }
  }

}
