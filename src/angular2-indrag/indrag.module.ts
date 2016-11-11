import { NgModule }           from '@angular/core';

import { DraggableDirective }   from './draggable/draggable.directive';
import { ContainerDirective }   from './container/container.directive';
import { ConfigService }     from './shared/config.service';
import { ActionsService }     from './shared/actions.service';

@NgModule({
  imports:      [],
  declarations: [
    DraggableDirective,
    ContainerDirective
  ],
  exports:      [
    DraggableDirective,
    ContainerDirective
  ],
  providers:    [
    ConfigService,
    ActionsService
  ]
})
export class InDragModule { }
