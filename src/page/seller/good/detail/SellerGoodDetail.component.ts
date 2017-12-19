import {Component, OnInit} from "@angular/core";
import {SellerServe} from "../../../../service/Seller.service";
import {NzMessageService} from "ng-zorro-antd";
import {RouterTool} from "../../../../common/routertool/RouterTool";
import {ActivatedRoute} from "@angular/router";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {CategoryService} from "../../../../service/category/Category.service";
import {isUndefined} from "util";
import {DataTool} from "../../../../common/data/DataTool";
@Component({
  selector:'seller-good',
  templateUrl:'SellerGoodDetail.component.html',
  providers:[SellerServe,CategoryService]
})

export class SellerGoodDetailComponent implements OnInit{
  constructor(private sellerService:SellerServe,private nzMessage:NzMessageService,
              private categoryService:CategoryService, private routerTool:RouterTool,
              private route:ActivatedRoute,private fb:FormBuilder,private dataTool:DataTool){}
  ngOnInit(){
    this.good.seller_id=Number(localStorage.getItem("id"));//初始化商户id
    this.createValidate();
    this.getCategoryList();
    //检查是否查询详情信息
    if(this.route.params['value'].id){
      this.isDetail=true;
      this.detail();
    }
  }
  good:any={
    discount:100
  };//商品对象
  imageList:any=[];//商品图片列表
  isDetail:boolean=false;//是否详情页
  initUrlList :any = [];//图片初始化
  validateForm:FormGroup;//表单验证
  categoryList:any=[];//类目列表

  /*计算促销价*/
  computePromotion(){
    this.good.promotion = Number(this.good.price) * Number(this.good.discount)/100;
  }
  /*创建表单校验规则*/
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
    this.sellerService.sellGoodDetail(this.route.params["value"].id).subscribe(
      (res:any)=>{
        if(res.result==1){
          this.good = res.data;
          this.good.price = this.dataTool.fTransYuan(this.good.price);
          this.good.promotion = this.dataTool.fTransYuan(this.good.promotion);
          this.imageList = res.data.imgList;
          /*获取图片列表*/
          res.data.imgList.forEach((item:any)=>{
            this.initUrlList.push(item.url);
          });
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
    //判断信息是否填写完整
   if(this.imageList.length==0||this.good.main_image_url==''||isUndefined(this.good.main_image_url)){
      this.nzMessage.warning("请检查图片是否上传");
      return;
    }else if(!this.validateForm.valid){
      this.nzMessage.warning("请检查商品信息是否填写完整");
      return;
    }else if(isUndefined(this.good.rich_content)){
      this.nzMessage.warning("请检查富文本内容");
      return;
    }

    //判断是新增还是修改
    if(this.isDetail){
      this.modify();
    }else {
      this.add();
    }
  }

  /**
   * 上传成功
   * @param url
   * @param type 0:主图 1.辅图1,2.辅图2,3.辅图3,4.辅图4
   */
  successUpload(urlList:any,type:number){
    if(type==0){
      this.good.main_image_url = urlList[0].url;
      this.imageList.unshift(urlList[0]);
    }else {
      this.imageList.splice(type,0,urlList[0]);
    }
  }
  /*删除图片*/
  deletePic(url:string,index?:number){
    if (index==0){
      this.good.main_image_url ='';
    }
    //查找删除图片在列表中的位置,并删除
    let indexInList;
    for(let i =0;i<this.imageList.length;i++){
      if(this.imageList[i].url==url){
        indexInList=i;
        break;
      }
    }
    this.imageList.splice(indexInList,1);
  }
  /*新增*/
  add(){
    this.good.price = this.dataTool.yTransFen(this.good.price);
    this.good.promotion = this.dataTool.yTransFen(this.good.promotion);
    this.sellerService.addGood({good:this.good,imageList:this.imageList}).subscribe(
      (res:any)=>{
        this.good.price = this.dataTool.fTransYuan(this.good.price);
        this.good.promotion = this.dataTool.fTransYuan(this.good.promotion);
        if(res.result==1){
          this.nzMessage.success("新增完成");
          this.validateForm.reset();
          //清空富文本内容
          this.good.rich_content='';
          //清空图片
          this.imageList = [];
          this.initUrlList=[];
        }else {
          this.nzMessage.error(res.error.message);
        }
      }
    );
  }
  /*修改*/
  modify(){
    this.good.price = this.dataTool.yTransFen(this.good.price);
    this.good.promotion = this.dataTool.yTransFen(this.good.promotion);
    this.sellerService.modifyGood({good:this.good,imageList:this.imageList}).subscribe(
      (res:any)=>{
        this.good.price = this.dataTool.fTransYuan(this.good.price);
        this.good.promotion = this.dataTool.fTransYuan(this.good.promotion);
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
  /*获取类目列表*/
  getCategoryList(){
    this.categoryService.findRootOrChildCategory("CHILD").subscribe(
      (res:any)=>{
        if(res.total==0){
          this.categoryList=[];
        }
        this.categoryList = res.list;
      }
    );
  }
}
