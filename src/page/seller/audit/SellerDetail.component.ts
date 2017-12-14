import {Component, OnInit} from "@angular/core";
import {UserService} from "../../../service/user/User.service";
import {ActivatedRoute} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";
@Component({
  selector:'seller-detail',
  templateUrl:'SellerDetail.component.html',
  providers:[UserService]
})

export class SellerDetailComponent implements OnInit{
  constructor(private userService:UserService,private route:ActivatedRoute,private nzMessage:NzMessageService){}
  ngOnInit(){
    this.detail();
  }
  sellObj:any={};//卖家对象

  /*查找详情*/
  detail(){
    this.userService.findById(this.route.params["value"].id).subscribe(
      (res:any)=>{
        if(res.result==1){
          this.sellObj= res.data;
        }else {
          this.nzMessage.error(res.error.message);
        }
      }
    )
  }

  /*审核*/
  audit(){

  }
}
