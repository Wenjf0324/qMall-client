import {
  getHomeCasual,
  getHomeShopList,
  getDogFoodList,
  getDogSnacksList,
  getDogDailyList,
  getDogHealthList,
  getDogToyList,
  getCatFoodList,
  getCatSnacksList,
  getCatDailyList,
  getCatHealthList,
  getCatToyList,
  getUserInfo
} from "../api";

import {
  HOME_CASUAL,
  HOME_SHOP_LIST,
  DOG_FOOD_LIST,
  DOG_SNACKS_LIST,
  DOG_DAILY_LIST,
  DOG_HEALTH_LIST,
  DOG_TOY_LIST,
  CAT_FOOD_LIST,
  CAT_SNACKS_LIST,
  CAT_DAILY_LIST,
  CAT_HEALTH_LIST,
  CAT_TOY_LIST,
  USER_INFO
} from "./mutation-types";

export default {
  //1.获取首页轮播图
  async reqHomeCasual({ commit }) {
    const result = await getHomeCasual();
    commit(HOME_CASUAL, { homecasual: result.message });
  },

  //2.获取首页商品列表
  async reqHomeShopList({ commit }) {
    const result = await getHomeShopList();
    commit(HOME_SHOP_LIST, { homeshoplist: result.message.goods_list });
  },

  //3.获取狗狗主食商品列表
  async reqDogFoodList({ commit }) {
    const result = await getDogFoodList();
    commit(DOG_FOOD_LIST, { dogfoodlist: result.message.goods_list });
  },

  //4.获取狗狗零食商品列表
  async reqDogSnacksList({ commit }) {
    const result = await getDogSnacksList();
    commit(DOG_SNACKS_LIST, { dogsnackslist: result.message.goods_list });
  },

  //5.获取狗狗日用商品列表
  async reqDogDailyList({ commit }) {
    const result = await getDogDailyList();
    commit(DOG_DAILY_LIST, { dogdailylist: result.message.goods_list });
  },

  //6.获取狗狗医疗商品列表
  async reqDogHealthList({ commit }) {
    const result = await getDogHealthList();
    commit(DOG_HEALTH_LIST, { doghealthlist: result.message.goods_list });
  },

  //7.获取狗狗玩具商品列表
  async reqDogToyList({ commit }) {
    const result = await getDogToyList();
    commit(DOG_TOY_LIST, { dogtoylist: result.message.goods_list });
  },

  //8获取猫咪主食商品列表
  async reqCatFoodList({ commit }) {
    const result = await getCatFoodList();
    commit(CAT_FOOD_LIST, { catfoodlist: result.message.goods_list });
  },

  //9.获取猫咪零食商品列表
  async reqCatSnacksList({ commit }) {
    const result = await getCatSnacksList();
    commit(CAT_SNACKS_LIST, { catsnackslist: result.message.goods_list });
  },

  //10.获取猫咪日用商品列表
  async reqCatDailyList({ commit }) {
    const result = await getCatDailyList();
    commit(CAT_DAILY_LIST, { catdailylist: result.message.goods_list });
  },

  //11.获取猫咪医疗商品列表
  async reqCatHealthList({ commit }) {
    const result = await getCatHealthList();
    commit(CAT_HEALTH_LIST, { cathealthlist: result.message.goods_list });
  },

  //12.获取猫咪玩具商品列表
  async reqCatToyList({ commit }) {
    const result = await getCatToyList();
    commit(CAT_TOY_LIST, { cattoylist: result.message.goods_list });
  },

  //同步用户信息
  syncUserInfo({ commit }, userInfo) {
    commit(USER_INFO, { userInfo });
  },

  //异步获取用户信息
  async getUserInfo({ commit }) {
    const result = await getUserInfo();
    console.log(result);
    if (result.success_code === 200) {
      commit(USER_INFO, { userInfo: result.message });
    }
  }
};
