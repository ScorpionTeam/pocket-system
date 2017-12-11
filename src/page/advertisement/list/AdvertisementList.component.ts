import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {DataTool} from "../../../common/data/DataTool";
import {AdvertisementService} from "../../../service/advertisement/Advertisement.service";
import {TableTool} from "../../../common/list/TableTool";
@Component({
  selector:"banner-list",
  templateUrl:"./AdvertisementList.component.html",
  providers:[AdvertisementService,TableTool]
})

export class AdvertisementListComonent{
  searchKey:string='';//关键字
  bannerList:any[]=[];//广告列表
  //分页对象
  page:any={
    pageNo:1,
    pageSize:10,
    total:0
  };
  condition:any={};
  idList:any=[];//批量操作id集合
  checkAll:boolean=false;
  constructor(private router:Router,private dataTool:DataTool,private table : TableTool,
              private route:ActivatedRoute,private nzMessage:NzMessageService,private nzModal:NzModalService,
              private advertisementService:AdvertisementService){}

  ngOnInit(){
    this.init();
  }

  /**
   * 初始化
   */
  init(){
    this.advertisementService.pageList(this.page.pageNo,this.page.pageSize,this.condition).subscribe(res=>{
      console.log(res);
      if(res["total"]!=0){
        this.bannerList = res["list"];
        this.page.total = res["total"];
      }else {
        this.bannerList = res["list"];
        this.page.total = res["total"];
      }
    },err=>{
      console.log(err);
      this.nzMessage.error("系统错误")
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
    this.condition.searchKey= this.searchKey;
    this.advertisementService.pageList(this.page.pageNo,this.page.pageSize,this.condition).subscribe(res=>{
        if(res["total"]!=0){
          this.bannerList = res["list"];
          this.page.total = res["total"];
        }else {
          this.bannerList = res["list"];
          this.page.total = res["total"];
        }
      },
      err=>{
        console.log(err);
      });
  };
  /*size改变*/
  pageSizeChangeHandler(val:any){
    this.page.pageSize=val;
    this.condition.searchKey= this.searchKey;
    this.advertisementService.pageList(this.page.pageNo,this.page.pageSize,this.condition).subscribe(res=>{
        if(res["total"]!=0){
          this.bannerList = res["list"];
          this.page.total = res["total"];
        }else {
          this.bannerList = res["list"];
          this.page.total = res["total"];
        }
      },
      err=>{
        console.log(err);
      });
  };

  /**
   * 关键字查询
   */
  search(){
    this.page.pageNo=1;
    this.condition.searchKey= this.searchKey;
    this.advertisementService.pageList(this.page.pageNo,this.page.pageSize,this.condition).subscribe(res=>{
        console.log(res);
        if(res["total"]!=0){
          this.bannerList = res["list"];
          this.page.total = res["total"];
        }else {
          this.bannerList = res["list"];
          this.page.total = res["total"];
        }
      },
      err=>{
        console.log(err);
      });
  }

  /**
   * 禁止开始时间
   * @param startValue
   * @returns {boolean}
   */
  disabledStartDate=(startValue:any)=>{
    if(!startValue||!this.condition.endDate){
      return false;
    }
    return startValue.getTime()>=this.condition.endDate.getTime();
  }
  /**
   * 禁止结束时间
   * @param endValue
   * @returns {boolean}
   */
  disabledEndDate=(endValue:any)=>{
    if(!this.condition.startDate||!endValue){
      return false
    }
    return endValue.getTime() <= this.condition.startDate.getTime();
  };

  /**
   * 选择
   * @param flag 选中标志
   * @param val 广告id
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
   * 改变广告状态
   * @param status
   */
  changeBannerStatus(status:any){
    if(this.idList.length==0){
      this.nzMessage.warning("请勾选要开启/结束的活动");
      return
    }
    this.advertisementService.changeBannerStatus({status:status,idList:this.idList}).subscribe(
      res=>{
        if(res["result"]==1){
          this.nzMessage.success("操作成功");
          this.pageChangeHandler(1);
          this.checkAll=false;
          this.idList=[];
        }
      },
      err=>{
        console.log(err);
      }
    )
  }
}
