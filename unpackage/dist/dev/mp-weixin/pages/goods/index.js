"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_up_search2 = common_vendor.resolveComponent("up-search");
  const _easycom_up_tabs2 = common_vendor.resolveComponent("up-tabs");
  const _easycom_up_sticky2 = common_vendor.resolveComponent("up-sticky");
  const _easycom_up_image2 = common_vendor.resolveComponent("up-image");
  (_easycom_up_search2 + _easycom_up_tabs2 + _easycom_up_sticky2 + _easycom_up_image2)();
}
const _easycom_up_search = () => "../../node-modules/uview-plus/components/u-search/u-search.js";
const _easycom_up_tabs = () => "../../node-modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_up_sticky = () => "../../node-modules/uview-plus/components/u-sticky/u-sticky.js";
const _easycom_up_image = () => "../../node-modules/uview-plus/components/u-image/u-image.js";
if (!Math) {
  (_easycom_up_search + _easycom_up_tabs + _easycom_up_sticky + _easycom_up_image)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const keyword = common_vendor.ref();
    const currentTab = common_vendor.ref(0);
    const listTabs = common_vendor.ref([
      { name: "狗粮专区" },
      { name: "猫粮专区" },
      { name: "零食专区" },
      { name: "营养保健" },
      { name: "宠物玩具" },
      { name: "洗护用品" },
      { name: "宠物用品" },
      { name: "水族用品" }
    ]);
    const tabList = common_vendor.ref([
      {
        title: "狗粮专区",
        children: [
          { title: "皇家幼犬狗粮", cover: "/static/goods/热门(1).png", price: 168 },
          { title: "金毛犬狗粮", cover: "/static/goods/热门(2).png", price: 168 },
          { title: "金毛犬狗粮", cover: "/static/goods/热门(2).png", price: 168 },
          { title: "金毛犬狗粮", cover: "/static/goods/热门(2).png", price: 168 },
          { title: "金毛犬狗粮", cover: "/static/goods/热门(2).png", price: 168 },
          { title: "金毛犬狗粮", cover: "/static/goods/热门(2).png", price: 168 }
        ]
      },
      {
        title: "猫粮专区",
        children: [
          { title: "喵星人猫粮", cover: "/static/goods/热门(3).png", price: 199 },
          { title: "英短猫粮", cover: "/static/goods/热门(1).png", price: 220 }
        ]
      },
      {
        title: "零食专区",
        children: [
          { title: "鸡肉干零食", cover: "/static/goods/热门(2).png", price: 58 },
          { title: "牛肉咬胶", cover: "/static/goods/热门(3).png", price: 35 }
        ]
      },
      {
        title: "营养保健",
        children: [
          { title: "营养膏", cover: "/static/goods/热门(1).png", price: 88 },
          { title: "维生素片", cover: "/static/goods/热门(2).png", price: 99 }
        ]
      },
      {
        title: "宠物玩具",
        children: [
          { title: "磨牙玩具", cover: "/static/goods/热门(3).png", price: 38 },
          { title: "互动球", cover: "/static/goods/热门(1).png", price: 45 }
        ]
      },
      {
        title: "洗护用品",
        children: [
          { title: "宠物洗发水", cover: "/static/goods/热门(2).png", price: 68 },
          { title: "宠物梳子", cover: "/static/goods/热门(3).png", price: 25 }
        ]
      },
      {
        title: "宠物用品",
        children: [
          { title: "宠物窝", cover: "/static/goods/热门(1).png", price: 128 },
          { title: "宠物碗", cover: "/static/goods/热门(2).png", price: 48 }
        ]
      },
      {
        title: "水族用品",
        children: [
          { title: "鱼缸", cover: "/static/goods/热门(3).png", price: 288 },
          { title: "鱼食", cover: "/static/goods/热门(1).png", price: 58 }
        ]
      }
    ]);
    const handleTabs = (item) => {
      common_vendor.index.__f__("log", "at pages/goods/index.vue:113", "选中标签:", item);
      currentTab.value = item.index;
    };
    return (_ctx, _cache) => {
      var _a;
      return {
        a: common_vendor.o(($event) => keyword.value = $event),
        b: common_vendor.p({
          placeholder: "搜索宠物食品",
          animation: true,
          modelValue: keyword.value
        }),
        c: common_vendor.o(handleTabs),
        d: common_vendor.p({
          list: listTabs.value,
          current: currentTab.value,
          lineColor: "#ff6b35",
          activeStyle: {
            color: "#ff6b35",
            fontWeight: "bold",
            transform: "scale(1.05)"
          },
          inactiveStyle: {
            color: "#8997aa",
            transform: "scale(1)"
          }
        }),
        e: common_vendor.p({
          bgColor: "#fff"
        }),
        f: common_vendor.f((_a = tabList.value[currentTab.value]) == null ? void 0 : _a.children, (item, index, i0) => {
          return {
            a: "24a31e85-3-" + i0,
            b: common_vendor.p({
              src: item.cover,
              width: "100%",
              height: "160px",
              radius: "8px"
            }),
            c: common_vendor.t(item.title),
            d: common_vendor.t(item.price),
            e: index
          };
        }),
        g: common_assets._imports_0$1
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-24a31e85"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/goods/index.js.map
