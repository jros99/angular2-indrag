import { Injectable } from '@angular/core';

@Injectable()
export class DragImage {
  public imageElement: string | HTMLElement;
  public x_offset: number = 0;
  public y_offset: number = 0;

  constructor(imageElement:string|HTMLElement,
    x_offset?:number, y_offset?:number)
  {
    if (typeof(imageElement)==='string') {
      let imgScr: string = <string>imageElement;
      this.imageElement = new HTMLImageElement();
      (<HTMLImageElement>this.imageElement).src = imgScr;
    }else{
      this.imageElement = <HTMLElement>imageElement;
    }
    if(typeof(x_offset)!=='undefined') this.x_offset = x_offset;
    if(typeof(y_offset)!=='undefined') this.y_offset = y_offset;
  }

  public setDragImage(event){
    if(event.dataTransfer){
      (<any>event.dataTransfer).setDragImage(this.imageElement, this.x_offset,
        this.y_offset);
    }
  }
}
