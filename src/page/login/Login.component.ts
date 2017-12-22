import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,FormControl,Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {HttpData} from "../../http/HttpData";
import {NzMessageService} from "ng-zorro-antd";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector:"login",
  templateUrl:"Login.component.html",
  styleUrls:["Login.component.css"]
})

export class LoginComponent implements  OnInit{
  userName:any="15757135983";
  password:any="123456";
  isRemember:boolean = false;//是否记住账号
  validateForm :FormGroup;

  constructor(private fb:FormBuilder,private http:HttpClient,
              private nzMessage : NzMessageService,private httpData:HttpData,
              private router:Router,private route:ActivatedRoute) {

  }

  ngOnInit() {
    this.createFormValidate();
    /*查看是否本地有记住的账号*/
    this.haveAccount();
    /*检验是否已经登录*/
    this.isLogin();
  }

  /**
   * 创建校验函数
   */
  createFormValidate(){
    this.validateForm = this.fb.group({
      userName:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(6)]]
    })
  }

  /**
   * 登录
   */
  login(){
    if(this.validateForm.valid){
      let url = this.httpData.Host+'backstage/user/login?mobile='+this.userName+'&password='+this.password;
      this.http.post(url,null).subscribe((res:any)=>{
        if(res["result"]==1){
          this.rememberAccount();//记住账号
          this.router.navigate(['./index'])
          localStorage.setItem("token",res.data.token);
          localStorage.setItem("name",res.data.name);
          localStorage.setItem("mobile",res.data.mobile);
          localStorage.setItem("id",res.data.id);
          localStorage.setItem("city",res.data.city);
          localStorage.setItem("certification",res.data.certification);
          localStorage.setItem("userType",res.data.user_type);
        }else{
          this.nzMessage.error(res['error'].message)
        }
      })
    }else {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[ i ].markAsDirty();
      }
      this.nzMessage.error("请将信息填写完整")
    }
  }

  /**
   * 前往注册界面
   */
  toRegister(){
    this.router.navigate(["/register"],{relativeTo:this.route});
  }

  /*是否记住账号*/
  rememberAccount(){
    if(this.isRemember){
      localStorage.setItem("remAccount",this.userName);
    }
  }

  /*查看是否有本地记住的账号*/
  haveAccount(){
    if(localStorage.getItem("remAccount")){
      this.userName = localStorage.getItem("remAccount");
    }
  }

  /*检测是否已经登录*/
  isLogin(){
    if(localStorage.getItem("token")){
      this.router.navigate(["/index"],{relativeTo:this.route});
    }
  }
}
