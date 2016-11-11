import { Injectable, EventEmitter, ViewRef, ElementRef } from '@angular/core';
import { DataTransfer } from './datatransfer.object';

@Injectable()
export class ActionsService {
  public dataTransfer:DataTransfer = new DataTransfer();

  public $moveDraggable : EventEmitter<void> = new EventEmitter<void>();
  public $copyDraggable : EventEmitter<void> = new EventEmitter<void>();
}
