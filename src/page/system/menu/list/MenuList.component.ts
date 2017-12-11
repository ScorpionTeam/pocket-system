import {Component, OnInit} from "@angular/core";
import {Http} from "../../../../common/http/Http";
import {Router, ActivatedRoute} from "@angular/router";
import {RouterTool} from "../../../../common/routertool/RouterTool";
import {DataTool} from "../../../../common/data/DataTool";
import {MenuService} from "../../../../service/menu/Menu.service";
import {NzMessageService} from "ng-zorro-antd";
import {TableTool} from "../../../../common/list/TableTool";
@Component({
  selector:"menu-list",
  templateUrl:"MenuList.component.html",
  providers:[MenuService,TableTool]
})

export class MenuListComponent implements OnInit{
  menuList:any=[];
  page:any={
    pageNo:1,
    pageSize:10,
    total:0
  };
  idList:any=[];
  checkAll:boolean=false;
  searchKey:string='';
  constructor(private http:Http,public routerTool:RouterTool,public route:ActivatedRoute,private table:TableTool,
                private dataTool:DataTool,private menuService:MenuService,private nzMessage:NzMessageService){}
  ngOnInit(){
    this.pageChangeHandler(1);
  }

  /*分页*/
  pageChangeHandler(val:any){
    this.page.pageNo=val;
    this.menuService.pageList(this.page.pageNo,this.page.pageSize,this.searchKey).subscribe(res=>{
        if(res["total"]!=0){
          this.menuList = res["list"];
          this.page.total = res["total"];
        }else {
          this.menuList = res["list"];
          this.page.total = res["total"];
        }
        this.idList=[];
      },
      err=>{
        console.log(err);
      });
  };
  /*size改变*/
  pageSizeChangeHandler(val:any){
    this.page.pageSize=val;
    this.menuService.pageList(this.page.pageNo,this.page.pageSize,this.searchKey).subscribe(res=>{
        if(res["total"]!=0){
          this.menuList = res["list"];
          this.page.total = res["total"];
        }else {
          this.menuList = res["list"];
          this.page.total = res["total"];
        }
        this.idList=[];
      },
      err=>{
        console.log(err);
      });
  };

  /**
   * 查询
   */
  search(){
    this.page.pageNo=1;
    this.menuService.pageList(this.page.pageNo,this.page.pageSize,this.searchKey).subscribe(res=>{
        if(res["total"]!=0){
          this.menuList = res["list"];
          this.page.total = res["total"];
        }else {
          this.menuList = res["list"];
          this.page.total = res["total"];
        }
        this.idList=[];
      },
      err=>{
        console.log(err);
      });
  }
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
   * 删除菜单
   * @param id
   */
  delMenu(id:any){
    this.menuService.delMenu(id).subscribe(
      res=>{
        this.pageChangeHandler(1);
        if(res["result"]==1){
          this.nzMessage.success("删除成功");
          this.pageChangeHandler(1);
        }else {
          this.nzMessage.warning(res["error"].message);
        }
      },
      err=>{
        console.log(err);
      }
    )
  }
}
