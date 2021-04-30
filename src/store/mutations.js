import { Message } from "element-ui";
import Vue from "vue";
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
  CART_COUNT,
  SHIPPINGS_LIST,
  DEL_SINGLE_ADDRESS,
  ADD_SINGLE_ADDRESS,
  GET_SINGLE_ORDERS,
  ORDER_LIST
} from "./mutation-types";

export default {
  [HOME_CASUAL](state, { homecasual }) {
    state.homecasual = homecasual;
  },

  [DOG_RECOMMEND](state, { dogrecommend }) {
    state.dogrecommend = dogrecommend;
  },

  [CAT_RECOMMEND](state, { catrecommend }) {
    state.catrecommend = catrecommend;
  },

  [DOG_FOOD_LIST](state, { dogfoodlist }) {
    state.dogfoodlist = dogfoodlist;
  },

  [DOG_SNACKS_LIST](state, { dogsnackslist }) {
    state.dogsnackslist = dogsnackslist;
  },

  [DOG_DAILY_LIST](state, { dogdailylist }) {
    state.dogdailylist = dogdailylist;
  },

  [DOG_HEALTH_LIST](state, { doghealthlist }) {
    state.doghealthlist = doghealthlist;
  },

  [DOG_TOY_LIST](state, { dogtoylist }) {
    state.dogtoylist = dogtoylist;
  },

  [CAT_FOOD_LIST](state, { catfoodlist }) {
    state.catfoodlist = catfoodlist;
  },

  [CAT_SNACKS_LIST](state, { catsnackslist }) {
    state.catsnackslist = catsnackslist;
  },

  [CAT_DAILY_LIST](state, { catdailylist }) {
    state.catdailylist = catdailylist;
  },

  [CAT_HEALTH_LIST](state, { cathealthlist }) {
    state.cathealthlist = cathealthlist;
  },

  [CAT_TOY_LIST](state, { cattoylist }) {
    state.cattoylist = cattoylist;
  },

  [USER_INFO](state, { userInfo }) {
    state.userInfo = userInfo;
  },

  [RESET_USER_INFO](state) {
    state.userInfo = {};
  },

  [CART_GOODS_LIST](state, { cartgoods }) {
    state.cartgoods = cartgoods;
  },

  [ADD_GOODS_COUNT](state, { goods }) {
    goods.buy_count++;
  },

  [REDUCE_GOODS_COUNT](state, { goods }) {
    if (goods.buy_count) {
      goods.buy_count--;
      if (goods.buy_count === 0) {
        goods.buy_count = 1;
        Message.warning("商品至少保留一件");
      }
    }
  },

  [SELECTED_ALL_GOODS](state, { isSelected }) {
    state.cartgoods.forEach((goods, index) => {
      // if (goods.checked) {
      //   //该属性存在
      //   goods.checked = !isSelected;
      // } else {
      //   //该属性不存在
      //   Vue.set(goods, "checked", !isSelected);
      // }
      //修改is_checked的值
      if (isSelected) {
        goods.is_checked = false;
      } else {
        goods.is_checked = true;
      }
      // goods.is_checked = goods.checked;
    });
  },

  [SELECTED_SINGLE_GOODS](state, { goods }) {
    //判断是否有选中的属性
    // if (goods.checked) {
    //   goods.checked = !goods.checked;
    // } else {
    //   Vue.set(goods, "checked", true);
    // }
    if (goods.is_checked) {
      goods.is_checked = !goods.is_checked;
    } else {
      goods.is_checked = true;
    }
    // goods.is_checked = goods.checked;
  },

  [DEL_SINGLE_GOODS](state, { goods }) {
    const index = state.cartgoods.indexOf(goods);
    state.cartgoods.splice(index, 1);
  },

  [CART_COUNT](state, { cartcount }) {
    state.cartcount = cartcount;
  },

  [GET_SINGLE_GOODS](state, { singlegoods }) {
    state.singlegoods = singlegoods;
  },

  [SHIPPINGS_LIST](state, { shippingslist }) {
    state.shippingslist = shippingslist;
  },

  [DEL_SINGLE_ADDRESS](state, { checkItem }) {
    const index = state.shippingslist.indexOf(checkItem);
    state.shippingslist.splice(index, 1);
  },

  [ADD_SINGLE_ADDRESS](state, { checkItem }) {
    state.shippingslist.push(checkItem);
  },

  [ORDER_LIST](state, { orderlist }) {
    state.orderlist = orderlist;
  },

  [GET_SINGLE_ORDERS](state, { singleorders }) {
    // if (state.orderlist.length > 0) {
    //   state.orderlist.forEach((orders, index) => {
    //     if (orders.order_no === orderNo) {
    //       state.singleorders.push(orders);
    //     }
    //   });
    // }

    state.singleorders = singleorders;
  }
};
