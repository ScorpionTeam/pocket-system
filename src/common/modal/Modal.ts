import {Component, Input, Output, EventEmitter} from "@angular/core";
@Component({
  selector:'modal',
  templateUrl:'Modal.html',
  styleUrls:['Modal.css']
})

export class Modal{
  @Input() show:boolean = false;
  @Input() title:string='模态头部';
  @Input() content:string;
  @Input() footer:any;//底部template
  @Output() showChange:EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(){}
  /*关闭*/
  close(){
    this.showChange.emit(false);
  }


}
