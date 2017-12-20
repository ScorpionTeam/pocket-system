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
import {RegisterComponent} from "../page/seller/Register/Register.component";
import {ShopListComponent} from "../page/seller/shop/list/ShopList.component";
import {ShopComponent} from "../page/seller/shop/detail/Shop.component";
import {MyShopComponent} from "../page/seller/shop/mine/MyShop.component";
import {SellerListComponent} from "../page/seller/list/SellerList.component";
import {SellerDetailComponent} from "../page/seller/audit/SellerDetail.component";
import {SellerInfoComponent} from "../page/seller/person/SellerInfo.component";
import {SellerOrderListComponent} from "../page/seller/order/list/SellerOrderList.component";
import {SellerOrderDetailComponent} from "../page/seller/order/detail/SellerOrderDetail.component";
import {SellerTicketListComponent} from "../page/seller/ticket/list/SellerTicketList.component";
import {SellerTicketComponent} from "../page/seller/ticket/detail/SellerTicket.component";
import {SellerGoodListComponent} from "../page/seller/good/list/SellerGoodList.component";
import {SellerGoodDetailComponent} from "../page/seller/good/detail/SellerGoodDetail.component";
import {GoodAuditListComponent} from "../page/good/auditlist/GoodAuditList.component";
import {GoodAuditComponent} from "../page/good/auditdetail/GoodAudit.component";
import {JoinActivityComponent} from "../page/seller/active/join/JoinActivity.component";
import {QuitActivityComponent} from "../page/seller/active/quit/QuitActivity.component";

const appRoute :Routes = [
  {path:'',redirectTo:'/index',pathMatch: 'full',},
  {path:'index',component:IndexComponent,canActivate:[RouteGuard],canActivateChild:[RouteGuard],
    children:[
      {path:'good-list',component:GoodListComponent},
      {path:'good-detail/:id',component:GoodComponent},
      {path:'good-audit-list',component:GoodAuditListComponent},
      {path:'good-audit/:id',component:GoodAuditComponent},
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
      {path:'pic-list',component:PictureListComponent},
      {path:'shop-list',component:ShopListComponent},
      {path:'shop/:id',component:ShopComponent},
      {path:'myshop',component:MyShopComponent},
      {path:'seller-list',component:SellerListComponent},
      {path:'seller-info',component:SellerInfoComponent},
      {path:'seller-detail/:id',component:SellerDetailComponent},
      {path:'seller-order-list',component:SellerOrderListComponent},
      {path:'seller-order-detail/:id',component:SellerOrderDetailComponent},
      {path:'seller-ticket-list',component:SellerTicketListComponent},
      {path:'seller-ticket-add',component:SellerTicketComponent},
      {path:'seller-ticket/:id',component:SellerTicketComponent},
      {path:'seller-good-list',component:SellerGoodListComponent},
      {path:'seller-good-add',component:SellerGoodDetailComponent},
      {path:'seller-good/:id',component:SellerGoodDetailComponent},
      {path:'join-activity',component:JoinActivityComponent},
      {path:'quit-activity',component:QuitActivityComponent}
    ]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent}

];

@NgModule({
  imports:[RouterModule.forRoot(appRoute,{ useHash: true })],
  exports:[RouterModule]
})

export class AppRouteModule{

}
