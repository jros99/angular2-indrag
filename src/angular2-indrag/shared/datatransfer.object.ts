export class DataTransfer {
  public target_container:HTMLElement = null;
  public dragged_item:HTMLElement = null;
  private _target_item:Element = null;
  public set target_item(el:Element){
    this._target_item = this.getTarget(el);
  }
  public get target_item(){
    return this._target_item;
  }

  private getContainer(element){
      if(element !=null && element.hasAttribute('ind-container')){
          return element;
      }
      return this.getContainer(element.parentElement);
  }

  private getTarget(element){
      if(element !=null && (element.hasAttribute('ind-draggable') || element.hasAttribute('ind-container'))){
          return element;
      }
      return this.getTarget(element.parentElement);
  }

  public targetContainer(){
    return this.getContainer(this.target_item);
  }
}
