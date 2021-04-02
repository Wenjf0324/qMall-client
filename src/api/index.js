import ajax from "./ajax";

//1.基础路径
const BASE_URL = "/api";

//2.请求方法

//2.1请求首页的轮播图
export const getHomeCasual = () => ajax(BASE_URL + "/api/homecasual");

//2.1请求首页的商品的数据
export const getHomeShopList = () => ajax(BASE_URL + "/api/homeshoplist");

//2.2请求狗狗主食的商品的数据
export const getDogFoodList = () => ajax(BASE_URL + "/api/dogfoodlist");

//2.3请求狗狗零食的商品的数据
export const getDogSnacksList = () => ajax(BASE_URL + "/api/dogsnackslist");

//2.4请求狗狗日用的商品的数据
export const getDogDailyList = () => ajax(BASE_URL + "/api/dogdailylist");

//2.4请求狗狗医疗的商品的数据
export const getDogHealthList = () => ajax(BASE_URL + "/api/doghealthlist");

//2.4请求狗狗玩具的商品的数据
export const getDogToyList = () => ajax(BASE_URL + "/api/dogtoylist");

//2.5请求猫咪主食的商品的数据
export const getCatFoodList = () => ajax(BASE_URL + "/api/catfoodlist");

//2.6请求猫咪零食的商品的数据
export const getCatSnacksList = () => ajax(BASE_URL + "/api/catsnackslist");

//2.7请求猫咪日用的商品的数据
export const getCatDailyList = () => ajax(BASE_URL + "/api/catdailylist");

//2.8请求猫咪医疗的商品的数据
export const getCatHealthList = () => ajax(BASE_URL + "/api/cathealthlist");

//2.9请求猫咪玩具的商品的数据
export const getCatToyList = () => ajax(BASE_URL + "/api/cattoylist");

//2.10请求短信验证码
export const getPhoneCode = phone =>
  ajax(BASE_URL + "/api/sendcode", { phone });

//2.11手机验证码登录
export const phoneCodeLogin = (phone, code) =>
  ajax(BASE_URL + "/api/login_code", { phone, code }, "POST");

//2.12用户名和密码登录
export const pwdLogin = (name, pwd, captcha) =>
  ajax(BASE_URL + "/api/login_pwd", { name, pwd, captcha }, "POST");

//2.13获取登录的用户名信息
export const getUserInfo = () => ajax(BASE_URL + "/api/user_info");

//2.14退出登录
export const getLogout = () => ajax(BASE_URL + "/api/logout");

//2.15加入购物车
export const addGoodsToCart = (
  user_id,
  goods_id,
  goods_name,
  thumb_url,
  price
) =>
  ajax(
    BASE_URL + "/api/add_shop_cart",
    {
      user_id,
      goods_id,
      goods_name,
      thumb_url,
      price
    },
    "POST"
  );

//2.16 请求购物车数据
export const getCartGoods = () => ajax(BASE_URL + "/api/cart_goods");

//2.17 单个商品的删除
export const delGoodsSinger = goods_id =>
  ajax(BASE_URL + "/api/del_goods_singer", { goods_id }, "POST");

//2.18 请求收货地址列表
export const getShippingsList = () => ajax(BASE_URL + "/api/shippingslist");

//2.17 单个收货地址的删除
export const delAddressSingle = rec_id =>
  ajax(BASE_URL + "/api/del_address_single", { rec_id }, "POST");

//2.18 新增收货地址
export const addAddress = (
  rec_name,
  rec_phone,
  rec_province,
  rec_city,
  rec_district,
  rec_address,
  rec_zip
) =>
  ajax(
    BASE_URL + "/api/add_shippings",
    {
      rec_name,
      rec_phone,
      rec_province,
      rec_city,
      rec_district,
      rec_address,
      rec_zip
    },
    "POST"
  );
