import {OnInit, Component} from "@angular/core";
import {TimePick} from "../../../../common/data/TimePick";
import {RouterTool} from "../../../../common/routertool/RouterTool";
import {ActivatedRoute} from "@angular/router";
import {HttpData} from "../../../../http/HttpData";
import {DataTool} from "../../../../common/data/DataTool";
import {SellerServe} from "../../../../service/Seller.service";
import {NzMessageService} from "ng-zorro-antd";
import {TableTool} from "../../../../common/list/TableTool";
@Component({
  selector:'seller-good-list',
  templateUrl:'SellerGoodList.component.html',
  providers:[SellerServe]
})

export class SellerGoodListComponent implements OnInit{
  constructor(private timeTool:TimePick,private routerTool:RouterTool,private httpData:HttpData,
              private route:ActivatedRoute,private dataTool:DataTool,private sellerService:SellerServe,
              private nzMessage:NzMessageService,private tableTool:TableTool){}
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
  checkAll:boolean=false;//复选框全选
  isCollapse:boolean=false;
  picUrl:string;//图片公共地址
  idList:any=[];//选中商品id集合

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

  /*批量上下架商品*/
  batchGoodDown(status:string){
    let obj:any ={};
    obj.saleStatus	 = status;
    obj.goodsIdList = this.idList;
    this.sellerService.batchModifyGoodStatus(obj).subscribe(
      (res:any)=>{
        if(res.result==1){
          this.nzMessage.success("操作完成");
          this.pageChangeHandler(1);
        }else {
          this.nzMessage.error(res.error.message);
        }
      }
    );
  }

  /*复选框函数
   * @param flag:Boolean  选中标志,
   * @param val id或dataList
   * @param type 0:全选，1:单选
   * @param idList 定义用来存id的数组
   * @param dataList 列表数据
   * @param index
   * @returns {boolean}
   */
  selectItem(flag:boolean,type:number,dataList:any,idList:any,id?:number,index?:any){
    if(type==0){
      this.tableTool.selectItem(flag,type,dataList,idList);
    }else {
     this.checkAll = this.tableTool.selectItem(flag,type,dataList,idList,id);
    }
  }

}
