import {Component, OnInit} from "@angular/core";
import {DataTool} from "../../../../common/data/DataTool";
import {OrderService} from "../../../../service/order/Order.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";
import {RouterTool} from "../../../../common/routertool/RouterTool";
import {SellerServe} from "../../../../service/Seller.service";
@Component({
  selector:'seller-order-detail',
  templateUrl:'SellerOrderDetail.component.html',
  providers:[OrderService,SellerServe]
})

export class SellerOrderDetailComponent implements OnInit{
  constructor(private dataTool:DataTool,private orderService:OrderService,private nzMessage:NzMessageService,
              private route:ActivatedRoute,private routerTool:RouterTool,private router:Router,
              private sellerService:SellerServe){}
  ngOnInit(){
    this.detail();
    this.pageChangeHandler(1);
  }
  orderObj:any={};//订单对象
  page:any = {
    pageNo:1,
    pageSize:10,
    total:0
  };//页面对象
  orderLogList:any=[];//日志列表

  /*订单详情*/
  detail(){
    this.orderService.findById(this.route.params["value"].id).subscribe(
      (res:any)=>{
        console.log(res);
        if(res.result==1){
          this.orderObj = res.data;
        }else {
          this.nzMessage.error(res.error.message);
        }
      }
    );
  }

  /*查看商品详情*/
  toGood(id:any){
    this.router.navigate(["../../good-detail/"+id],{relativeTo:this.route});
  }

  /*分页*/
  pageChangeHandler(val:any){
    this.page.pageNo=val;
    this.orderService.pageListOrderLog(this.page.pageNo,this.page.pageSize,this.route.params["value"].id).subscribe(res=>{
      if(res["total"]!=0){
        this.orderLogList = res["list"];
        this.page.total = res["total"];
      }else {
        this.orderLogList = res["list"];
        this.page.total = res["total"];
      }
    });
  };
  /*size改变*/
  pageSizeChangeHandler(val:any){
    this.page.pageSize=val;
    this.orderService.pageListOrderLog(this.page.pageNo,this.page.pageSize,this.route.params["value"].id).subscribe(res=>{
      if(res["total"]!=0){
        this.orderLogList = res["list"];
        this.page.total = res["total"];
      }else {
        this.orderLogList = res["list"];
        this.page.total = res["total"];
      }
    });
  };

  /*修改订单*/
  modify(){
    this.sellerService.modifyOrder(this.orderObj).subscribe(
      (res:any)=>{
        if(res.result==1){
          this.nzMessage.success("修改成功");
        }
      }
    );
  }

  /*返回*/
  back(){
    this.router.navigate(["../../seller-order-list"],{relativeTo:this.route});
  }
}
