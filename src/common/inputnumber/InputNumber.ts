import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
@Component({
  selector:'hk-input-number',
  templateUrl:'InputNumber.html'
})

export class InputNumber implements OnInit{

  @Input() val:number;
  @Input() max:number;
  @Input() min:number;
  @Output() hkchange:EventEmitter<any> = new EventEmitter();
  constructor(){}
  ngOnInit(){}

  changeValue(){
    this.hkchange.emit(Number(this.val));
  }

}