import {
  Directive, ElementRef, OnInit, Input, EventEmitter, ChangeDetectorRef,
  ViewContainerRef, ComponentFactoryResolver, ComponentRef
}
from '@angular/core';

import { ConfigService } from '../shared/config.service';
import { ActionsService } from '../shared/actions.service';
import { DragImage } from '../shared/drag-image.service';

@Directive({
  selector: '[ind-container]'
})
export class ContainerDirective implements OnInit {
  // Private Variables
  private _el:HTMLElement;
  // Configuration
  @Input('container-name') name:string;
  @Input('container-enabled') enabled:boolean = true;
  // External Event Handlers
  @Input('container-on-drag-over') onDragOver:Function;
  @Input('container-on-drag-end') onDragEnd:Function;

  public constructor(private _elRef: ElementRef,
    private _viewContainer: ViewContainerRef,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _config:ConfigService,
    private _actions:ActionsService){
    this._actions.$moveDraggable.subscribe(
      $e => {
        let dt = this._actions.dataTransfer;
        if(dt.target_container === this._el){
          this.onMove();
        }
      },
      err => console.error(err)
    );
  }

  public ngOnInit():void {
    this._el = this._elRef.nativeElement;

    this._el.ondragover = ($event: DragEvent) => {
      $event.stopPropagation();
      $event.preventDefault();
      if(this.enabled){
        this._onDragOver($event);
        if(this.onDragOver) this.onDragOver($event);
      }
    };

    if(!this.name){
      this.name = this._config.getNextContainerName();
    }
  }

  private _onDragOver($event:DragEvent):void {
    this._actions.dataTransfer.target_item = this._el;
    this._actions.dataTransfer.target_container = this._el;
    this._actions.$moveDraggable.emit();
  }

  private onMove(){
    let dt = this._actions.dataTransfer;
    if(this._el == dt.target_container){
      if(this._el == dt.target_item){
        this._el.appendChild(dt.dragged_item);
      }else{
        this._el.insertBefore(dt.dragged_item, dt.target_item);
      }
    }
  }
}
