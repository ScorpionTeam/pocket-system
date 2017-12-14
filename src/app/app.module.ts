// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
// import { RouterModule, PreloadAllModules } from '@angular/router';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//
// /*
//  * Platform and Environment providers/directives/pipes
//  */
// import { environment } from 'environments/environment';
// import { ROUTES } from './app.routes';
// // App is our top level component
// import { AppComponent } from './app.component';
// import { APP_RESOLVER_PROVIDERS } from './app.resolver';
// import { AppState, InternalStateType } from './app.service';
// import { HomeComponent } from './home';
// import { AboutComponent } from './about';
// import { NoContentComponent } from './no-content';
// import { XLargeDirective } from './home/x-large';
// import { DevModuleModule } from './+dev-module';
//
// import '../styles/styles.scss';
// import '../styles/headings.css';
//
// // Application wide providers
// const APP_PROVIDERS = [
//   ...APP_RESOLVER_PROVIDERS,
//   AppState
// ];
//
// type StoreType = {
//   state: InternalStateType,
//   restoreInputValues: () => void,
//   disposeOldHosts: () => void
// };
//
// /**
//  * `AppModule` is the main entry point into Angular2's bootstraping process
//  */
// @NgModule({
//   bootstrap: [ AppComponent ],
//   declarations: [
//     AppComponent,
//     AboutComponent,
//     HomeComponent,
//     NoContentComponent,
//     XLargeDirective
//   ],
//   /**
//    * Import Angular's modules.
//    */
//   imports: [
//     BrowserModule,
//     BrowserAnimationsModule,
//     FormsModule,
//     HttpModule,
//     RouterModule.forRoot(ROUTES, {
//       useHash: Boolean(history.pushState) === false,
//       preloadingStrategy: PreloadAllModules
//     }),
//
//     /**
//      * This section will import the `DevModuleModule` only in certain build types.
//      * When the module is not imported it will get tree shaked.
//      * This is a simple example, a big app should probably implement some logic
//      */
//     ...environment.showDevModule ? [ DevModuleModule ] : [],
//   ],
//   /**
//    * Expose our Services and Providers into Angular's dependency injection.
//    */
//   providers: [
//     environment.ENV_PROVIDERS,
//     APP_PROVIDERS
//   ]
// })
// export class AppModule {}
import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "../page/login/Login.component";
import {AppRouteModule} from "../router/main";
import {IndexComponent} from "../page/index/Index.component";
import {GoodComponent} from "../page/good/gooddetail/Good.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgZorroAntdModule, NZ_MESSAGE_CONFIG} from 'ng-zorro-antd';
import {GoodListComponent} from "../page/good/goodlist/GoodList.component";
import {PageService} from "../service/page/Page.service";
import {HttpClientModule} from "@angular/common/http";
import {OrderComponent} from "../page/order/orderdetail/Order.component";
import {OrderListComponent} from "../page/order/orderlist/OrderList.component";
import {HttpData} from "../http/HttpData";
import {UserListComponent} from "../page/user/userlist/UserList.component";
import {UserComponent} from "../page/user/userdetail/User.component";
import {Http} from "../common/http/Http";
import {DataTool} from "../common/data/DataTool";
import {ActivityListComponent} from "../page/active/list/ActivityList.component";
import {ActivityComponent} from "../page/active/detail/Activity.component";
import {BrandListComponent} from "../page/brand/list/BrandList.component";
import {BrandDetailComponent} from "../page/brand/detail/Brand.component";
import {ImgUpload} from "../common/imgupload/ImgUpload";
import { CKEditorModule } from 'ng2-ckeditor';
import {HKeditor} from "../common/editor/editor";
import {TicketListComponent} from "../page/ticket/list/TicketList.component";
import {TicketComponent} from "../page/ticket/detail/Ticket.component";
import {Interceptor} from "../common/interceptor/interceptor";
import {ConcatGoodComponent} from "../page/active/withgood/ConcatGood.component";
import {OutGoodComponent} from "../page/active/outgood/OutGood.component";
import {MenuListComponent} from "../page/system/menu/list/MenuList.component";
import {RouteGuard} from "../service/guard/RouteGuard";
import {AdvertisementListComonent} from "../page/advertisement/list/AdvertisementList.component";
import {AdvertisementComponent} from "../page/advertisement/detail/Advertisement.component";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { PersonalComponent} from "../page/user/person/PersonDetail.component";
import {RouterTool} from "../common/routertool/RouterTool";
import {MenuComponent} from "../page/system/menu/detail/Menu.component";
import {StoreModule} from "@ngrx/store";
import {reducer}from"../state/reducer/index/StateApplaction"
import {CategoryListComponent} from "../page/category/list/CategoryList.component";
import {CategoryComponent} from "../page/category/detail/Category.component";
import {TimePick} from "../common/data/TimePick";
import {RoleListComponent} from "../page/system/role/list/RoleList.component";
import {RoleComponent} from "../page/system/role/detail/Role.component";
import {CheckBoxGroup} from "../common/checkbox/CheckBoxGroup";
import {PictureListComponent} from "../page/picture/list/PictureList.component";
import {HMenu} from "../common/menu/HMenu";
import '../styles/styles.scss';
import {RegisterComponent} from "../page/seller/Register/Register.component";
import {FormTool} from "../common/list/FormTool";
import {ShopListComponent} from "../page/seller/shop/list/ShopList.component";
import {ShopComponent} from "../page/seller/shop/detail/Shop.component";
import {MyShopComponent} from "../page/seller/shop/mine/MyShop.component";
import {SellerListComponent} from "../page/seller/list/SellerList.component";
import {SellerDetailComponent} from "../page/seller/audit/SellerDetail.component";
import {ImgCheck} from "../common/imgCheck/imgCheck";
import {SellerInfoComponent} from "../page/seller/person/SellerInfo.component";
@NgModule({
  declarations: [
    HMenu,
    HKeditor,
    ImgUpload,
    ImgCheck,
    CheckBoxGroup,
    AppComponent,
    LoginComponent,
    IndexComponent,
    GoodComponent,
    GoodListComponent,
    OrderComponent,
    OrderListComponent,
    UserListComponent,
    UserComponent,
    ActivityListComponent,
    ActivityComponent,
    ConcatGoodComponent,
    OutGoodComponent,
    BrandListComponent,
    BrandDetailComponent,
    TicketListComponent,
    TicketComponent,
    MenuListComponent,
    MenuComponent,
    AdvertisementListComonent,
    AdvertisementComponent,
    PersonalComponent,
    CategoryListComponent,
    CategoryComponent,
    RoleListComponent,
    RoleComponent,
    PictureListComponent,
    RegisterComponent,
    ShopListComponent,
    ShopComponent,
    MyShopComponent,
    SellerListComponent,
    SellerDetailComponent,
    SellerInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouteModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    StoreModule.forRoot({
      loadFlag:reducer
    }),
    CKEditorModule
  ],
  providers: [PageService,
    HttpData,
    Http,
    RouteGuard,
    RouterTool,
    Interceptor,
    DataTool,
    TimePick,
    FormTool,
    { provide: NZ_MESSAGE_CONFIG, useValue: { nzMaxStack:1 }} ],
  bootstrap: [AppComponent]
})
export class AppModule { }

