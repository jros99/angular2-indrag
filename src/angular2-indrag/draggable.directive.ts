import {
  Directive, ElementRef, TemplateRef, OnInit, Input, Output, EventEmitter,
  ChangeDetectorRef
}
from '@angular/core';

import { IndConfigService } from './indconfig.service';
import { IndActionsService } from './indactions.service';
import { DragImage } from './drag-image.service';

@Directive({
  selector: '[ind-draggable]'
})
export class DraggableDirective implements OnInit {
  // Private Variables
  private _el:HTMLElement;
  private _elClone:HTMLElement;
  private _defaultCursor:string;
  // Configuration
  @Input('drag-image') dragImage:string|DragImage|Function;
  @Input('drag-cursor') cursor:string = 'grabbing';
  @Input('drag-enabled') enabled:boolean = true;
  @Input('drag-clone') clone:boolean = false;
  // External Event Handlers
  @Input('on-drag-start') onDragStart:Function;
  @Input('on-drag-over') onDragOver:Function;
  @Input('on-drag-end') onDragEnd:Function;
  @Input('on-drop') onDrop:Function;

  public constructor(private _elRef: ElementRef,
    // private _templateRef: TemplateRef,
    private _config:IndConfigService,
    private _actions:IndActionsService,
    private _changeDetector:ChangeDetectorRef){}

  public ngOnInit():void {
    this._el = this._elRef.nativeElement;
    this._defaultCursor = this._el.style.cursor;
    if(typeof(this.cursor)!=='undefined')
    this.cursor = this._config.cursor;

    this._el.draggable = true;
    this._el.ondragstart = ($event: DragEvent) => {
      console.log('darggable-ondragstart');
      if(this.enabled){
        // this._setDragImage($event);
        // this._setDragCursor();
        this._onDragStart($event);
        if(this.onDragStart) this.onDragStart($event);
      }
    };
    this._el.ondragover = ($event: DragEvent) => {
      console.log('darggable-ondragover');
      // console.log($event);
      $event.stopPropagation();
      $event.preventDefault();
      if(this.enabled){
        this._onDragOver($event);
        if(this.onDragOver) this.onDragOver($event);
      }
    };
    this._el.ondragend = ($event: DragEvent) => {
      console.log('darggable-ondragend');
      $event.stopPropagation();
      $event.preventDefault();
      if(this.enabled){
        this._onDragEnd($event);
        if(this.onDragEnd) this.onDragEnd($event);
      }
    };
    this._el.ondrop = ($event: DragEvent) => {
      console.log('darggable-ondrop');
      $event.stopPropagation();
      $event.preventDefault();
      if(this.enabled){
        if(this.onDrop) this.onDrop($event);
      }
    };
  }

  private _setDragImage($event:DragEvent):void{
    if(typeof(this.dragImage)!=='undefined'){
      if(this.clone){
        this._elClone = <HTMLElement>this._el.cloneNode(true);
        this._elClone.classList.add('ind-dragging');
        this._elClone.style.position = "absolute";
        this._elClone.style.top = "0px";
        this._elClone.style.left = "-1000px";
        this._el.parentElement.appendChild(this._elClone);
        (<any>$event.dataTransfer).setDragImage(this._elClone,
          $event.offsetX, $event.offsetY);
      }else if(typeof(this.dragImage)==='Function'){
        (<any>$event.dataTransfer).setDragImage((<Function>this.dragImage)());
      } else {
        if(typeof(this.dragImage)==='string')
        this.dragImage = new DragImage(this.dragImage);
        (<DragImage>this.dragImage).setDragImage($event);
      }
    }
  }

  private _setDragCursor():void{
    if(typeof(this.cursor)!=='undefined'){
      this._el.style.cursor = this.cursor;
    }
  }

  private _onDragStart($event:DragEvent):void{
    this._el.classList.add(this._config.dragging_class);
      // this._actions.dataTransfer.dragged_item = this._templateRef;
  }
  private _onDragOver($event:DragEvent):void{
    this._actions.$moveDraggable.emit();
  }
  private _onDragEnd($event:DragEvent):void{
    this._el.classList.remove(this._config.dragging_class);
    this._actions.dataTransfer.dragged_item = null;
    console.log($event);
  }
}
