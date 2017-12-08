import {Injectable} from "@angular/core";
@Injectable()
export class DomTool{
  constructor(){}

  /**
   * 增加样式
   * @param el
   * @param className
   */
  addClass(el:any,className:string){
    if(el.className.indexOf(className)==-1){
      el.className+=" "+className;
    }
  }

  /**
   * 移除样式
   * @param el
   * @param className
   */
  removeClass(el:any,className:string){
    el.className.replace(className,"");
  }

  /**
   * 判断是否有class
   * @param el
   * @param className
   */
  hasClass(el:any,className:string){
    if(el.classList.value.indexOf(className)==-1){
      return false;
    }else{
      return  true;
    }
  }
}
