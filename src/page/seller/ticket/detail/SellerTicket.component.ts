import {Component, OnInit} from "@angular/core";
import {TimePick} from "../../../../common/data/TimePick";
import {ActivatedRoute} from "@angular/router";
import {SellerServe} from "../../../../service/Seller.service";
import {NzMessageService} from "ng-zorro-antd";
import {FormGroup, FormBuilder} from "@angular/forms";
@Component({
  selector:'seller-ticket',
  templateUrl:'SellerTicket.component.html',
  providers:[SellerServe]
})

export class SellerTicketComponent implements OnInit{
  constructor(private timeTool:TimePick,private route:ActivatedRoute,private nzMessage:NzMessageService,
              private sellerService:SellerServe,private fb:FormBuilder){}
  ngOnInit(){
    this.ticketObj.seller_id = Number(localStorage.getItem("id"));//初始化优惠券商户id
   //判断是否详情
    if(this.route.params["value"].id){
      this.isDetail=true;
      this.detail();
    }
  }
  ticketObj:any={
    start_date:null,
    end_date:null
  };//优惠券对象
  isDetail:boolean=false;//是否详情页
  validateForm:FormGroup;

  /*根据id查找详情*/
  detail(){
    let id = this.route.params["value"].id;
    this.sellerService.ticketDetail(id).subscribe(
      (res:any)=>{
        if(res.result==1){
          this.ticketObj = res.data;
        }else {
          this.nzMessage.error(res.error.message);
        }
      }
    );
  }

  /**
   * 禁止开始时间
   * @param startValue
   * @returns {boolean}
   */
  disabledStartDate=(startValue:any)=>{
    return this.timeTool.disableStartTime(startValue,this.ticketObj.end_date);
  };

  /**
   * 禁止结束时间
   * @param endValue
   * @returns {boolean}
   */
  disabledEndDate=(endValue:any)=>{
    return this.timeTool.disableEndTime(endValue,this.ticketObj.start_date);
  };

  /*操作提示*/
  confirm(){

  }

  /*新增优惠券*/
  add(){
    this.ticketObj.num = Number(this.ticketObj.num);
    this.ticketObj.money = Number(this.ticketObj.money);
    this.ticketObj.reduce_money = Number(this.ticketObj.reduce_money);
    this.sellerService.addTicket(this.ticketObj).subscribe(
      (res:any)=>{
        if(res.result==1){
          this.nzMessage.success("新增成功");
        }else{
          this.nzMessage.error(res.error.message);
        }
      }
    );
  }

  /*修改优惠券*/
  modify(){
    this.ticketObj.num = Number(this.ticketObj.num);
    this.ticketObj.money = Number(this.ticketObj.money);
    this.ticketObj.reduce_money = Number(this.ticketObj.reduce_money);
    this.sellerService.modify(this.ticketObj).subscribe(
      (res:any)=>{
        if(res.result==1){
          this.nzMessage.success("新增成功");
        }else{
          this.nzMessage.error(res.error.message);
        }
      }
    );
  }
}
