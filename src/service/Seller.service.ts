import {Injectable} from "@angular/core";
import {Http} from "../common/http/Http";
@Injectable()
export class SellerServe{
  constructor(private http:Http){}

  /**
   * 根据用户类型分页查询用户列表
   * @param pageNo
   * @param pageSize
   * @param userType
   * @returns {Observable<R|T>}
   */
  pageList(pageNo:number,pageSize:number,userType:string){
    let url = 'backstage/user/userList?pageNo='+pageNo+'&pageSize='+pageSize+'&userType='+userType;
    return this.http.get(url);
  }
}
