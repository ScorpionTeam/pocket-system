import {Injectable} from "@angular/core";
import {Http} from "../common/http/Http";
@Injectable()
export class RegisterServe{
  constructor(private http:Http){}

  /**
   *注册商户
   * @param obj 商户对象
   * @returns {Observable<R|T>}
   */
  register(obj:any){
    return this.http.post("seller/registry",obj);
  }
}
