import { Message } from "element-ui";
import Vue from "vue";
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
  USER_INFO,
  RESET_USER_INFO,
  CART_GOODS_LIST,
  ADD_GOODS_COUNT,
  REDUCE_GOODS_COUNT,
  SELECTED_ALL_GOODS,
  SELECTED_SINGER_GOODS,
  DEL_SINGER_GOODS,
  GET_SINGLE_GOODS,
  CART_COUNT,
  SHIPPINGS_LIST,
  DEL_SINGLE_ADDRESS
} from "./mutation-types";

export default {
  [HOME_CASUAL](state, { homecasual }) {
    state.homecasual = homecasual;
  },

  [HOME_SHOP_LIST](state, { homeshoplist }) {
    state.homeshoplist = homeshoplist;
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
      if (goods.checked) {
        //该属性存在
        goods.checked = !isSelected;
      } else {
        //该属性不存在
        Vue.set(goods, "checked", !isSelected);
      }
    });
  },

  [SELECTED_SINGER_GOODS](state, { goods }) {
    //判断是否有选中的属性
    if (goods.checked) {
      goods.checked = !goods.checked;
    } else {
      Vue.set(goods, "checked", true);
    }
  },

  [DEL_SINGER_GOODS](state, { goods }) {
    const index = state.cartgoods.indexOf(goods);
    state.cartgoods.splice(index, 1);
  },

  [GET_SINGLE_GOODS](state, { singlegoods }) {
    state.singlegoods = singlegoods;
  },

  [CART_COUNT](state, { cartCount }) {
    state.cartgoods.length = cartCount;
  },

  [SHIPPINGS_LIST](state, { shippingslist }) {
    state.shippingslist = shippingslist;
  },

  [DEL_SINGLE_ADDRESS](state, { shippingsItem }) {
    const index = state.shippingslist.indexOf(shippingsItem);
    state.shippingslist.splice(index, 1);
  }
};
