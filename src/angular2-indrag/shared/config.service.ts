import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  private _default_name:string = 'ind-container-';
  private _name_count:number = 0;

  public cursor:string;
  public dragging_class:string = 'ind-dragging';
  public dragging_over_class:string = 'ind-dragging-over';

  public getNextContainerName(){
    this._name_count++;
    return this._default_name+this._name_count;
  }
}
