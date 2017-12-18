import {Component, OnInit} from "@angular/core";
import {SellerServe} from "../../../../service/Seller.service";
import {DataTool} from "../../../../common/data/DataTool";
import {ActivatedRoute} from "@angular/router";
import {RouterTool} from "../../../../common/routertool/RouterTool";
@Component({
  selector:'seller-ticket-list',
  templateUrl:'SellerTicketList.component.html',
  providers:[SellerServe]
})

export class SellerTicketListComponent implements OnInit{
  constructor(private sellerService:SellerServe,private dataTool:DataTool,
              private routerTool:RouterTool,private route:ActivatedRoute){}
  ngOnInit(){
    this.pageChangeHandler(1);
  }
  condition:any={};//条件
  ticketList:any=[];//优惠券列表
  page:any={
    pageNo:1,
    pageSize:10,
    total:0
  };

  /*搜索*/
  search(){
    this.page.pageNo=1;
    this.sellerService.sellerTicketPageList(this.page.pageNo,this.page.pageSize,this.condition).subscribe(
      (res:any)=>{
        this.ticketList = res.list;
        this.page.total=res.total;
      }
    );
  }
  /*下一页*/
  pageChangeHandler(val){
    this.page.pageNo=val;
    this.sellerService.sellerTicketPageList(this.page.pageNo,this.page.pageSize,this.condition).subscribe(
      (res:any)=>{
        this.ticketList = res.list;
        this.page.total=res.total;
      }
    );
  }
  /*表格显示条数变化*/
  pageSizeChangeHandler(val){
    this.page.pageSize=val;
    this.sellerService.sellerTicketPageList(this.page.pageNo,this.page.pageSize,this.condition).subscribe(
      (res:any)=>{
        this.ticketList = res.list;
        this.page.total=res.total;
      }
    );
  }

  /*路由跳转*/
  skipToPage(url:string,val?:any){
   this.routerTool.skipToPage(url,this.route,val);
  }

}
