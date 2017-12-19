import {Component, OnInit} from "@angular/core";
import {SellerServe} from "../../../../service/Seller.service";
import {NzMessageService} from "ng-zorro-antd";
import {RouterTool} from "../../../../common/routertool/RouterTool";
import {ActivatedRoute} from "@angular/router";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
@Component({
  selector:'seller-good',
  templateUrl:'SellerGoodDetail.component.html',
  providers:[SellerServe]
})

export class SellerGoodDetailComponent implements OnInit{
  constructor(private sellerService:SellerServe,private nzMessage:NzMessageService,
              private routerTool:RouterTool,private route:ActivatedRoute,private fb:FormBuilder){}
  ngOnInit(){
    this.good.sell_id=Number(localStorage.getItem("id"));//初始化商户id
    this.createValidate();
  }
  good:any={
    imageList:[],
    promotion:1
  };//商品对象
  isDetail:boolean=false;//是否详情页
  initUrl :any = {};//图片初始化
  validateForm:FormGroup;//表单验证
  categoryList:any=[];//类目列表

  createValidate(){
    this.validateForm = this.fb.group({
      name:["",Validators.required],
      description:["",Validators.required],
      seo:["",Validators.required],
      goodNo:["",Validators.required],
      price:["",Validators.required],
      discount:["",Validators.required],
      promotion:[{disabled:true}],
      stock:["",Validators.required],
      isNew:["",Validators.required],
      isFreight:["",Validators.required],
      isHot:["",Validators.required],
      isOnSale:["",Validators.required],
      categoryId:["",Validators.required],
      brandId:["",Validators.required],
    });
  }
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
    console.log(this.good);
    console.log(this.validateForm.valid);
  }

  /**
   * 上传成功
   * @param url
   * @param type 0:主图 1.辅图1,2.辅图2,3.辅图3,4.辅图4
   */
  successUpload(urlList:any,type:number){
    if(type==0){
      this.good.main_image_url = urlList[0].url;
      this.good.imageList.unshift(urlList);
    }else {
      this.good.imageList.splice(type,0,urlList);
    }
  }
  /*删除图片*/
  deletePic(url:string,index?:number){
    if (index==0){
      this.good.main_image_url ='';
    }
    //查找删除图片在列表中的位置,并删除
    let indexInList;
    for(let i =0;i<this.good.imageList.length;i++){
      if(this.good.imageList[i].url==url){
        indexInList=i;
        break;
      }
    }
    this.good.imageList.splice(indexInList,1);
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
