import { Message } from "element-ui";
import {
  getHomeCasual,
  getDogRecommend,
  getCatRecommend,
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
  getUserInfo,
  getLogout,
  getCartGoods,
  updateGoodsCount,
  delGoodsSingle,
  getShippingsList,
  delAddressSingle,
  getOrderList,
  getSingleOrders
} from "../api";

import {
  HOME_CASUAL,
  DOG_RECOMMEND,
  CAT_RECOMMEND,
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
  USER_INFO,
  RESET_USER_INFO,
  CART_GOODS_LIST,
  ADD_GOODS_COUNT,
  REDUCE_GOODS_COUNT,
  SELECTED_ALL_GOODS,
  SELECTED_SINGLE_GOODS,
  DEL_SINGLE_GOODS,
  GET_SINGLE_GOODS,
  SHIPPINGS_LIST,
  DEL_SINGLE_ADDRESS,
  ADD_SINGLE_ADDRESS,
  GET_SINGLE_ORDERS,
  ORDER_LIST
} from "./mutation-types";

export default {
  //1.获取首页轮播图
  async reqHomeCasual({ commit }) {
    const result = await getHomeCasual();
    commit(HOME_CASUAL, { homecasual: result.message.data });
  },

  //2.获取狗狗推荐商品列表
  async reqDogRecommend({ commit }) {
    const result = await getDogRecommend();
    commit(DOG_RECOMMEND, { dogrecommend: result.message.goods_list });
  },

  //2.获取猫咪推荐商品列表
  async reqCatRecommend({ commit }) {
    const result = await getCatRecommend();
    commit(CAT_RECOMMEND, { catrecommend: result.message.goods_list });
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
  },

  //退出登录（清空获取用户信息）
  async logout({ commit }) {
    const result = await getLogout();
    console.log(result);
    if (result.success_code === 200) {
      commit(RESET_USER_INFO);
    }
  },

  //请求购物车数据
  async reqCartGoods({ commit }) {
    const result = await getCartGoods();
    if (result.success_code === 200) {
      commit(CART_GOODS_LIST, { cartgoods: result.message });
    }
  },

  //单个商品的增加和减少
  async updateGoodsCount({ commit }, { goods, isAdd }) {
    if (isAdd) {
      //增加
      commit(ADD_GOODS_COUNT, { goods });
    } else {
      //减少
      commit(REDUCE_GOODS_COUNT, { goods });
    }
    await updateGoodsCount(goods.goods_id, goods.buy_count);
  },

  //是否选中所有的商品
  selectedAll({ commit }, { isSelected }) {
    commit(SELECTED_ALL_GOODS, { isSelected });
  },

  //单个商品的选中和取消
  singleGoodsSelected({ commit }, { goods }) {
    commit(SELECTED_SINGLE_GOODS, { goods });
  },

  //单个商品的删除
  async delGoodsSingle({ commit }, { goods }) {
    commit(DEL_SINGLE_GOODS, { goods });
    const result = await delGoodsSingle(goods.goods_id);
    if (result.success_code === 200) {
      Message.success(result.message);
    }
  },

  //获取单个商品的数据，用于商品详情页的展示
  getGoodsSingle({ commit }, { singlegoods }) {
    commit(GET_SINGLE_GOODS, { singlegoods });
  },

  //请求收货地址列表数据
  async reqShippingsList({ commit }) {
    const result = await getShippingsList();
    if (result.success_code === 200) {
      commit(SHIPPINGS_LIST, { shippingslist: result.message });
    }
  },

  //单个收货地址的删除
  async delAddressSingle({ commit }, { checkItem }) {
    commit(DEL_SINGLE_ADDRESS, { checkItem });
    console.log(checkItem);
    const result = await delAddressSingle(checkItem.rec_id);
    if (result.success_code === 200) {
      Message.success("操作成功");
    }
  },

  //单个收货地址的添加
  addAddressSingle({ commit }, { checkItem }) {
    commit(ADD_SINGLE_ADDRESS, { checkItem });
  },

  //请求订单列表数据
  async reqOrderList({ commit }) {
    const result = await getOrderList();
    if (result.success_code === 200) {
      commit(ORDER_LIST, { orderlist: result.message });
    }
  },

  //获取单个订单详情数据
  async reqSingleOrders({ commit }, { orderNo }) {
    console.log(orderNo);
    const result = await getSingleOrders(orderNo);
    console.log(result);
    if (result.success_code === 200) {
      commit(GET_SINGLE_ORDERS, { singleorders: result.message });
    }
  }
  // getSingleOrders({ commit }, { orderNo }) {
  //   commit(GET_SINGLE_ORDERS, { orderNo });
  // }
};
