import {Injectable} from "@angular/core";
import {Http} from "../common/http/Http";
@Injectable()
export class SellerServe{
  constructor(private http:Http){}

  pageList(pageNo:number,pageSize:number,userType:string){
    let url = 'backstage/user/userList?pageNo='+pageNo+'&pageSize='+pageSize+'&userType='+userType;
    return this.http.get(url);
  }
}
