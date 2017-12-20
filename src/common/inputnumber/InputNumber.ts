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
  @Input() min:number=0;
  @Input() isReadonly:boolean=false;
  constructor(){}
  ngOnInit(){}

  //控制内部展示数据的显示
  get value(): any {
    return Number(this.innerValue);
  }

  //控制内部展示数据的设置
  set value(v: any) {
    v=Number(v);
    if(!isUndefined(this.max)){
      v=v>this.max?0:v;
    }
    if(!isUndefined(this.min)){
      v=v<this.min?0:v;
    }
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);//将新得到的值返回给绑定的值
    }
  }
 /*该方法用于将模型中的新值写入视图或 DOM 属性中*/
  writeValue(value: any) {
    if(isUndefined(value)){
      value = 0;
    }
    value=Number(value);
    if(!isUndefined(this.max)){
      value=value>this.max?0:value;
    }
    if(!isUndefined(this.min)){
      value=value<this.min?0:value;
    }
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }
  /*设置当控件接收到 change 事件后，调用的函数*/
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }
  /*设置当控件接收到 touch 事件后，调用的函数*/
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }


}
