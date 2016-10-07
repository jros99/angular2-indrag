import {
  Directive, ElementRef, OnInit, Input, Output, EventEmitter, ChangeDetectorRef,
  ViewContainerRef
}
from '@angular/core';

import { IndConfigService } from './indconfig.service';
import { IndActionsService } from './indactions.service';
import { DragImage } from './drag-image.service';

@Directive({
  selector: '[ind-container]'
})
export class ContainerDirective implements OnInit {
  // Private Variables
  private _el:HTMLElement;
  // Configuration
  @Input('container-name') name:string;
  @Input('container-enabled') enabled:string;
  // External Event Handlers
  @Input('container-on-drag-over') onDragOver:Function;
  @Input('container-on-drag-end') onDragEnd:Function;

  public constructor(private _elRef: ElementRef,
    private _config:IndConfigService,
    private _actions:IndActionsService,
    private _container: ViewContainerRef){
    this._actions.$moveDraggable.subscribe(
      $e => {
        let dt = this._actions.dataTransfer;
        if(dt.target_container === this.name)this.onMove();
      },
      err => console.error(err)
    );
  }

  public ngOnInit():void {
    console.log(this._container);
    console.log(this._container.get(0));
    this._el = this._elRef.nativeElement;

    this._el.ondragover = ($event: DragEvent) => {
      console.log('container-ondragover');
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

  private _onDragOver($event:DragEvent):void{
    this._actions.dataTransfer.target_container = null;
  }

  private onMove(){
    let dt = this._actions.dataTransfer;
    let index = this._container.indexOf(dt.target_item);
    if(index>-1){
      this._container.insert(dt.dragged_item, index);
    }else{
      this._container.insert(dt.dragged_item);
    }
  }
}
