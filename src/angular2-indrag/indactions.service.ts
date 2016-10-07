import { Injectable, EventEmitter, ViewRef } from '@angular/core';
import { IndDataTransfer } from './inddatatransfer.object';

@Injectable()
export class IndActionsService {
  public dataTransfer:IndDataTransfer = new IndDataTransfer();
  
  public $moveDraggable : EventEmitter<void> = new EventEmitter<void>();
  public $copyDraggable : EventEmitter<void> = new EventEmitter<void>();
}
