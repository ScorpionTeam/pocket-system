import {Component, OnInit} from "@angular/core";
import {DataTool} from "../../../../common/data/DataTool";
import {OrderService} from "../../../../service/order/Order.service";
import {ActivatedRoute} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";
import {RouterTool} from "../../../../common/routertool/RouterTool";
@Component({
  selector:'seller-order-detail',
  templateUrl:'SellerOrderDetail.component.html',
  providers:[OrderService]
})

export class SellerOrderDetailComponent implements OnInit{
  constructor(private dataTool:DataTool,private orderService:OrderService,private nzMessage:NzMessageService,
              private route:ActivatedRoute,private routerTool:RouterTool){}
  ngOnInit(){
    this.detail();
  }
  orderObj:any={};//订单对象

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
    this.routerTool.skipToPage('/good-detail',id);
  }
}
