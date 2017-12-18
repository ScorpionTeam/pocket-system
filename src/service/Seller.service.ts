import {Injectable} from "@angular/core";
import {Http} from "../common/http/Http";
@Injectable()
export class SellerServe{
  constructor(private http:Http){}

  //用户模块
  /**
   * 根据用户类型分页查询用户列表
   * @param pageNo
   * @param pageSize
   * @param userType
   * @returns {Observable<R|T>}
   */
  pageList(pageNo:number,pageSize:number,userType:string,condition?:any){
    let url = 'backstage/user/userList?pageNo='+pageNo+'&pageSize='+pageSize+'&userType='+userType;
    for(let key in condition){
      url+= '&'+ key +'='+condition[key];
    }
    return this.http.get(url);
  }

  /**
   * 审核
   * @param sellerId
   * @param operateId
   * @param certification NOT_AUTH 未实名认证, IS_AUTH 认证通过， NOT_PASS_AUTH 认证未通过
   * @param reason
   * @returns {Observable<R|T>}
   */
  audit(sellerId:any,operateId:any,certification:string,reason?:string){
    let url = 'backstage/user/auditSeller?sellerId='+sellerId+'&operateId='+operateId+'&certification='+certification;
    if(reason&&reason!=''){
      url+= "&reason="+reason;
    }
    return this.http.post(url,null);
  }

  /**
   * 修改个人信息
   * @param selfObj
   * @returns {any}
   */
  modify(selfObj:any){
    let url ='store/alter';
    return this.http.post(url,selfObj);
  }

  /*提交认证*/
  submitCertificate(obj:any){
    let url = 'store/reauth';
    return this.http.post(url,obj);
  }



  //订单模块
  /*根据用户ID查询订单列表*/
  orderPageList(condition:any){
    let url = 'seller/order/findByCondition';
    return this.http.post(url,condition);
  }

  /*退款*/
  refund(orderId:any,flag:any,remark:string,refundFee?:number){
    let url = 'seller/order/refund?orderId='+orderId+'&flag='+flag+'&remark='+remark;
    if(refundFee){
      url+='&refundFee='+refundFee;
    }
    return this.http.post(url,null);
  }

  /*发货*/
  sendGood(orderId:any,deliveryNo:string,expressName:string,senderId:any){
    let url = "seller/order/sendGood?orderId="+orderId+"&deliveryNo="+deliveryNo+"&expressName="+expressName+
      "&senderId="+senderId;
    return this.http.post(url,null);
  }

  /*修改订单*/
  modifyOrder(orderObj:any){
    let url ='seller/order/modify';
    return this.http.post(url,orderObj);
  }

  //优惠券模块
  /*优惠券列表*/
  sellerTicketPageList(pageNo:number,pageSize:number,condition?:any){
    let url = 'seller/ticket/findAll?pageNo='+pageNo+'&pageSize='+pageSize;
    for(let key in condition){
      url+= '&'+key + '='+condition[key];
    }
    return this.http.get(url);
  }

  /*删除优惠券根据ID*/
  ticketOver(id:number){
    let url = 'seller/ticket/deleteById/'+id;
    return this.http.post(url,null);
  }

  /*新增优惠券*/
  addTicket(ticket:any){
    let url='seller/ticket/add';
    return this.http.post(url,ticket);
  }

  /*修改优惠券*/
  modifyTicket(ticket:any){
    let url='seller/ticket/modify';
    return this.http.post(url,ticket);
  }

  /*优惠券详情*/
  ticketDetail(id:any){
    let url='seller/ticket/findById/'+id;
    return this.http.get(url);
  }

//  商品模块
  goodPageList(pageNo:number,pageSize:number,condition:any){
    let goodObj:any = Object.assign({},condition);
    goodObj.pageNo= pageNo;
    goodObj.pageSize = pageSize;
    let url = 'seller/good/findByCondition';
    return this.http.post(url,condition);
  }
}
