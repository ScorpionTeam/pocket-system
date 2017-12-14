import {OnInit, Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {RouterTool} from "../../../common/routertool/RouterTool";
import {SellerServe} from "../../../service/Seller.service";
import {DataTool} from "../../../common/data/DataTool";
@Component({
  selector:'seller-list',
  templateUrl:'SellerList.component.html',
  providers:[SellerServe]
})

export class SellerListComponent implements OnInit{
  constructor( private sellerService:SellerServe,private route:ActivatedRoute,
               private dataTool:DataTool,private routerTool:RouterTool){}
  ngOnInit(){
    this.pageChangeHandler(1);
  }
  searchKey:string;//关键字
  sellerList:any=[];//用户列表
  page:any={
    pageSize:10,
    pageNo:1,
    total:0
  };

  pageChangeHandler(val){
    this.page.pageNo=val;
    this.sellerService.pageList(this.page.pageNo,this.page.pageSize,"SELLER").subscribe(
      (res:any)=>{
        if(res.total==0){
          this.sellerList=[];
        }else {
          this.sellerList = res.list;
        }
        this.page.total = res.total;
      }
    )
  }
  pageSizeChangeHandler(val){
    this.page.pageSize=val;
    this.sellerService.pageList(this.page.pageNo,this.page.pageSize,"SELLER").subscribe(
      (res:any)=>{
        if(res.total==0){
          this.sellerList=[];
        }else {
          this.sellerList = res.list;
        }
        this.page.total = res.total;
      }
    )
  }
  search(){
    this.page.pageNo=1;
    this.sellerService.pageList(this.page.pageNo,this.page.pageSize,"SELLER").subscribe(
      (res:any)=>{
        if(res.total==0){
          this.sellerList=[];
        }else {
          this.sellerList = res.list;
        }
        this.page.total = res.total;
      }
    )
  }
  skipToPage(url:string,val:any){
    this.routerTool.skipToPage(url,this.route,val);
  }

}
