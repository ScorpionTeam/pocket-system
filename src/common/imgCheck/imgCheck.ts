import {Component, OnInit, Input} from "@angular/core";
import {HttpData} from "../../http/HttpData";
@Component({
  selector:'img-scan',
  templateUrl:'imgCheck.html',
  styles:[`
      .pic_contain{
        display: inline-block;
        position: relative;
        vertical-align: top;
        width: 30%;
        text-align: center;
      }
      .pic_wapper{
        margin: 0 auto;
        position: relative;
        width: 150px;
        height: 150px;
        border: 1px solid #f1f1f1;
      }
      .pic_modal{
        width: 150px;
        height: 150px;
        position: absolute;
        top: 0;
        background: #000;
        opacity: 0;
      }
      .pic_modal:hover{
         opacity: 0.7;
      }
      .pic_icon{  
          position: absolute;
          color: #fff;
          font-size: 21px;
          top: 50%;
          left: 50%;
          margin-left: -10px;
          margin-top: -10px;
          cursor: pointer;
      }
      .pic{
        width: 150px;
        height: 150px;
        object-fit: cover;
      }
      .pic_detail{
        width: 350px;
        height:350px;
        object-fit: cover;
      }
  `]
})
export class ImgCheck implements OnInit{
  constructor(private httpData:HttpData){}
  ngOnInit(){}
  @Input() imgPreview:string;
  @Input() ModalIdName:string;
  isVisible:boolean=false;

  /*打开模态层*/
  openModal(){
    this.isVisible = !this.isVisible;
    let pic:any = document.getElementById(this.ModalIdName);
    console.log(pic);
    pic.style.transform = "rotate(0)";
  }

/*旋转图片*/
 roratePic(node:any){
   console.log(node._el);
   let targtEle = node._el;
   let pic:any = document.getElementById(this.ModalIdName);
   console.log(pic);
   let degree = this.getDegree(pic);
    pic.style.transform = "rotate("+(degree+90)+"deg)";
 }

 /*获取转动角度*/
  getDegree(el:any){
    let st = window.getComputedStyle(el, null);
    let tr = st.getPropertyValue("-webkit-transform") ||
      st.getPropertyValue("-moz-transform") ||
      st.getPropertyValue("-ms-transform") ||
      st.getPropertyValue("-o-transform") ||
      st.getPropertyValue("transform") ||
      "FAIL";
    let values = tr.split('(')[1].split(')')[0].split(',');
    let a = Number(values[0]);
    let b = Number(values[1]);
    let c = values[2];
    let d = values[3];
    let angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    console.log('Rotate: ' + angle + 'deg');
    return angle;
  }

}
