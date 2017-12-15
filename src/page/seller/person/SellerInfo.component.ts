import {Component, OnInit} from "@angular/core";
import {UserService} from "../../../service/user/User.service";
import {NzMessageService} from "ng-zorro-antd";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {SellerServe} from "../../../service/Seller.service";
import {HttpData} from "../../../http/HttpData";
@Component({
  selector:"seller-info",
  templateUrl:"SellerInfo.component.html",
  styles:[`
    .seller_status{
      font-size: 16px;
      padding:5px;
      margin-bottom:10px;
    }
    .seller_status span:first-child{
        display: inline-block;
        font-weight: 600;
        text-align: right;
    }
    .seller_status span:last-child{
        display: inline-block;
        text-align: left;
    }
  `],
  providers:[UserService,SellerServe]
})

export class SellerInfoComponent implements OnInit{
  constructor(private userService:UserService,private sellerService:SellerServe,
              private nzMessage:NzMessageService,private fb:FormBuilder,private httpData:HttpData){}
  ngOnInit(){
    this.createValidate();
    this.detail();
    this.picPubUrl = this.httpData.PicUrl;
  }
  selfObj:any={
    born_date:null
  };//个人信息
  validateForm:FormGroup;
  picPubUrl:string;

  /*详情*/
  detail(){
    this.userService.findById(localStorage.getItem("id")).subscribe(
      (res:any)=>{
        if(res.result==1){
          this.selfObj = res.data;
        }else{
          this.nzMessage.error(res.error.message);
        }
      }
    );
  }

  /*建立表单校验*/
  createValidate(){
    this.validateForm = this.fb.group({
      email:["",Validators.required],
      mobile:["",Validators.required],
      address:["",Validators.required],
      nickName:["",Validators.required],
      born:''
    });
  }

  /*判断认证状态*/
  justifyStatus(certification:string){
    if(certification=='NOT_AUTH '){
      return "未实名认证";
    }else if(certification=='IS_AUTH'){
      return "认证通过";
    }else if(certification=='AUDITING'){
      return"审核中";
    }else{
      return "认证未通过";
    }
  }

  /*图片上传成功回调*/
  uploadSuccess(res:any,targetKey:any){
    console.log(res);
    this.selfObj[targetKey] = res[0].url;
    console.log(this.selfObj);
  }

  /*图片删除成功回调*/
  deleteSuccess(targetKey:any){
    this.selfObj[targetKey] = '';
    console.log(this.selfObj);
  }

  /*初始化图片地址*/
  initPicUrl(url:string){
    let initUrl = url;
    return initUrl;
  }

  /*修改*/
  modify(){
    this.sellerService.modify(this.selfObj).subscribe(
      (res:any)=>{
        if(res.result==1){
          this.nzMessage.success("修改成功");
        }else{
          this.nzMessage.error(res.error.message);
        }
      }
    )
  }
}
