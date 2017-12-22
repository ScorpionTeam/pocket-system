import {Component, OnInit} from "@angular/core";
import {GoodService} from "../../../service/good/Good.service";
import {RouterTool} from "../../../common/routertool/RouterTool";
import {ActivatedRoute} from "@angular/router";
import {CategoryService} from "../../../service/category/Category.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {DataTool} from "../../../common/data/DataTool";
import {HttpData} from "../../../http/HttpData";
import {isUndefined} from "util";
@Component({
  selector:'good-audit',
  templateUrl:'GoodAudit.component.html',
  providers:[GoodService,CategoryService]
})

export class GoodAuditComponent implements OnInit{
  constructor(private goodService:GoodService,private routerTool:RouterTool,private nzMessage:NzMessageService,
              private route:ActivatedRoute,private categoryService:CategoryService,private httpData:HttpData,
              public dataTool:DataTool){
    this.picUrl = this.httpData.PicUrl;
  }
  ngOnInit(){
    this.getCategoryList();
    this.detail();
  }
  initUrlList:any=[];//初始化图片
  picUrl:string;//图片公共地址
  good:any={};//商品
  categoryList:any=[];//类目列表
  reason:string;//审核失败原因
  isVisible:boolean=false;//模态显示

  /*获取类目列表*/
  getCategoryList(){
    this.categoryService.findRootOrChildCategory("CHILD").subscribe(
      (res:any)=>{
        if(res.total==0){
          this.categoryList=[];
        }
        this.categoryList = res.list;
      }
    );
  }
  /*获取商品详情*/
  detail(){
    this.goodService.detail(this.route.params["value"].id).subscribe(
      (res:any)=>{
        if(res.result==1){
          this.good = res.data;
          this.good.price = this.dataTool.fTransYuan(this.good.price);
          this.good.promotion = this.dataTool.fTransYuan(this.good.promotion);
          /*获取图片列表*/
          res.data.imgList.forEach((item:any)=>{
            this.initUrlList.push(item.url);
          });
        }else {
          this.nzMessage.error(res.error.message);
        }
      }
    );
  }
  /*打开审核失败模态框*/
  openModal(){
    this.isVisible = true;
  }
  /*审核*/
  audit(status:string){
    if(status=="NOT_PASS_AUDIT"&&(this.reason==''||isUndefined(this.reason))){
      this.nzMessage.warning("请填写原因");
      return;
    }
    let id= Number(this.route.params["value"].id);
    this.goodService.audit(status,id,this.reason).subscribe(
      (res:any)=>{
        if(res.result==1){
          this.nzMessage.success(res.data);
          this.isVisible=false;
        }else {
          this.nzMessage.error(res.error.message);
        }
      }
    );
  }
  /*返回*/
  back(){
    this.routerTool.skipToPage('/../good-audit-list',this.route);
  }
}
