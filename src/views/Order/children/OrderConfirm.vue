<template>
  <div class="orderconfirm-page">
    <order-header title="订单确认">
      <template v-slot:tip>
        <span>请认真填写收获地址</span>
      </template>
    </order-header>
    <div class="confirm-container clearfix">
      <!-- 收货地址 -->
      <div class="shipping-address">
        <h2 class="address-title">收货地址</h2>
        <div class="address-box">
          <ul>
            <li
              :class="{ selected: currentIndex === index }"
              @click.stop="clickAddr(index)"
              v-for="(item, index) in shippingslist"
              :key="index"
            >
              <div class="shipping-info">
                <h2 class="addr-name">{{ item.rec_name }}</h2>
                <p class="addr-phone">{{ item.rec_phone }}</p>
                <p class="address">
                  {{
                    item.rec_province +
                      " " +
                      item.rec_city +
                      " " +
                      item.rec_district +
                      " " +
                      item.rec_address
                  }}
                </p>
              </div>
              <div class="action">
                <a href="javascript:;" @click.stop="delAddress(item)">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-delete"></use>
                  </svg>
                </a>
                <a href="javascript:;" @click.stop="editAddressModal(item)">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-edit"></use>
                  </svg>
                </a>
              </div>
            </li>
          </ul>
          <ul>
            <li class="add-adr" @click.stop="openAddressModal">
              <div class="add">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-Add"></use>
                </svg>
                <h3>添加新地址</h3>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 商品列表 -->
      <div class="goods-list">
        <h3>商品</h3>
        <ul v-if="cartList.length > 0">
          <li v-for="(item, index) in cartList" :key="index">
            <div class="item-name">
              <img v-lazy="item.thumb_url" />
              <p>{{ item.goods_name }}</p>
            </div>
            <div class="item-num">
              <span>{{ item.price | moneyFormat() }}</span
              >元×<span>{{ item.buy_count }}</span>
            </div>
            <div class="item-total">
              <span>{{ (item.price * item.buy_count) | moneyFormat() }}</span
              >元
            </div>
          </li>
        </ul>
      </div>
      <!-- 配送方式 -->
      <div class="shipping-method">
        <h2>配送方式</h2>
        <span>包邮</span>
      </div>
      <!-- 结算 -->
      <div class="settlement">
        <ul>
          <li>
            商品件数：<span>{{ totalCount }}件</span>
          </li>
          <li>
            商品总价：<span>{{ totalPrice | moneyFormat() }}元</span>
          </li>
          <li>运费：<span>0元</span></li>
          <li>
            应付：<span>{{ totalPrice | moneyFormat() }}元</span>
          </li>
        </ul>
      </div>
      <!-- 选择 -->
      <div class="operation">
        <button class="backbtn" @click="$router.replace('/shoppingcart')">
          返回购物车
        </button>
        <button class="clearbtn" @click="orderSubmit">去结算</button>
      </div>
    </div>
    <modal
      title="删除确认"
      btnType="1"
      :showModal="showDelModal"
      @submit="submitAddress"
      @cancel="showDelModal = false"
    >
      <template v-slot:body>
        <p>您确认要删除此地址吗？</p>
      </template>
    </modal>

    <modal
      title="新增确认"
      btnType="1"
      :showModal="showEditModal"
      @submit="submitAddress"
      @cancel="showEditModal = false"
    >
      <template v-slot:body>
        <div class="edit-wrap">
          <div class="item">
            <input
              type="text"
              placeholder="姓名"
              v-model="checkItem.rec_name"
            />
            <input
              type="text"
              placeholder="手机号"
              maxlength="11"
              v-model="checkItem.rec_phone"
            />
          </div>
          <div class="item">
            <select name="province" v-model="checkItem.rec_province">
              <option value="广东省">广东省</option>
              <option value="上海省">上海省</option>
              <option value="北京省">北京省</option>
              <option value="天津省">天津省</option>
              <option value="河北省">河北省</option>
            </select>
            <select name="city" v-model="checkItem.rec_city">
              <option value="广州市">广州市</option>
              <option value="中山市">中山市</option>
              <option value="北京市">北京市</option>
              <option value="深圳市">深圳市</option>
              <option value="石家庄">石家庄</option>
            </select>
            <select name="district" v-model="checkItem.rec_district">
              <option value="天河区">天河区</option>
              <option value="海珠区">海珠区</option>
              <option value="番禺区">番禺区</option>
              <option value="白云区">白云区</option>
              <option value="五桂山镇">五桂山镇</option>
            </select>
          </div>
          <div class="item">
            <textarea
              name="street"
              placeholder="详细地址"
              v-model="checkItem.rec_address"
            ></textarea>
          </div>
          <div class="item">
            <input type="text" placeholder="邮编" v-model="checkItem.rec_zip" />
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Message, MessageBox } from "element-ui";
import { delAddressSingle, addAddress } from "../../../api/index";
import OrderHeader from "../../../components/OrderHeader";
import Modal from "../../../components/Modal";
export default {
  name: "orderConfirm",
  components: {
    OrderHeader,
    Modal
  },
  data() {
    return {
      showDelModal: false, //是否显示删除弹框
      showEditModal: false, //是否显示新增或编辑弹框
      currentIndex: -1, //当前选中的地址
      list: [], //收货地址列表
      checkItem: {},
      userAction: "" //用户行为 0 新增，1 编辑，2 删除
    };
  },
  mounted() {
    //请求购物车商品数据
    this.$store.dispatch("reqCartGoods");

    //请求收货地址列表数据
    this.$store.dispatch("reqShippingsList");
  },
  computed: {
    ...mapState(["cartgoods", "shippingslist"]), //获取购物车数据

    //购物车中需要结算的商品列表
    cartList() {
      return this.cartgoods.filter(item => item.is_checked);
    },
    //计算商品的总件数
    totalCount() {
      let totalCount = 0;
      //3.1遍历
      this.cartList.forEach((goods, index) => {
        totalCount += goods.buy_count;
      });
      return totalCount;
    },
    //计算商品的总价格
    totalPrice() {
      let totalPrice = 0;
      //3.1遍历
      this.cartList.forEach((goods, index) => {
        totalPrice += goods.price * goods.buy_count;
      });
      return totalPrice;
    }
  },
  //过滤器
  filters: {
    // 格式化金钱
    moneyFormat(money) {
      if (!money) return "0.00";
      return Number(money).toFixed(2);
    }
  },
  methods: {
    //点击地址栏
    clickAddr(flag) {
      this.currentIndex = flag;
    },
    //打开新增地址弹框
    openAddressModal() {
      this.userAction = 0;
      this.checkItem = {};
      this.showEditModal = true;
    },
    //点击编辑新增地址
    editAddressModal(addressItem) {
      this.userAction = 1;
      this.checkItem = addressItem;
      console.log(this.checkItem);
      this.showEditModal = true;
    },
    //删除单个地址
    delAddress(addressItem) {
      this.checkItem = addressItem;
      this.userAction = 2;
      this.showDelModal = true;
    },
    async submitAddress() {
      let { checkItem, userAction } = this;
      let {
        rec_name,
        rec_phone,
        rec_province,
        rec_city,
        rec_district,
        rec_address,
        rec_zip
      } = checkItem;
      if (userAction === 0) {
        //新增地址
        if (!rec_name) {
          Message.error("请输入收货人名称!");
          return;
        } else if (!rec_phone || !/^[1][3,4,5,7,8][0-9]{9}$/.test(rec_phone)) {
          Message.error("请输入正确格式的手机号");
          return;
        } else if (!rec_province) {
          Message.error("请选择省份");
          return;
        } else if (!rec_city) {
          Message.error("请选择对应的城市");
          return;
        } else if (!rec_district || !rec_address) {
          Message.error("请输入收货地址");
          return;
        } else if (!/\d{6}/.test(rec_zip)) {
          Message.error("请输入六位邮编");
          return;
        }

        const result = await addAddress(
          rec_name,
          rec_phone,
          rec_province,
          rec_city,
          rec_district,
          rec_address,
          rec_zip
        );
        if (result) {
          Message.success("操作成功");
          this.closeModal();
        }
      } else if (userAction === 2) {
        //删除
        this.$store.dispatch("delAddressSingle", { checkItem });
        let result = await delAddressSingle(checkItem.rec_id);
        Message.success("操作成功");
        this.closeModal();
      } else {
      }

      if (userAction === 0 || userAction === 1) {
        let errMsg = "";
        if (!rec_name) {
          errMsg = "请输入收货人名称!";
        } else if (!rec_phone || !/^[1][3,4,5,7,8][0-9]{9}$/.test(rec_phone)) {
          errMsg = "请输入正确格式的手机号";
        } else if (!rec_province) {
          errMsg = "请选择省份";
        } else if (!rec_city) {
          errMsg = "请选择对应的城市";
        } else if (!rec_district || !rec_address) {
          errMsg = "请输入收货地址";
        } else if (!/\d{6}/.test(rec_zip)) {
          errMsg = "请输入六位邮编";
        }

        if (errMsg) {
          Message.error(errMsg);
          return;
        }
      }
    },
    //关闭弹窗
    closeModal() {
      this.checkItem = {};
      this.userAction = 0;
      this.showDelModal = false;
      this.showEditModal = false;
    },

    //订单提交
    orderSubmit() {
      let item = this.shippingslist[this.currentIndex];
      if (!item) {
        Message.error("请选择一个收货地址");
        return;
      }
      this.$router.push("/order/pay");
    }
  }
};
</script>

<style lang="stylus">
.clearfix:after
  content ''
  display block
  clear both
  zoom 1
.orderconfirm-page
  width 100%
  height auto
  .edit-wrap
    font-size 14px
    .item
      margin-bottom 15px
      input
        display inline-block
        width 280px
        height 40px
        line-height 40px
        padding-left 15px
        border 1px solid #e1e1e1
        border-radius 4px
        &:nth-child(2)
          margin-left 14px
        &:focus
          outline none
      select
        height 40px
        line-height 40px
        border 1px solid #e1e1e1
        margin-right 15px
        padding 0 15px
        background #fff
        &:focus
          outline none
      textarea
        height 62px
        width 100%
        padding 13px 15px
        box-sizing border-box
        border 1px solid #e1e1e1
        &:focus
          outline none

  .confirm-container
    width 1190px
    background #fff
    margin 50px auto 80px
    padding-top 42px
    border-radius 4px
    .shipping-address
      padding 0 42px
      .address-title
        font-size 20px
        font-weight 300
        color #333
        margin-bottom 21px
      .address-box
        display flex
        flex-wrap wrap
        ul
          display inline-block
          .add-adr
            position relative
            .add
              position absolute
              left 50%
              top 50%
              transform translate(-50%, -50%)
              text-align center
              .icon
                font-size 38px
                margin-bottom 8px
              h3
                font-size 14px
                color #999
          li
            float left
            border 1px solid #e1e1e1
            border-radius 4px
            width 260px
            height 180px
            color #757575
            margin-right 15px
            margin-bottom 15px
            padding 15px 24px
            cursor pointer
            &.selected
              border 1px solid #ed462f
            .shipping-info
              height 80%
              .addr-name
                height 27px
                font-size 18px
                font-weight 300
                color #333
                margin-bottom 6px
              .addr-phone
                font-size 14px
                color #757575
                line-height 1.3em
              .address
                font-size 14px
                line-height 1.3em
                color #757575
                height 50px
            .action
              display flex
              justify-content space-between
              .icon
                font-size 25px
                color #666
                margin 8px 0
                &:hover
                  color #ed462f
    .goods-list
      margin 30px 0
      padding 0 42px
      h3
        font-size 18px
        color #333
        font-weight bold
        padding-bottom 10px
      ul
        border-top 1px solid #e1e1e1
        border-bottom 1px solid #e1e1e1
        li
          padding 8px 18px 8px 0
          display flex
          align-items center
          border-bottom 1px dashed #e1e1e1
          &:last-child
            border-bottom none
          .item-name
            width 700px
            display flex
            align-items center
            img
              width 50px
              margin-right 16px
          .item-num
            width 150px
            text-align right
          .item-total
            width 300px
            text-align right
            color #ed462f
    .shipping-method
      line-height 20px
      padding 0 42px
      h2
        display inline-block
        margin-right 70px
        font-size 20px
        width 80px
        font-weight bold
      span
        color #ed462f
    .settlement
      margin-top 50px
      padding 0 42px
      text-align right
      ul
        li
          text-align right
          font-size 16px
          color #666
          line-height 2em
          span
            color #ed462f
            display inline-block
            width 150px
          &:last-child
            margin-top 24px
            span
              font-size 28px
    .operation
      margin-top 40px
      padding 0 42px
      height 125px
      line-height 125px
      text-align right
      border-top 1px solid #e1e1e1
      button
        width 200px
        border none
        height 50px
        color #fff
        font-size 18px
        margin-left 20px
        border-radius 4px
        cursor pointer
        &:focus
          outline none
      .backbtn
        background #B0B0B0
      .clearbtn
        background #20bfa9
</style>
