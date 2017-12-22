import {Component, OnInit} from "@angular/core";
import {RouterTool} from "../../../common/routertool/RouterTool";
import {ActivatedRoute} from "@angular/router";
import {CategoryService} from "../../../service/category/Category.service";
import {DataTool} from "../../../common/data/DataTool";
import {TableTool} from "../../../common/list/TableTool";
@Component({
  selector:'category-list',
  templateUrl:'CategoryList.component.html',
  providers:[CategoryService,TableTool]
})

export class CategoryListComponent implements OnInit{
  constructor( private routeTool:RouterTool,private route:ActivatedRoute,private categoryService:CategoryService,
               public dataTool:DataTool,private table:TableTool){}
  ngOnInit(){
    this.pageChangeHandler(1);
  }

  page:any={
    pageSize:10,
    pageNo:1,
    total:0
  };
  categoryList:any=[];//类目数组
  searchKey:string='';
  idList:any =[];
  checkAll:boolean=false;
  rootcategoryList:any=[];

  skipToPage(url:string,val?:any){
    this.routeTool.skipToPage(url,this.route,val)
  }

  /**
   * 翻页
   * @param val
   */
  pageChangeHandler(val:any){
    this.page.pageNo = val;
    this.categoryService.pageList(this.page.pageNo,this.page.pageSize,this.searchKey).subscribe(
      res=>{
        this.categoryList = res["list"];
        this.page.total = res["total"];
      });
  }

  /**
   * 修改pageSize回调
   * @param val
   */
  pageSizeChangeHandler(val:any){
    this.page.pageSize = val;
    this.categoryService.pageList(this.page.pageNo,this.page.pageSize,this.searchKey).subscribe(
      res=>{
        this.categoryList = res["list"];
        this.page.total = res["total"];
      });
  }

  /**
   * 查询
   */
  search(){
    this.page.pageNo = 1;
    this.categoryService.pageList(this.page.pageNo,this.page.pageSize,this.searchKey).subscribe(
      res=>{
        this.categoryList = res["list"];
        this.page.total = res["total"];
      });
  }

  /**
   * checkbox选择方法
   * @param flag
   * @param type
   * @param idList
   * @param dataList
   * @param val
   * @param index
   */
  selectItem(flag:boolean,type:number,idList:any[],dataList:any[],val?:any,index?:any){
    if(type==0){
      this.table.selectItem(flag,type,idList,dataList);
    }else {
      this.checkAll = this.table.selectItem(flag,type,idList,dataList,val);
    }
  }


}
