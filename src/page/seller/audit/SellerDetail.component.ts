import {Component, OnInit} from "@angular/core";
import {UserService} from "../../../service/user/User.service";
import {ActivatedRoute} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";
import {SellerServe} from "../../../service/Seller.service";
import {RouterTool} from "../../../common/routertool/RouterTool";
@Component({
  selector:'seller-detail',
  templateUrl:'SellerDetail.component.html',
  providers:[UserService,SellerServe]
})

export class SellerDetailComponent implements OnInit{
  constructor(private userService:UserService,private route:ActivatedRoute,private routerTool:RouterTool,
              private sellService:SellerServe,private nzMessage:NzMessageService){}
  ngOnInit(){
    this.detail();
  }
  sellObj:any={};//卖家对象
  reason:string='';//原因
  isVisible:boolean=false;//模态控制

  /*查找详情*/
  detail(){
    this.userService.findById(this.route.params["value"].id).subscribe(
      (res:any)=>{
        if(res.result==1){
          this.sellObj= res.data;
        }else {
          this.nzMessage.error(res.error.message);
        }
      }
    )
  }

  /*打开模态*/
  openModal(){
    this.isVisible= true;
  }

  /*审核*/
  audit(certification:string){
    if(certification=='NOT_PASS_AUTH'&&this.reason==''){
      this.nzMessage.warning("请填写审核失败原因");
      return;
    }
    this.sellService.audit(this.route.params["value"].id,localStorage.getItem("id"),certification,this.reason).subscribe(
      (res:any)=>{
        console.log(res);
        if(res.result==1){
          this.nzMessage.success("操作成功");
          this.isVisible=false;
          this.reason='';
          this.detail();
        }else {
          this.nzMessage.error(res.error.message);
        }
      }
    );
  }

  /*返回*/
  back(){
    this.routerTool.skipToPage('/../seller-list',this.route);
  }
}
