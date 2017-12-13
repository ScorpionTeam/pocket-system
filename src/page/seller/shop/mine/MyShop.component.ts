import {Component, OnInit} from "@angular/core";
import {ShopServe} from "../../../../service/Shop.serve";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
@Component({
  selector:"my-shop",
  templateUrl:"MyShop.component.html",
  providers:[ShopServe]
})

export class MyShopComponent implements OnInit{
  constructor(private shopService:ShopServe,private fb:FormBuilder,private nzMessage:NzMessageService,
              private nzModal:NzModalService){}
  ngOnInit(){
    this.createFormValidate();
    this.detail(localStorage.getItem("id"));
  }
  shopObj:any={};//商铺对象
  validateForm:FormGroup;//校验对象
  Audit:string;//审核状态
  isAdd:boolean=false;//是否为新增操作

  /*查找详情*/
  detail(userId:any){
    this.shopService.findMyShop(userId).subscribe(
      (res:any)=>{
        if(res.result==1){
          this.isAdd=false;
          this.shopObj=res.data;
          this.Audit=res.data.audit;
        }else {
          this.Audit="None";
        }
      }
    )
  }
  /*保存*/
  save(){
    if(this.validateForm.invalid){
      this.nzMessage.warning("请将表单填写完整");
      return;
    }
    this.nzModal.confirm({
      title:"提示",
      content:"确认保存?",
      onOk:()=>{
        if(this.isAdd){
          this.add();
        }else {
          this.update();
        }
      }
    })
  }
  /*新增*/
  add(){
    this.shopObj.user_id=localStorage.getItem("id");
    this.shopService.add(this.shopObj).subscribe(
      (res:any)=>{
        if(res.result==1){
          this.nzMessage.success("新增成功");
          this.validateForm.reset();
        }else {
          this.nzMessage.warning(res.error.message);
        }
      }
    );
  }
  /*更新*/
  update(){
    this.shopObj.user_id=localStorage.getItem("id");
    this.shopService.update(this.shopObj).subscribe(
      (res:any)=>{
        if(res.result==1){
          this.nzMessage.success("修改成功");
        }else {
          this.nzMessage.warning(res.error.message);
        }
      }
    );
  }
  /*关闭*/
  close(){
    this.shopService.changeShopStatus(this.shopObj.id,"CLOSE").subscribe(
      (res:any)=>{
        if(res.result==1){
          this.nzMessage.success("关闭成功");
        }else {
          this.nzMessage.error(res.error.message);
        }
      }
    )
  }
  /*立即申请*/
  goApply(){
    if(localStorage.getItem("certification")!='IS_AUTH'){
      //Todo:提示跳转至认证页面
    }
    this.isAdd = true;
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
}