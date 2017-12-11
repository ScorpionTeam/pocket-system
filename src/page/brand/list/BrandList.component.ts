import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {HttpData} from "../../../http/HttpData";
import {DataTool} from "../../../common/data/DataTool";
import {BrandService} from "../../../service/brand/Brand.service";
import {TimePick} from "../../../common/data/TimePick";
import {TableTool} from "../../../common/list/TableTool";
@Component({
  selector:"brand-list",
  templateUrl:"./BrandList.component.html",
  styleUrls:["./BrandList.component.css"],
  providers:[BrandService,TableTool]
})

export class BrandListComponent{
  picUrl:string;
  searchKey:string='';//关键字
  brandList:any[]=[];//订单列表
  isCollapse:boolean=false;
  idList:any=[];//批量操作id集合
  checkAll:boolean=false;//全选标志
  //分页对象
  page:any={
    pageNo:1,
    pageSize:10,
    total:0
  };
  condition:any={};
  constructor(private router:Router,private PicUrl:HttpData,private timePickerTool:TimePick,private table:TableTool,
              private route:ActivatedRoute,private nzMessage:NzMessageService,private brandService:BrandService,
              private dataTool:DataTool,private nzModal:NzModalService){}

  ngOnInit(){
    this.picUrl = this.PicUrl.PicUrl;
    this.init();
  }

  /**
   * 初始化
   */
  init(){
    this.brandService.pageList(this.page.pageNo,this.page.pageSize,this.condition).subscribe(res=>{
      console.log(res);
      if(res["total"]!=0){
        this.brandList = res["list"];
        this.page.total = res["total"];
      }else {
        this.brandList = res["list"];
        this.page.total = res["total"];
      }
    })
  }
  /**
   * 页面跳转
   * @param name
   * @param val
   */
  skipToPage(name:string,val?:any){
    if(val){
      this.router.navigate([".."+name,val],{relativeTo:this.route});
    }else{
      this.router.navigate([".."+name],{relativeTo:this.route});
    }
  }

  /*分页*/
  pageChangeHandler(val:any){
    this.page.pageNo=val;
    this.condition.searchKey=this.searchKey;
    this.brandService.pageList(this.page.pageNo,this.page.pageSize,this.condition).subscribe(res=>{
        if(res["total"]!=0){
          this.brandList = res["list"];
          this.page.total = res["total"];
        }else {
          this.brandList = res["list"];
          this.page.total = res["total"];
        }
        this.checkAll=false;
        this.idList=[];
      });
  };
  /*size改变*/
  pageSizeChangeHandler(val:any){
    this.page.pageSize=val;
    this.condition.searchKey=this.searchKey;
    this.brandService.pageList(this.page.pageNo,this.page.pageSize,this.condition).subscribe(res=>{
        if(res["total"]!=0){
          this.brandList = res["list"];
          this.page.total = res["total"];
        }else {
          this.brandList = res["list"];
          this.page.total = res["total"];
        }
        this.checkAll=false;
        this.idList=[];
      });
  };

  /**
   * 关键字查询
   */
  search(){
    this.page.pageNo=1;
    this.condition.searchKey=this.searchKey;
    this.brandService.pageList(this.page.pageNo,this.page.pageSize,this.condition).subscribe(res=>{
        console.log(res);
        if(res["total"]!=0){
          this.brandList = res["list"];
          this.page.total = res["total"];
        }else {
          this.brandList = res["list"];
          this.page.total = res["total"];
        }
        this.checkAll=false;
        this.idList=[];
      });
  }

  /**
   * 禁止开始时间
   * @param startValue
   * @returns {boolean}
   */
  disabledStartDate=(startValue:any)=>{
   return this.timePickerTool.disableStartTime(startValue,this.condition.endDate);

  }
  /**
   * 禁止结束时间
   * @param endValue
   * @returns {boolean}
   */
  disabledEndDate=(endValue:any)=>{
    return this.timePickerTool.disableStartTime(endValue,this.condition.endDate);
  };

  /**
   * 选择
   * @param flag 选中标志
   * @param val id
   * @param type 类型 0:全选，1:单选
   */
  selectItem(flag:boolean,type:number,idList:any[],dataList:any[],val?:any,index?:any){
    if(type==0){
      this.table.selectItem(flag,type,idList,dataList);
    }else {
      this.checkAll = this.table.selectItem(flag,type,idList,dataList,val);
    }
  }

  /**
   * 批量上架
   */
  inStore(){
    if(this.idList.length==0){
      this.nzMessage.warning("请先勾选要上架的品牌");
      return
    }
    this.brandService.changeBrandStatus({status:'ENTER',idList:this.idList}).subscribe(
      res=>{
        if(res["result"]==1){
          this.nzMessage.success("上架成功");
          this.pageChangeHandler(1);
          this.idList = [];
        }
      },
      err=>{
        console.log(err);
      }
    )
  }

  /**
   * 批量下架
   */
  outStore(){
    if(this.idList.length==0){
      this.nzMessage.warning("请先勾选要下架的品牌");
      return
    }
    this.brandService.changeBrandStatus({status:'QUIT',idList:this.idList}).subscribe(
      res=>{
        if(res["result"]==1){
          this.nzMessage.success("下架成功");
          this.pageChangeHandler(1);
          this.idList = [];
        }
      },
      err=>{
        console.log(err);
      }
    )
  }
}
