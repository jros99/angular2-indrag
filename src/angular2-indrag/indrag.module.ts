import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { DraggableDirective }   from './draggable.directive';
import { ContainerDirective }   from './container.directive';
import { IndConfigService }     from './indconfig.service';
import { IndActionsService }     from './indactions.service';

@NgModule({
  imports:      [ CommonModule, FormsModule ],
  declarations: [ DraggableDirective, ContainerDirective ],
  exports:      [ DraggableDirective, ContainerDirective ],
  providers:    [ IndConfigService, IndActionsService ]
})
export class InDragModule { }
