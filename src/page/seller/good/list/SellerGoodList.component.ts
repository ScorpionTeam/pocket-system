import {OnInit, Component} from "@angular/core";
import {TimePick} from "../../../../common/data/TimePick";
import {RouterTool} from "../../../../common/routertool/RouterTool";
import {ActivatedRoute} from "@angular/router";
import {HttpData} from "../../../../http/HttpData";
import {DataTool} from "../../../../common/data/DataTool";
import {SellerServe} from "../../../../service/Seller.service";
@Component({
  selector:'seller-good-list',
  templateUrl:'SellerGoodList.component.html',
  providers:[SellerServe]
})

export class SellerGoodListComponent implements OnInit{
  constructor(private timeTool:TimePick,private routerTool:RouterTool,private httpData:HttpData,
              private route:ActivatedRoute,private dataTool:DataTool,private sellerService:SellerServe){}
  ngOnInit(){
    this.picUrl = this.httpData.PicUrl;
    this.condition.seller_id = Number(localStorage.getItem('id'));
    this.pageChangeHandler(1);
  }
  goodList:any=[];//商品列表
  condition:any={
    startDate:null,
    endDate:null
  };//条件
  page:any={
    pageNo:1,
    pageSize:10,
    total:0
  };
  isCollapse:boolean=false;
  picUrl:string;//图片公共地址

  /*开始时间限制*/
  disabledStartDate=(startValue:any)=>{
    return this.timeTool.disableStartTime(startValue,this.condition.endDate);
  }

  /*结束时间限制*/
  disabledEndDate=(endValue:any)=>{
    return this.timeTool.disableEndTime(endValue,this.condition.endDate);
  }

  /*页面跳转*/
  skipToPage(url:string,val?:any){
    this.routerTool.skipToPage(url,this.route,val);
  }

  /*关键字搜索*/
  search(){
    this.page.pageNo=1;
    this.sellerService.goodPageList(this.page.pageNo,this.page.pageSize,this.condition).subscribe(
      (res:any)=>{
        if(res.total==0){
          this.goodList = [];
          this.page.total = 0;
        }else {
          this.goodList = res.list;
          this.page.total = res.total;
        }
      }
    );
  }
  /*下一页*/
  pageChangeHandler(val:number){
    this.page.pageNo=val;
    this.sellerService.goodPageList(this.page.pageNo,this.page.pageSize,this.condition).subscribe(
      (res:any)=>{
        if(res.total==0){
          this.goodList = [];
          this.page.total = 0;
        }else {
          this.goodList = res.list;
          this.page.total = res.total;
        }
      }
    );
  }
  /*每页显示条数*/
  pageSizeChangeHandler(val:number){
    this.page.pageSize=val;
    this.sellerService.goodPageList(this.page.pageNo,this.page.pageSize,this.condition).subscribe(
      (res:any)=>{
        if(res.total==0){
          this.goodList = [];
          this.page.total = 0;
        }else {
          this.goodList = res.list;
          this.page.total = res.total;
        }
      }
    );
  }

}
