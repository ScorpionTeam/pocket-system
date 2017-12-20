import {Component, Input} from "@angular/core";
@Component({
  selector:'modal',
  templateUrl:'Modal.html',
  styleUrls:['Modal.css']
})

export class Modal{
  @Input() isVisible:boolean=false;
  @Input() title:string;
  constructor(){}

}
