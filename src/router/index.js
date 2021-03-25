//1.引入对应模块
import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home/Home";
import Dog from "../views/Dog/Dog";
import Login from "../views/Login/Login";
import ShoppingCart from "../views/ShoppingCart/ShoppingCart";
import Me from "../views/Me/Me";
import Manager from "../views/Manager/Manager";

import DogFood from "../views/Dog/children/DogFood";
import DogSnacks from "../views/Dog/children/DogSnacks";
import DogDaily from "../views/Dog/children/DogDaily";
import DogHealth from "../views/Dog/children/DogHealth";
import DogToy from "../views/Dog/children/DogToy";
import Cat from "../views/Cat/Cat";
import CatFood from "../views/Cat/children/CatFood";
import CatSnacks from "../views/Cat/children/CatSnacks";
import CatDaily from "../views/Cat/children/CatDaily";
import CatHealth from "../views/Cat/children/CatHealth";
import CatToy from "../views/Cat/children/CatToy";

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
    {
      path: "/home",
      component: Home,
      meta: { showTopNav: true }
    },
    {
      path: "/dog",
      component: Dog,
      children: [
        { path: "food", component: DogFood, meta: { showTopNav: true } },
        { path: "snacks", component: DogSnacks, meta: { showTopNav: true } },
        { path: "daily", component: DogDaily, meta: { showTopNav: true } },
        { path: "health", component: DogHealth, meta: { showTopNav: true } },
        { path: "toy", component: DogToy, meta: { showTopNav: true } },
        { path: "/", redirect: "/dog/food" }
      ]
    },
    {
      path: "/cat",
      component: Cat,
      children: [
        { path: "food", component: CatFood, meta: { showTopNav: true } },
        { path: "snacks", component: CatSnacks, meta: { showTopNav: true } },
        { path: "daily", component: CatDaily, meta: { showTopNav: true } },
        { path: "health", component: CatHealth, meta: { showTopNav: true } },
        { path: "toy", component: CatToy, meta: { showTopNav: true } },
        { path: "/", redirect: "/cat/food" }
      ]
    },
    {
      path: "/login",
      component: Login,
      meta: { showTopNav: false }
    },
    {
      path: "/shoppingcart",
      component: ShoppingCart,
      meta: { showTopNav: true }
    },
    {
      path: "/me",
      component: Me,
      meta: { showTopNav: true }
    },
    {
      path: "/manager",
      component: Manager,
      meta: { showTopNav: true }
    },
    {
      path: "/",
      redirect: "/home"
    }
  ]
});
