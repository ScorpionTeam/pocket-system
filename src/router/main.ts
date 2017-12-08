import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "../page/login/Login.component";
import {NgModule} from "@angular/core";
import {IndexComponent} from "../page/index/Index.component";
import {GoodListComponent} from "../page/good/goodlist/GoodList.component";
import {GoodComponent} from "../page/good/gooddetail/Good.component";
import {OrderListComponent} from "../page/order/orderlist/OrderList.component";
import {OrderComponent} from "../page/order/orderdetail/Order.component";
import {UserListComponent} from "../page/user/userlist/UserList.component";
import {UserComponent} from "../page/user/userdetail/User.component";
import {ActivityListComponent} from "../page/active/list/ActivityList.component";
import {ActivityComponent} from "../page/active/detail/Activity.component";
import {BrandListComponent} from "../page/brand/list/BrandList.component";
import {BrandDetailComponent} from "../page/brand/detail/Brand.component";
import {TicketListComponent} from "../page/ticket/list/TicketList.component";
import {TicketComponent} from "../page/ticket/detail/Ticket.component";
import {ConcatGoodComponent} from "../page/active/withgood/ConcatGood.component";
import {OutGoodComponent} from "../page/active/outgood/OutGood.component";
import {MenuListComponent} from "../page/system/menu/list/MenuList.component";
import {RouteGuard} from "../service/guard/RouteGuard";
import {AdvertisementListComonent} from "../page/advertisement/list/AdvertisementList.component";
import {AdvertisementComponent} from "../page/advertisement/detail/Advertisement.component";
import { PersonalComponent} from "../page/user/person/PersonDetail.component";
import {MenuComponent} from "../page/system/menu/detail/Menu.component";
import {CategoryListComponent} from "../page/category/list/CategoryList.component";
import {CategoryComponent} from "../page/category/detail/Category.component";
import {RoleListComponent} from "../page/system/role/list/RoleList.component";
import {RoleComponent} from "../page/system/role/detail/Role.component";
import {PictureListComponent} from "../page/picture/list/PictureList.component";

const appRoute :Routes = [
  {path:'',redirectTo:'/index',pathMatch: 'full',},
  {path:'index',component:IndexComponent,canActivate:[RouteGuard],canActivateChild:[RouteGuard],
    children:[
      {path:'good-list',component:GoodListComponent},
      {path:'good-detail/:id',component:GoodComponent},
      {path:'good-add',component:GoodComponent},
      {path:'order-list',component:OrderListComponent},
      {path:'order-detail/:id',component:OrderComponent},
      {path:'user-list',component:UserListComponent},
      {path:'user-add',component:UserComponent},
      {path:'user-detail/:id',component:UserComponent},
      {path:'activity-list',component:ActivityListComponent},
      {path:'activity-add',component:ActivityComponent},
      {path:'activity-detail/:id',component:ActivityComponent},
      {path:'activity-good-concat',component:ConcatGoodComponent},
      {path:'activity-good-action',component:OutGoodComponent},
      {path:'brand-list',component:BrandListComponent},
      {path:'brand-detail/:id',component:BrandDetailComponent},
      {path:'brand-add',component:BrandDetailComponent},
      {path:'ticket-list',component:TicketListComponent},
      {path:'ticket-add',component:TicketComponent},
      {path:'ticket-detail/:id',component:TicketComponent},
      {path:'banner-list',component:AdvertisementListComonent},
      {path:'banner-add',component:AdvertisementComponent},
      {path:'banner-detail/:id',component:AdvertisementComponent},
        {path:'menu-list',component:MenuListComponent},
      {path:'menu-add',component:MenuComponent},
      {path:'menu-detail/:id',component:MenuComponent},
      {path:'personal',component:PersonalComponent},
      {path:'category-list',component:CategoryListComponent},
      {path:'category-add',component:CategoryComponent},
      {path:'category-detail/:id',component:CategoryComponent},
      {path:'role-list',component:RoleListComponent},
      {path:'role-add',component:RoleComponent},
      {path:'role-detail/:id',component:RoleComponent},
      {path:'pic-list',component:PictureListComponent}
    ]},
  {path:'login',component:LoginComponent}
]

@NgModule({
  imports:[RouterModule.forRoot(appRoute,{ useHash: true })],
  exports:[RouterModule]
})

export class AppRouteModule{

}