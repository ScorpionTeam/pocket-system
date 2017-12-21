import {Component, OnInit, Input, Output, EventEmitter, forwardRef} from "@angular/core";
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";
import {isUndefined} from "util";
@Component({
  selector:'hk-input-number',
  template:`
    <div nz-row>
      <div nz-col [nzSpan]="5">
           <select class="hk_select" [(ngModel)]="operator" (change)="selectChange()">
            <option value="+">+</option>
            <option value="-">-</option>
          </select>
      </div>
      <div nz-col [nzSpan]="19">
          <input type="text" class="hk_input" [(ngModel)]="value" [readonly]="isReadonly">
      </div>
    </div>
  `,
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputNumber),
    multi: true
  }]
})

export class InputNumber implements OnInit,ControlValueAccessor {

  innerValue:number=0;
  operator:string = '+';//正负值
  onTouchedCallback(){}
  onChangeCallback(_: any){}
  @Input() max:number;
  @Input() min:number=0;
  @Input() isReadonly:boolean=false;
  constructor(){}
  ngOnInit(){}

  //控制内部展示数据的显示
  get value(): any {
    return this.innerValue;
  }

  //控制内部展示数据的设置
  set value(v: any) {
    v=this.operator+v;
    v=Number(v);
    /*判断输入值是否合法*/
    if(isNaN(v)){
      setTimeout(()=>{this.value = 0;},0)
    }
    /*判断是否在最大值以内*/
    if(!this.inMax(v)){
      setTimeout(()=>{this.value = 0},0);
    }
    /*判断是否在最小值以上*/
    if(!this.onMin(v)){
      setTimeout(()=>{this.value = 0},0);
    }
    console.log(this.innerValue+'====='+v);
    /*判断值是否发生变化*/
    if (v !== this.innerValue) {
      v=v||0;//去除-0的-号
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
    //在最大值以内
    value=this.inMax(value)?value:0;
    //在最小值以上
    value=this.onMin(value)?value:0;
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

  /**
   * 是否超过最大值
   * @param val:比较值
   */
  inMax(val:any){
    if(isUndefined(this.max)){
      return true;
    }else {
      return  val>this.max?false:true;
    }
  }

  /**
   * 是否小于最小值
   * @param val
   * @returns {boolean}
   */
  onMin(val:any){
    if(isUndefined(this.min)){
      return true;
    }
    return val<this.min?false:true;
  }

  /*下拉框值变化回调*/
  selectChange(){
    this.value = this.innerValue;
  }
}
