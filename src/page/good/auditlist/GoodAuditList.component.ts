import {Component, OnInit} from "@angular/core";
import {GoodService} from "../../../service/good/Good.service";
import {DataTool} from "../../../common/data/DataTool";
import {HttpData} from "../../../http/HttpData";
@Component({
  selector:"good-audit-list",
  templateUrl:"GoodAuditList.component.html",
  providers:[GoodService]
})

export class GoodAuditListComponent implements OnInit{
  constructor(private goodService:GoodService,public dataTool:DataTool,private httpData:HttpData){
    this.picUrl = this.httpData.PicUrl;
  }
  ngOnInit(){
    this.pageChangeHandler(1);
  }
  page:any={
    pageNo:1,
    pageSize:10,
    total:0
  };
  picUrl:string;//图片公共地址
  auditList:any=[];//审核列表
  condition:any={};//条件
  /*搜索*/
  search(){
    this.page.pageNo = 1;
    this.condition.pageNo = this.page.pageNo;
    this.condition.pageSize = this.page.pageSize;
    this.goodService.auditList(this.condition).subscribe(
      (res:any)=>{
        if(res.total==0){
          this.page.total=0;
          this.auditList=[];
        }else {
          this.page.total = res.total;
          this.auditList =res.list;
        }
      }
    );
  }
  /*下一页*/
  pageChangeHandler(val:number){
    this.page.pageNo = val;
    this.condition.pageNo = this.page.pageNo;
    this.condition.pageSize = this.page.pageSize;
    this.goodService.auditList(this.condition).subscribe(
      (res:any)=>{
        if(res.total==0){
          this.page.total=0;
          this.auditList=[];
        }else {
          this.page.total = res.total;
          this.auditList =res.list;
        }
      }
    )
  }
  /*每页显示条数*/
  pageSizeChangeHandler(val:number){
    this.page.pageSize = val;
    this.condition.pageNo = this.page.pageNo;
    this.condition.pageSize = this.page.pageSize;
    this.goodService.auditList(this.condition).subscribe(
      (res:any)=>{
        if(res.total==0){
          this.page.total=0;
          this.auditList=[];
        }else {
          this.page.total = res.total;
          this.auditList =res.list;
        }
      }
    )
  }
}
