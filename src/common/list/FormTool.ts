import {Injectable} from "@angular/core";
import {FormGroup} from "@angular/forms";
@Injectable()
export class FormTool{
  constructor(){}

  /**
   * 校验表单对象
   * @param obj
   * @param type:校验类型
   */
  required(obj:FormGroup,type:string){
    if(obj.controls[type].hasError("required")&&obj.controls[type].dirty){
      return true
    }else {
      return false;
    }
  }

  /**
   * 表单控件错误校验
   * @param obj
   * @param errorName
   * @returns {boolean}
   */
  formErrorCheck(obj:FormGroup,errorName:string){
    return obj.hasError(errorName);
  }

  /**
   * 将所有表单控件变为警告色
   * @param obj
   */
  makeDirty(obj:FormGroup){
    for (const i in obj.controls) {
      obj.controls[ i ].markAsDirty();
    }
  }
}
