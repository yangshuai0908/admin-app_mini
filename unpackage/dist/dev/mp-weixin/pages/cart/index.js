"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_up_empty2 = common_vendor.resolveComponent("up-empty");
  const _easycom_up_notice_bar2 = common_vendor.resolveComponent("up-notice-bar");
  (_easycom_up_empty2 + _easycom_up_notice_bar2)();
}
const _easycom_up_empty = () => "../../node-modules/uview-plus/components/u-empty/u-empty.js";
const _easycom_up_notice_bar = () => "../../node-modules/uview-plus/components/u-notice-bar/u-notice-bar.js";
if (!Math) {
  (_easycom_up_empty + _easycom_up_notice_bar)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const systemInfo = common_vendor.wx$1.getSystemInfoSync();
    const menuButtonInfo = common_vendor.wx$1.getMenuButtonBoundingClientRect();
    const customNavBarHeight = systemInfo.statusBarHeight + (menuButtonInfo.top - systemInfo.statusBarHeight);
    const text = common_vendor.ref("uview-plus UI众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让您快速集成，开箱即用");
    const cartList = common_vendor.ref([
      {
        id: 1,
        title: "皇家幼犬狗粮",
        spec: "规格：2.5kg",
        price: "168",
        image: "../../static/goods/热门(1).png",
        quantity: 1,
        selected: true
      },
      {
        id: 2,
        title: "喵星人猫粮",
        spec: "规格：1.8kg",
        price: "199",
        image: "../../static/goods/热门(2).png",
        quantity: 2,
        selected: true
      },
      {
        id: 3,
        title: "鸡肉干零食",
        spec: "规格：500g",
        price: "58",
        image: "../../static/goods/热门(3).png",
        quantity: 1,
        selected: false
      }
    ]);
    const recommendList = common_vendor.ref([
      {
        id: 4,
        title: "金毛犬狗粮",
        price: "168",
        image: "../../static/goods/热门(1).png"
      },
      {
        id: 5,
        title: "英短猫粮",
        price: "220",
        image: "../../static/goods/热门(2).png"
      },
      {
        id: 6,
        title: "牛肉咬胶",
        price: "35",
        image: "../../static/goods/热门(3).png"
      },
      {
        id: 7,
        title: "营养膏",
        price: "88",
        image: "../../static/goods/热门(1).png"
      }
    ]);
    const isAllSelected = common_vendor.computed(() => {
      return cartList.value.length > 0 && cartList.value.every((item) => item.selected);
    });
    const selectedCount = common_vendor.computed(() => {
      return cartList.value.filter((item) => item.selected).length;
    });
    const totalPrice = common_vendor.computed(() => {
      return cartList.value.filter((item) => item.selected).reduce((total, item) => {
        return total + parseFloat(item.price) * item.quantity;
      }, 0).toFixed(2);
    });
    const toggleSelectAll = () => {
      const newSelected = !isAllSelected.value;
      cartList.value.forEach((item) => {
        item.selected = newSelected;
      });
    };
    const toggleSelect = (index) => {
      cartList.value[index].selected = !cartList.value[index].selected;
    };
    const increaseQuantity = (index) => {
      cartList.value[index].quantity++;
    };
    const decreaseQuantity = (index) => {
      if (cartList.value[index].quantity > 1) {
        cartList.value[index].quantity--;
      }
    };
    const onQuantityInput = (index) => {
      let quantity = parseInt(cartList.value[index].quantity) || 1;
      if (quantity < 1)
        quantity = 1;
      if (quantity > 99)
        quantity = 99;
      cartList.value[index].quantity = quantity;
    };
    const deleteItem = (index) => common_vendor.index.showModal({
      title: "提示",
      content: "确定要删除这个商品吗？",
      success: (res) => {
        if (res.confirm) {
          cartList.value.splice(index, 1);
          common_vendor.index.showToast({
            title: "删除成功",
            icon: "success"
          });
        }
      }
    });
    const addToCart = (item) => {
      const existingItem = cartList.value.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cartList.value.push({
          ...item,
          spec: "规格：默认",
          quantity: 1,
          selected: true
        });
      }
      common_vendor.index.showToast({
        title: "已加入购物车",
        icon: "success"
      });
    };
    const goToHome = () => {
      common_vendor.index.switchTab({
        url: "/pages/home/index"
      });
    };
    const settlement = () => {
      if (selectedCount.value === 0) {
        common_vendor.index.showToast({
          title: "请选择商品",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showModal({
        title: "确认结算",
        content: `共${selectedCount.value}件商品，总计￥${totalPrice.value}`,
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "正在跳转支付...",
              icon: "loading"
            });
          }
        }
      });
    };
    common_vendor.onMounted(() => {
      common_vendor.index.__f__("log", "at pages/cart/index.vue:287", "购物车页面加载完成");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(cartList.value.length),
        b: customNavBarHeight + "px",
        c: cartList.value.length === 0
      }, cartList.value.length === 0 ? {
        d: common_vendor.p({
          mode: "car",
          icon: "http://cdn.uviewui.com/uview/empty/car.png"
        }),
        e: common_vendor.o(goToHome)
      } : {
        f: common_vendor.p({
          text: text.value,
          mode: "closable"
        }),
        g: common_vendor.f(cartList.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.selected
          }, item.selected ? {} : {}, {
            b: item.selected ? 1 : "",
            c: common_vendor.o(($event) => toggleSelect(index), item.id),
            d: item.image,
            e: common_vendor.t(item.title),
            f: common_vendor.t(item.spec),
            g: common_vendor.t(item.price),
            h: common_vendor.o(($event) => decreaseQuantity(index), item.id),
            i: item.quantity <= 1 ? 1 : "",
            j: common_vendor.o([($event) => item.quantity = $event.detail.value, ($event) => onQuantityInput(index)], item.id),
            k: item.quantity,
            l: common_vendor.o(($event) => increaseQuantity(index), item.id),
            m: common_vendor.o(($event) => deleteItem(index), item.id),
            n: item.id
          });
        }),
        h: common_assets._imports_0$2,
        i: common_vendor.f(recommendList.value, (item, k0, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.price),
            d: item.id,
            e: common_vendor.o(($event) => addToCart(item), item.id)
          };
        })
      }, {
        j: cartList.value.length > 0
      }, cartList.value.length > 0 ? common_vendor.e({
        k: isAllSelected.value
      }, isAllSelected.value ? {} : {}, {
        l: isAllSelected.value ? 1 : "",
        m: common_vendor.o(toggleSelectAll),
        n: common_vendor.t(totalPrice.value),
        o: common_vendor.t(selectedCount.value),
        p: common_vendor.o(settlement),
        q: selectedCount.value === 0 ? 1 : ""
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8039fbf1"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/cart/index.js.map
