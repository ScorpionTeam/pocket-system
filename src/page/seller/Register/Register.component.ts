import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, FormControl} from "@angular/forms";
import {isUndefined} from "util";
import {NzMessageService} from "ng-zorro-antd";
import {RegisterServe} from "../../../service/Register.service";
import {RouterTool} from "../../../common/routertool/RouterTool";
import {ActivatedRoute} from "@angular/router";
import {FormTool} from "../../../common/list/FormTool";
@Component({
  selector:"seller-register",
  templateUrl:"Register.component.html",
  styleUrls:["Register.component.css"],
  providers:[RegisterServe]
})

export class RegisterComponent implements OnInit{
  constructor( private fb:FormBuilder,private nzMessage:NzMessageService,private route:ActivatedRoute,
               private registerService:RegisterServe,private routerTool:RouterTool,
               private formTool:FormTool){}
  ngOnInit(){
    this.createValidate();
  }
  registerObj :any = {};//注册实体对象
  formValidate:FormGroup;//表单校验
  isNext:boolean=false;//下一步
  isAgree:boolean=false;//是否同意协议

  /**
   * 创建表单规则
   */
  createValidate(){
    this.formValidate = this.fb.group({
      name:['',[Validators.required]],
      mobile:['',[Validators.required]],
      password:['',[Validators.required]],
      passwordConfirm:['',[Validators.required]]
    },{validator:this.passwordMatcher()});
  }

  /**
   * 密码自定义校验函数
   * @returns {boolean}
   */
  passwordMatcher(){
    return (control: AbstractControl): {[key: string]: any} => {
      const pwd1 = control.get('password');
      const pwd2 = control.get('passwordConfirm');
      if(!pwd1||!pwd2){return null}
      return pwd1.value!=pwd2.value? {"notMatch":true} : null;
    };
  };

  /**
   * 上传成功
   * @param res
   * @param flag 0:正面 1:反面
   */
  uploadSuccess(res,flag){
    if(flag==0){
      this.registerObj.id_photo_front_url = res[0].url;
    }else {
      this.registerObj.id_photo_bg_url = res[0].url;
    }
  }

  /**
   * 图片删除回调
   * @param flag 0:正面 1:反面
   */
  delSuccess(flag){
    if(flag==0){
      this.registerObj.id_photo_front_url = '';
    }else {
      this.registerObj.id_photo_bg_url = '';
    }
  }

  /**
   * 下一步
   */
  next(){
    if(this.formValidate.valid){
      this.isNext=true;
    }else if(!this.isAgree){
      this.nzMessage.warning("请仔细阅读协议,并同意才可进行下一步。");
    }else {
      for (const i in this.formValidate.controls) {
        this.formValidate.controls[ i ].markAsDirty();
      }
      this.nzMessage.warning("表单填写有误");
    }
  }

  /**
   * 注册
   */
  register(){
    if(this.registerObj.id_photo_front_url==''||
      this.registerObj.id_photo_bg_url==''||
      isUndefined(this.registerObj.id_photo_front_url)||
      isUndefined(this.registerObj.id_photo_bg_url)||
      isUndefined(this.registerObj.certificateId)||
      this.registerObj.certificateId==''){
      this.nzMessage.warning("请先检查身份证号和证件照是否都填写完毕");
    }else {
      //注册部分
      this.registerService.register(this.registerObj).subscribe(
        (res:any)=>{
          console.log(res);
          if(res.result==1){
            this.nzMessage.success("注册成功,即将跳转至登录页");
            setTimeout(()=>{
              this.toLogin();
            },2000);
          }else {
            this.nzMessage.error(res.error.message);
          }
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

  /**
   * 校验
   * @param name : formControlName
   */
  check(name:string){
    return this.formTool.required(this.formValidate,name);
  }

  /**
   * 校验密码
   * @returns {boolean}
   */
  matchPwd(){
    return  this.formValidate.get("password").dirty&&
      this.formValidate.get("passwordConfirm").dirty&&
      this.formTool.formErrorCheck(this.formValidate,"notMatch");
  }


}
