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
               public dataTool:DataTool,private routerTool:RouterTool){}
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
  condition:any={};//条件对象
  isOpen:boolean=true;//是否打开

  /**
   * 分页
   * @param val
   */
  pageChangeHandler(val){
    this.page.pageNo=val;
    this.sellerService.pageList(this.page.pageNo,this.page.pageSize,"SELLER",this.condition).subscribe(
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

  /**
   * 页面条数变化
   * @param val
   */
  pageSizeChangeHandler(val){
    this.page.pageSize=val;
    this.sellerService.pageList(this.page.pageNo,this.page.pageSize,"SELLER",this.condition).subscribe(
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

  /*模糊查询*/
  search(){
    this.page.pageNo=1;
    this.sellerService.pageList(this.page.pageNo,this.page.pageSize,"SELLER",this.condition).subscribe(
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
  /*跳转*/
  skipToPage(url:string,val:any){
    this.routerTool.skipToPage(url,this.route,val);
  }

  /*改变认证状态*/
  changeAuditStatus(){
    this.isOpen = !this.isOpen;
    if(this.isOpen){
      this.search();
    }
  }
}
