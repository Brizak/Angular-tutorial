import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pkmnBorderCard]'
})
export class BorderCardDirective {

  private initialColor: string = '#f5f5f5';
  private defaultColor: string = '#009688';
  private defaultHeight: number = 180;


  constructor(private el: ElementRef) {
    this.setHeight(this.defaultHeight);
    this.setBorder(this.initialColor);
    this.setCursor();
  }
  @Input('pkmnBorderCard') borderColor: string;

  @HostListener('mouseenter') onMouseEnter(){
    this.setBorder(this.borderColor || this.defaultColor);
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.setBorder(this.initialColor);
  }

  private setBorder(color: string) {
    this.el.nativeElement.style.border = `solid 4px ${color}`;
  }

  private setHeight(height: number) {
    this.el.nativeElement.style.height = `${height}px`
  }

  private setCursor() {
    this.el.nativeElement.style.cursor = 'pointer';
  }

}
