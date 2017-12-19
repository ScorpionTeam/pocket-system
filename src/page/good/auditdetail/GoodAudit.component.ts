import {Component, OnInit} from "@angular/core";
import {GoodService} from "../../../service/good/Good.service";
import {RouterTool} from "../../../common/routertool/RouterTool";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector:'good-audit',
  templateUrl:'GoodAudit.component.html',
  providers:[GoodService]
})

export class GoodAuditComponent implements OnInit{
  constructor(private goodService:GoodService,private routerTool:RouterTool,private route:ActivatedRoute){}
  ngOnInit(){}
  initUrlList:any=[];//初始化图片
  good:any={};//商品

  detail(){}
  audit(){}
  /*返回*/
  back(){
    this.routerTool.skipToPage('/../good-audit-list',this.route);
  }
}
