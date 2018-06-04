import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appInputFormat]'
})
export class InputFormatDirective {

  @Input("appInputFormat")
  format;

  constructor(private el:ElementRef) {
    
  }

  @HostListener("focus")
  onFokus():void{
    console.log("on Focus");
  }

  @HostListener("blur")
  onBlur():void{
    let value:string = this.el.nativeElement.value;
    if (this.format=='lowercase'){
      this.el.nativeElement.value=value.toLowerCase();
    } else {
      this.el.nativeElement.value=value.toUpperCase();
    }
  }

}
