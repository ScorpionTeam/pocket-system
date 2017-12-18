import {OnInit, Component} from "@angular/core";
import {TimePick} from "../../../../common/data/TimePick";
import {RouterTool} from "../../../../common/routertool/RouterTool";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector:'seller-good-list',
  templateUrl:'SellerGoodList.component.html'
})

export class SellerGoodListComponent implements OnInit{
  constructor(private timeTool:TimePick,private routerTool:RouterTool,private route:ActivatedRoute){}
  ngOnInit(){}
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


}
