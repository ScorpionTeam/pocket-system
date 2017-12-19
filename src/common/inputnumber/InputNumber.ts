import {Component, OnInit, Input, Output, EventEmitter, forwardRef} from "@angular/core";
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";
import {isUndefined} from "util";
@Component({
  selector:'hk-input-number',
  template:`
    <input type="text" class="hk_input" [(ngModel)]="value" [readonly]="isReadonly">
  `,
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputNumber),
    multi: true
  }]
})

export class InputNumber implements OnInit,ControlValueAccessor {

  innerValue:number=0;
  onTouchedCallback(){}
  onChangeCallback(_: any){}
  @Input() max:number;
  @Input() min:number;
  @Input() isReadonly:boolean=false;
  constructor(){}
  ngOnInit(){}

  get value(): any {
    return Number(this.innerValue);
  }

  set value(v: any) {
    v=Number(v);
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  writeValue(value: any) {
    if(isUndefined(value)){
      value = 0;
    }
    value=Number(value);
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }


}
