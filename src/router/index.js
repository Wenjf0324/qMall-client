//1.引入对应模块
import Vue from "vue";
import VueRouter from "vue-router";

// import Home from "../views/Home/Home";
// import Dog from "../views/Dog/Dog";
// import Cat from "../views/Cat/Cat";
// import Login from "../views/Login/Login";
// import ShoppingCart from "../views/ShoppingCart/ShoppingCart";
import Me from "../views/Me/Me";
import Manager from "../views/Manager/Manager";
// import Detail from "../views/Detail";
// import Order from "../views/Order/Order";

//配置一级路由的路由组件懒加载
const Home = () => import("../views/Home");
const Dog = () => import("../views/Dog/Dog");
const Cat = () => import("../views/Cat/Cat");
const Login = () => import("../views/Login/Login");
const ShoppingCart = () => import("../views/ShoppingCart/ShoppingCart");
const Detail = () => import("../views/Detail");
const Order = () => import("../views/Order/Order");

import DogFood from "../views/Dog/children/DogFood";
import DogSnacks from "../views/Dog/children/DogSnacks";
import DogDaily from "../views/Dog/children/DogDaily";
import DogHealth from "../views/Dog/children/DogHealth";
import DogToy from "../views/Dog/children/DogToy";

import CatFood from "../views/Cat/children/CatFood";
import CatSnacks from "../views/Cat/children/CatSnacks";
import CatDaily from "../views/Cat/children/CatDaily";
import CatHealth from "../views/Cat/children/CatHealth";
import CatToy from "../views/Cat/children/CatToy";

import OrderConfirm from "../views/Order/children/OrderConfirm";
import OrderList from "../views/Order/children/OrderList";
import OrderPay from "../views/Order/children/OrderPay";
import Alipay from "../views/Order/children/OrderAlipay";

const includPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return includPush.call(this, location).catch(err => err);
};

//2.声明使用
Vue.use(VueRouter);

//3.输出路由对象
export default new VueRouter({
  //3.1配置一级路由
  routes: [
    //默认路由
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      component: Home,
      meta: { showNavHeader: true, showFooter: true }
    },
    {
      path: "/login",
      component: Login,
      meta: { showNavHeader: false, showFooter: false }
    },
    {
      path: "/dog",
      component: Dog,
      children: [
        {
          path: "food",
          component: DogFood,
          meta: {
            showNavHeader: true,
            showFooter: true
          }
        },
        {
          path: "snacks",
          component: DogSnacks,
          meta: {
            showNavHeader: true,
            showFooter: true
          }
        },
        {
          path: "daily",
          component: DogDaily,
          meta: {
            showNavHeader: true,
            showFooter: true
          }
        },
        {
          path: "health",
          component: DogHealth,
          meta: {
            showNavHeader: true,
            showFooter: true
          }
        },
        {
          path: "toy",
          component: DogToy,
          meta: {
            showNavHeader: true,
            showFooter: true
          }
        },
        { path: "/", redirect: "/dog/food" }
      ]
    },
    {
      path: "/cat",
      component: Cat,
      children: [
        {
          path: "food",
          component: CatFood,
          meta: {
            showNavHeader: true,
            showFooter: true
          }
        },
        {
          path: "snacks",
          component: CatSnacks,
          meta: {
            showNavHeader: true,
            showFooter: true
          }
        },
        {
          path: "daily",
          component: CatDaily,
          meta: {
            showNavHeader: true,
            showFooter: true
          }
        },
        {
          path: "health",
          component: CatHealth,
          meta: {
            showNavHeader: true,
            showFooter: true
          }
        },
        {
          path: "toy",
          component: CatToy,
          meta: {
            showNavHeader: true,
            showFooter: true
          }
        },
        { path: "/", redirect: "/cat/food" }
      ]
    },
    {
      path: "/detail/:id",
      component: Detail,
      meta: { showNavHeader: true, showFooter: true }
    },
    {
      path: "/shoppingcart",
      component: ShoppingCart,
      meta: { showNavHeader: false, showFooter: false }
    },
    {
      path: "/order",
      name: "order",
      component: Order,
      children: [
        {
          path: "list",
          name: "order-list",
          component: OrderList,
          meta: { showNavHeader: false, showFooter: false }
        },
        {
          path: "confirm",
          name: "order-confirm",
          component: OrderConfirm,
          meta: { showNavHeader: false, showFooter: false }
        },
        {
          path: "pay",
          name: "order-pay",
          component: OrderPay,
          meta: { showNavHeader: false, showFooter: false }
        },
        // 支付宝中间页面
        {
          path: "alipay",
          name: "alipay",
          component: Alipay,
          meta: { showNavHeader: false, showFooter: false }
        }
      ]
    },
    {
      path: "/me",
      component: Me,
      meta: { showNavHeader: false, showFooter: false }
    },
    {
      path: "/manager",
      component: Manager,
      meta: { showNavHeader: true, showFooter: true }
    }
  ]
});
