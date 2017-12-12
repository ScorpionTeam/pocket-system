import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {isUndefined} from "util";
import {NzMessageService} from "ng-zorro-antd";
import {RegisterServe} from "../../../service/Register.serve";
import {RouterTool} from "../../../common/routertool/RouterTool";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector:"seller-register",
  templateUrl:"Register.component.html",
  styleUrls:["Register.component.css"],
  providers:[RegisterServe]
})

export class RegisterComponent implements OnInit{
  constructor( private fb:FormBuilder,private nzMessage:NzMessageService,private route:ActivatedRoute,
               private registerService:RegisterServe,private routerTool:RouterTool){}
  ngOnInit(){
    this.createValidate();
  }
  registerObj :any = {};//注册实体对象
  formValidate:FormGroup;//表单校验
  isNext:boolean=false;//下一步

  /**
   * 创建表单规则
   */
  createValidate(){
    this.formValidate = this.fb.group({
      name:['',[Validators.required]],
      mobile:['',[Validators.required]],
      password:['',[Validators.required]],
      passwordConfirm:['',[Validators.required]]
    });
  }

  /**
   * 上传成功
   * @param res
   * @param flag 0:正面 1:反面
   */
  uploadSuccess(res,flag){
    console.log(res)
    if(flag==0){
      this.registerObj.idPhotoFrontUrl = res[0].url;
    }else {
      this.registerObj.idPhotoBgUrl = res[0].url;
    }
  }

  /**
   * 图片删除回调
   * @param flag 0:正面 1:反面
   */
  delSuccess(flag){
    if(flag==0){
      this.registerObj.idPhotoFrontUrl = '';
    }else {
      this.registerObj.idPhotoBgUrl = '';
    }
  }

  /**
   * 下一步
   */
  next(){
    if(this.formValidate.valid){
      this.isNext=true;
    }else {
      //todo:提示表单有误
      console.log("表单填写有误");
    }
  }

  /**
   * 注册
   */
  register(){
    if(this.registerObj.idPhotoFrontUrl==''||this.registerObj.idPhotoBgUrl==''||isUndefined(this.registerObj.idPhotoFrontUrl)||
      isUndefined(this.registerObj.idPhotoBgUrl)){
      this.nzMessage.warning("请先上传图片");
    }else {
      this.registerService.register(this.registerObj).subscribe(
        res=>{
          console.log(res);
          this.nzMessage.success("注册成功,即将跳转至登录页");
          setTimeout(()=>{
            this.toLogin();
          },2000);
        }
      )
    }
  }

  /**
   * 跳转至登录
   */
  toLogin(){
   this.routerTool.skipToPage("/login",this.route);
  }
}
