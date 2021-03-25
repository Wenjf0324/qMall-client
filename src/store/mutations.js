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
  }
};
