"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_up_search2 = common_vendor.resolveComponent("up-search");
  const _easycom_up_swiper2 = common_vendor.resolveComponent("up-swiper");
  const _easycom_up_waterfall2 = common_vendor.resolveComponent("up-waterfall");
  (_easycom_up_search2 + _easycom_up_swiper2 + _easycom_up_waterfall2)();
}
const _easycom_up_search = () => "../../node-modules/uview-plus/components/u-search/u-search.js";
const _easycom_up_swiper = () => "../../node-modules/uview-plus/components/u-swiper/u-swiper.js";
const _easycom_up_waterfall = () => "../../node-modules/uview-plus/components/u-waterfall/u-waterfall.js";
if (!Math) {
  (_easycom_up_search + _easycom_up_swiper + _easycom_up_waterfall)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const systemInfo = common_vendor.wx$1.getSystemInfoSync();
    const menuButtonInfo = common_vendor.wx$1.getMenuButtonBoundingClientRect();
    common_vendor.index.__f__("log", "at pages/home/index.vue:81", systemInfo.statusBarHeight, "状态栏的高度");
    common_vendor.index.__f__("log", "at pages/home/index.vue:82", menuButtonInfo.top - systemInfo.statusBarHeight, "胶囊顶部到状态栏的高度");
    const customNavBarHeight = systemInfo.statusBarHeight + (menuButtonInfo.top - systemInfo.statusBarHeight);
    const currentAddress = common_vendor.ref("定位中...");
    const keyword = common_vendor.ref();
    const list = common_vendor.reactive([
      "/static/swiper/swiper(1).png",
      "/static/swiper/swiper(2).png",
      "/static/swiper/swiper(3).png",
      "/static/swiper/swiper(4).png",
      "/static/swiper/swiper(5).png",
      "/static/swiper/swiper(6).png"
    ]);
    const categoryList = common_vendor.ref([
      {
        id: 1,
        name: "狗粮专区",
        icon: "../../static/dogfood.png"
      },
      {
        id: 2,
        name: "猫粮专区",
        icon: "../../static/catfood.png"
      },
      {
        id: 3,
        name: "零食专区",
        icon: "../../static/pettreat.png"
      },
      {
        id: 4,
        name: "营养保健",
        icon: "../../static/nutrition.png"
      },
      {
        id: 5,
        name: "宠物玩具",
        icon: "../../static/pettoy.png"
      },
      {
        id: 6,
        name: "洗护用品",
        icon: "../../static/toiletries.png"
      },
      {
        id: 7,
        name: "宠物用品",
        icon: "../../static/petsupplies.png"
      },
      {
        id: 8,
        name: "水族专区",
        icon: "../../static/aquarium.png"
      }
    ]);
    common_vendor.ref([
      {
        id: 1,
        image: "../../static/goods/热门(1).png",
        title: "皇家幼犬狗粮",
        price: "168"
      },
      {
        id: 2,
        image: "../../static/goods/热门(2).png",
        title: "喵星人猫粮",
        price: "199"
      },
      {
        id: 3,
        image: "../../static/goods/热门(3).png",
        title: "鸡肉干零食",
        price: "58"
      },
      {
        id: 4,
        image: "../../static/goods/热门(1).png",
        title: "金毛犬狗粮",
        price: "168"
      },
      {
        id: 5,
        image: "../../static/goods/热门(2).png",
        title: "英短猫粮",
        price: "220"
      },
      {
        id: 6,
        image: "../../static/goods/热门(3).png",
        title: "牛肉咬胶",
        price: "35"
      }
    ]);
    const categoryClick = (id) => {
      common_vendor.index.__f__("log", "at pages/home/index.vue:186", "点击分类:", id);
      common_vendor.index.navigateTo({
        url: `/pages/goods/index?categoryId=${id}`
      });
    };
    const recommendList = common_vendor.ref([
      {
        id: 1,
        img: "../../static/goods/热门(1).png",
        title: "皇家幼犬狗粮",
        subtitle: "营养均衡配方",
        price: "168"
      },
      {
        id: 2,
        img: "../../static/goods/热门(2).png",
        title: "喵星人猫粮",
        subtitle: "添加牛磺酸",
        price: "199"
      },
      {
        id: 3,
        img: "../../static/goods/热门(3).png",
        title: "鸡肉干零食",
        subtitle: "无添加剂",
        price: "58"
      },
      {
        id: 4,
        img: "../../static/goods/热门(17).png",
        title: "金毛犬狗粮",
        subtitle: "营养均衡配方",
        price: "168"
      },
      {
        id: 5,
        img: "../../static/goods/热门(18).png",
        title: "金毛犬狗粮",
        subtitle: "营养均衡配方",
        price: "168"
      }
    ]);
    const flowList = common_vendor.ref([
      {
        id: 1,
        image: "../../static/goods/热门(29).png",
        title: "皇家幼犬狗粮",
        sales: "1.2万",
        tag: "新品",
        price: "168"
      },
      {
        id: 2,
        image: "../../static/goods/热门(30).png",
        title: "喵星人猫粮",
        sales: "1.2万",
        tag: "新品",
        price: "199"
      },
      {
        id: 3,
        image: "../../static/goods/热门(3).png",
        title: "鸡肉干零食",
        sales: "1.2万",
        tag: "热销",
        price: "58"
      },
      {
        id: 4,
        image: "../../static/goods/热门(1).png",
        title: "金毛犬狗粮",
        sales: "1.2万",
        tag: "热销",
        price: "168"
      },
      {
        id: 5,
        image: "../../static/goods/热门(2).png",
        title: "英短猫粮",
        sales: "1.2万",
        tag: "新品",
        price: "220"
      },
      {
        id: 6,
        image: "../../static/goods/热门(3).png",
        title: "牛肉咬胶",
        sales: "1.2万",
        tag: "爆品",
        price: "35"
      }
    ]);
    const getLocation = () => {
      common_vendor.index.getLocation({
        type: "wgs84",
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/home/index.vue:287", "获取位置成功:", res);
          currentAddress.value = res.address;
        },
        fail: (err) => {
          common_vendor.index.__f__("log", "at pages/home/index.vue:291", "获取位置失败:", err);
          if (err.errMsg.includes("auth deny") || err.errMsg.includes("unauthorized")) {
            handleAuthDeny();
          } else {
            err = "定位失败，请稍后重试";
          }
        }
      });
    };
    const handleAuthDeny = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "请允许小程序获取您的位置信息",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.openSetting({
              success: (res2) => {
                common_vendor.index.__f__("log", "at pages/home/index.vue:309", "打开设置成功:", res2);
              },
              fail: (err) => {
                common_vendor.index.__f__("log", "at pages/home/index.vue:312", "打开设置失败:", err);
              }
            });
          }
        }
      });
    };
    common_vendor.onMounted(() => {
      getLocation();
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.t(currentAddress.value),
        c: common_vendor.o(($event) => keyword.value = $event),
        d: common_vendor.p({
          placeholder: "搜索宠物食品",
          animation: true,
          modelValue: keyword.value
        }),
        e: common_vendor.p({
          list,
          previousMargin: "30",
          nextMargin: "30",
          circular: true,
          autoplay: false,
          radius: "5",
          bgColor: "#ffffff",
          height: "180"
        }),
        f: common_vendor.f(categoryList.value, (item, k0, i0) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.name),
            c: item.id,
            d: common_vendor.o(($event) => categoryClick(item.id), item.id)
          };
        }),
        g: common_vendor.f(recommendList.value, (item, k0, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.subtitle),
            d: common_vendor.t(item.price),
            e: item.id
          };
        }),
        h: common_assets._imports_0$1,
        i: common_vendor.w(({
          colList,
          colIndex
        }, s0, i0) => {
          return {
            a: common_vendor.f(colList, (item, index, i1) => {
              return {
                a: item.image,
                b: common_vendor.t(item.title),
                c: common_vendor.t(item.sales),
                d: common_vendor.t(item.price),
                e: index
              };
            }),
            b: i0,
            c: s0
          };
        }, {
          name: "column",
          path: "i",
          vueId: "4978fed5-2"
        }),
        j: common_assets._imports_0$1,
        k: common_vendor.sr("waterfall", "4978fed5-2"),
        l: common_vendor.o(($event) => flowList.value = $event),
        m: common_vendor.p({
          columns: "2",
          modelValue: flowList.value
        }),
        n: customNavBarHeight + "px"
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4978fed5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/index.js.map
