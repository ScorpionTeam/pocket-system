import {Injectable} from "@angular/core";
import {Http} from "../common/http/Http";
import {isUndefined} from "util";
@Injectable()
export class ShopServe{
  constructor(private http:Http){}

  /**
   * 新增商铺
   * @param obj
   */
  add(obj:any){
    let url = "seller/add";
    return this.http.post(url,obj);
  }

  /**
   * 修改商铺
   * @param obj
   */
  update(obj:any){
    let url = "seller/modify";
    return this.http.post(url,obj);
  }

  /**
   * 查找我的商铺
   * @param userId
   */
  findMyShop(userId:any){
    let url = "seller/findByUserId/"+userId;
    return this.http.get(url);
  }

  /**
   * 分页查询
   * @param pageNo
   * @param pageSize
   * @param condition 条件对象:Object
   */
  pageList(pageNo:number,pageSize:number,condition?:any){
     let url = "backstage/shop/findPage?pageNo="+pageNo+'&pageSize='+pageSize+'&userId='+localStorage.getItem("id");
     for(let key in condition){
       url+="&"+key+"="+condition[key];
     }
     return this.http.get(url);
  }

  /**
   * 审核
   * @param id
   * @param status
   * @param reason
   * @returns {Observable<R|T>}
   */
  audit(id:number,status:string,reason:string){
    let url='backstage/shop/audit?audit='+status+'&id='+id;
    if(reason!=''&&!isUndefined(reason)){
      url+= '&reason='+reason;
    }
    return this.http.post(url,null);
  }

  /**
   * 更改店铺状态
   * @param id
   * @param status 状态   NORMAL 正常 CLOSE_LEADER 管理员关闭 CLOSE 关闭  DELETE 删除状态
   */
  changeShopStatus(id:number,status:string){
    let url ='seller//updateStatus/'+id;
    return this.http.post(url,null);
  }
}
