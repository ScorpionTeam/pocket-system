import {Component, OnInit} from "@angular/core";
import {ShopServe} from "../../../../service/Shop.serve";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {NzModalService, NzMessageService} from "ng-zorro-antd";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector:"shop",
  templateUrl:"Shop.component.html",
  providers:[ShopServe]
})

export class ShopComponent implements OnInit{
  constructor( private shopService:ShopServe,private fb:FormBuilder,private nzMessage:NzMessageService,
               private route:ActivatedRoute,private nzModal:NzModalService){}
  ngOnInit(){
    this.createFormValidate();
    this.detail(this.route.params["value"].id);
  }
  shopObj:any={};//商铺对象
  validateForm:FormGroup;//校验对象
  Audit:string;//审核状态
  reason:string='';//审核原因

  /*查找详情*/
  detail(userId:any){
    this.shopService.findMyShop(userId).subscribe(
      (res:any)=>{
        if(res.result==1){
          this.shopObj=res.data;
          this.Audit=res.data.audit;
        }else {
          this.nzMessage.error(res.error.message);
          this.Audit="None";
        }
      }
    )
  }
  /*创建表单*/
  createFormValidate(){
    this.validateForm = this.fb.group({
      name:["",[Validators.required]],
      mobile:["",[Validators.required]],
      address:["",[Validators.required]],
      description:["",[Validators.required]]
    })
  }
  /**
   *审核
   * @param status 审核状态
   */
  audit(status:string){
    this.shopService.audit(this.shopObj.id,status,this.reason).subscribe(
      (res:any)=>{
        if(res.result==1){
          this.nzMessage.success("审核成功");
        }else {
          this.nzMessage.error(res.error.message);
        }
      }
    );
  }

  /*关闭*/
  close(){
    this.shopService.changeShopStatus(this.shopObj.id,'CLOSE_LEADER').subscribe(
      (res:any)=>{
        if(res.result==1){
          this.nzMessage.success("关闭成功");
        }else {
          this.nzMessage.error(res.error.message);
        }
      }
    )
  }

}