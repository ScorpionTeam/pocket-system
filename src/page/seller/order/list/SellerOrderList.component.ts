import {Component, OnInit} from "@angular/core";
import {OrderService} from "../../../../service/order/Order.service";
import {Router, ActivatedRoute} from "@angular/router";
import {HttpData} from "../../../../http/HttpData";
import {NzModalService, NzMessageService} from "ng-zorro-antd";
import {TimePick} from "../../../../common/data/TimePick";
import {DataTool} from "../../../../common/data/DataTool";
import {SellerServe} from "../../../../service/Seller.service";
import {isUndefined} from "util";
@Component({
  selector:'seller-order-list',
  templateUrl:'SellerOrderList.component.html',
  providers:[OrderService,SellerServe]
})

export class SellerOrderListComponent implements OnInit{
  constructor( private orderService:OrderService,private router:Router,private PicUrl:HttpData,
               private route:ActivatedRoute,private nzMessage:NzMessageService,private nzModal:NzModalService,
               private  dataTool:DataTool,private timePickTool:TimePick,private sellerService:SellerServe){}
  ngOnInit(){}
  condition:any = {};//条件
  orderList:any=[];//订单列表
  page:any={
    pageNo:1,
    pageSize:10,
    total:0
  };//分页对象
  deliveryObj:any={};//快递对象
  isCollapse:boolean = false;//折叠面板
  isDeliveryShow:boolean=false;//快递面板
  failRemark:string='';//拒绝退款原因
  returnMoney:number;//退款金额

  /**
   * 页面跳转
   * @param name
   * @param val
   */
  skipToPage(name:string,val?:any){
    if(val){
      this.router.navigate([".."+name,val],{relativeTo:this.route});
    }else{
      this.router.navigate([".."+name],{relativeTo:this.route});
    }
  }

  /*分页*/
  pageChangeHandler(val:any){
    this.page.pageNo=val;
      this.sellerService.orderPageList(this.page.pageNo,this.page.pageSize,localStorage.getItem("id"),this.condition).subscribe(res=>{
      if(res["total"]!=0){
        this.orderList = res["list"];
        this.page.total = res["total"];
      }else {
        this.orderList = res["list"];
        this.page.total = res["total"];
      }
    });
  };
  /*size改变*/
  pageSizeChangeHandler(val:any){
    this.page.pageSize=val;
    this.sellerService.orderPageList(this.page.pageNo,this.page.pageSize,localStorage.getItem("id"),this.condition).subscribe(res=>{
      if(res["total"]!=0){
        this.orderList = res["list"];
        this.page.total = res["total"];
      }else {
        this.orderList = res["list"];
        this.page.total = res["total"];
      }
    });
  };

  /**
   * 关键字查询
   */
  search(){
    this.page.pageNo=1;
    this.sellerService.orderPageList(this.page.pageNo,this.page.pageSize,localStorage.getItem("id"),this.condition).subscribe(res=>{
      console.log(res);
      if(res["total"]!=0){
        this.orderList = res["list"];
        this.page.total = res["total"];
      }else {
        this.orderList = res["list"];
        this.page.total = res["total"];
      }
    })
  }

  /**
   * 禁止开始时间
   * @param startValue
   * @returns {boolean}
   */
  disabledStartDate=(startValue:any)=>{
    return this.timePickTool.disableStartTime(startValue,this.condition.endDate);
  };
  /**
   * 禁止结束时间
   * @param endValue
   * @returns {boolean}
   */
  disabledEndDate=(endValue:any)=>{
    return this.timePickTool.disableEndTime(endValue,this.condition.startDate);
  };

  /**
   *
   * @param id 订单id
   * @param content 内容
   * @param totalFee
   * @param title
   */
  returnMoneySuccessConfirm(id:any,content:any,totalFee:any,title:any){
    this.nzModal.confirm({
      title:title,
      content:content,
      iconType:"waring",
      maskClosable:false,
      onOk:()=>{
        this.returnMoneySuccess(id,totalFee);
      }
    })
  }
  returnMoneySuccess(id:any,totalFee:any){
    if(this.returnMoney>totalFee){
      this.nzMessage.error("退款金额无法大于订单总额");
      return;
    }
    this.orderService.areggReturnMoney(id,this.returnMoney).subscribe(
      res=>{
        console.log(res)
        if(res["result"]==1){
          this.returnMoney=0;
          this.pageChangeHandler(1);
        }
      }
    )
  }
  returnMoneyFailConfirm(id:any,content:any){
    let fail =  this.nzModal.confirm({
      title:"操作提示",
      content:content,
      iconType:"waring",
      maskClosable:false,
      onOk:()=>{
        this.returnMoneyFail(id);
      }
    });
  }
  returnMoneyFail(id:any){
    console.log(this.failRemark);
    this.orderService.aginstReturnMoney(id,this.failRemark).subscribe(
      res=>{
        console.log(res);
        if(res["result"]==1){
          this.failRemark='';
        }
      }
    )
  }

  /**
   * 打开模态
   * @param orderId
   */
  openDeliveyModal(orderId:any){
    this.deliveryObj.orderId = orderId;
    this.isDeliveryShow=!this.isDeliveryShow;
  }
  /**
   * 发货
   * @param orderId
   */
  sendGoood(orderId:any){
    if(isUndefined(this.deliveryObj['expressName'])||isUndefined(this.deliveryObj['deliveryNo'])){
      this.nzMessage.warning("请将表单填写完整");
      return;
    }
    this.orderService.sendGood(this.deliveryObj.orderId,this.deliveryObj.deliveryNo,this.deliveryObj.expressName).subscribe(
      res=>{
        if(res["result"]==1){
          this.pageChangeHandler(1);
          this.deliveryObj={};
          this.isDeliveryShow=!this.isDeliveryShow;
        }else {
          this.nzMessage.warning(res["error"].message);
        }
      }
    )
  }

}
