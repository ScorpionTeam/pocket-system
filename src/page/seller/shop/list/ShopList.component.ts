/**
 * Created by admin1 on 2017/12/13.
 */
import {Component, OnInit} from "@angular/core";
import {ShopServe} from "../../../../service/Shop.serve";
import {NzMessageService} from "ng-zorro-antd";
import {RouterTool} from "../../../../common/routertool/RouterTool";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector:"shop-list",
  templateUrl:"ShopList.component.html",
  providers:[ShopServe]
})

export class ShopListComponent implements OnInit{
  constructor( private shopService : ShopServe,private nzMessage:NzMessageService,
               private route:ActivatedRoute,private routeTool:RouterTool){}
  ngOnInit(){
    this.pageChangeHandler(1);
  }
  condition:any={
    audit:"AUDITING"
  };//条件
  page:any={
    pageNo:1,
    pageSize:10,
    total:0
  };
  isOpen:boolean=false;//Select框控制
  shopList:any=[];//商铺列表

  /**
   * 模糊搜索
   */
  search(){
    this.page.pageNo=1;
    this.shopService.pageList(this.page.pageNo,this.page.pageSize,this.condition).subscribe(
      (res:any)=>{
        this.shopList= res.list;
      }
    )
  }

  /**
   * 改变页码
   * @param val
   */
  pageChangeHandler(val){
    this.page.pageNo = val;
    this.shopService.pageList(this.page.pageNo,this.page.pageSize,this.condition).subscribe(
      (res:any)=>{
        this.shopList= res.list;
      }
    )
  }

  /**
   * 改变每页条数
   * @param val
   */
  pageSizeChangeHandler(val){
    this.page.pageSize = val;
    this.shopService.pageList(this.page.pageNo,this.page.pageSize,this.condition).subscribe(
      res=>{
        this.shopList= res['list'];
      }
    )
  }

  /**
   * 改变审核状态
   */
  changeAuditStatus(){
    this.isOpen = !this.isOpen;
    if(!this.isOpen){
      this.search();
    }
  }

  skipToPage(url:string,val?:any){
    this.routeTool.skipToPage(url,this.route,val);
  }

}
