import {Component, OnInit} from "@angular/core";
import {SellerServe} from "../../../../service/Seller.service";
import {NzMessageService} from "ng-zorro-antd";
import {RouterTool} from "../../../../common/routertool/RouterTool";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector:'seller-good',
  templateUrl:'SellerGoodDetail.component.html',
  providers:[SellerServe]
})

export class SellerGoodDetailComponent implements OnInit{
  constructor(private sellerService:SellerServe,private nzMessage:NzMessageService,
              private routerTool:RouterTool,private route:ActivatedRoute){}
  ngOnInit(){
    this.good.sell_id=Number(localStorage.getItem("id"));//初始化商户id
  }
  good:any={
    imageList:[]
  };//商品对象
  isDetail:boolean=false;//是否详情页
  initUrl :any = {};//图片初始化

  /*查找详情*/
  detail(){
    this.sellerService.sellGoodDetail(localStorage.getItem('id')).subscribe(
      (res:any)=>{
        if(res.result==1){
          this.good = res.data;
        }else {
          this.nzMessage.error(res.error.message);
        }
      }
    );
  }
  /*保存*/
  save(){

  }

  /**
   * 上传成功
   * @param url
   * @param type 0:主图 1.辅图1,2.辅图2,3.辅图3,4.辅图4
   */
  successUpload(urlList:any,type:number){
    if(type==0){
      this.good.mainImgUrl = urlList[0].url;
      this.good.imageList[0]=urlList;
    }else {
      this.good.imageList[type] = urlList;
    }
    console.log(this.good);
  }
  /*新增*/
  add(){
    this.sellerService.addGood(this.good).subscribe(
      (res:any)=>{
        if(res.result==1){
          this.nzMessage.success("新增完成");
          //Todo:清空表单
        }else {
          this.nzMessage.error(res.error.message);
        }
      }
    );
  }
  /*修改*/
  modify(){
    this.sellerService.modifyGood(this.good).subscribe(
      (res:any)=>{
        if(res.result==1){
          this.nzMessage.success("修改完成");
        }else {
          this.nzMessage.error(res.error.message);
        }
      }
    );
  }
  /*返回*/
  back(){
    if(this.isDetail){
      this.routerTool.skipToPage("/../seller-good-list",this.route);
    }else {
      this.routerTool.skipToPage("/seller-good-list",this.route);
    }
  }
}
