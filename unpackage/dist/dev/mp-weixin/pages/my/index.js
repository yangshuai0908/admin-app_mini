"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_up_sticky2 = common_vendor.resolveComponent("up-sticky");
  _easycom_up_sticky2();
}
const _easycom_up_sticky = () => "../../node-modules/uview-plus/components/u-sticky/u-sticky.js";
if (!Math) {
  _easycom_up_sticky();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const systemInfo = common_vendor.wx$1.getSystemInfoSync();
    const menuButtonInfo = common_vendor.wx$1.getMenuButtonBoundingClientRect();
    const customNavBarHeight = systemInfo.statusBarHeight + (menuButtonInfo.top - systemInfo.statusBarHeight);
    const userInfo = common_vendor.ref({
      avatar: "../../static/avatar.png",
      nickname: "宠物爱好者",
      phone: "138****8888",
      level: "黄金会员",
      points: 1280,
      coupons: 5,
      balance: "168.50"
    });
    const isLoggedIn = common_vendor.ref(true);
    const unreadCount = common_vendor.ref(3);
    const orderTabs = common_vendor.ref([
      { type: "unpaid", text: "待付款", icon: "../../static/my/代付款.png", count: 2 },
      { type: "unshipped", text: "待发货", icon: "../../static/my/代发货.png", count: 1 },
      { type: "shipped", text: "待收货", icon: "../../static/my/代收货.png", count: 3 },
      { type: "completed", text: "已完成", icon: "../../static/my/已完成.png", count: 0 },
      { type: "review", text: "待评价", icon: "../../static/my/待评价.png", count: 1 }
    ]);
    const serviceList = common_vendor.ref([
      { id: 1, text: "我的收藏", icon: "../../static/my/我的收藏.png", url: "/pages/my/favorites" },
      { id: 2, text: "浏览历史", icon: "../../static/my/浏览历史.png", url: "/pages/my/history" },
      { id: 3, text: "地址管理", icon: "../../static/my/地址管理.png", url: "/pages/my/address" },
      { id: 4, text: "优惠券", icon: "../../static/my/优惠券.png", url: "/pages/my/coupons" },
      { id: 5, text: "积分商城", icon: "../../static/my/积分商城.png", url: "/pages/my/points" },
      { id: 6, text: "客服中心", icon: "../../static/my/客服中心.png", url: "/pages/my/service" },
      { id: 7, text: "帮助中心", icon: "../../static/my/帮助中心.png", url: "/pages/my/help" },
      { id: 8, text: "邀请好友", icon: "../../static/my/邀请好友.png", url: "/pages/my/invite" }
    ]);
    const otherList = common_vendor.ref([
      { id: 1, text: "关于我们", icon: "../../static/my/关于我们.png", url: "/pages/my/about" },
      { id: 2, text: "隐私政策", icon: "../../static/my/隐私政策.png", url: "/pages/my/privacy" },
      { id: 3, text: "用户协议", icon: "../../static/my/用户协议.png", url: "/pages/my/agreement" }
    ]);
    const goToProfile = () => {
      if (!isLoggedIn.value) {
        goToLogin();
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/my/profile"
      });
    };
    const goToLogin = () => {
      common_vendor.index.__f__("log", "at pages/my/index.vue:161", "点击登录被触发，当前登录状态:", isLoggedIn.value);
      common_vendor.index.navigateTo({
        url: "/pages/login/index",
        success: () => {
          common_vendor.index.__f__("log", "at pages/my/index.vue:167", "跳转成功");
        },
        fail: (err) => {
          common_vendor.index.__f__("log", "at pages/my/index.vue:170", "跳转失败:", err);
          common_vendor.index.showToast({
            title: "跳转失败",
            icon: "none"
          });
        }
      });
    };
    const goToOrderList = (type) => {
      common_vendor.index.navigateTo({
        url: `/pages/order/list?type=${type}`
      });
    };
    const handleServiceClick = (item) => {
      if (item.url) {
        common_vendor.index.navigateTo({
          url: item.url
        });
      } else {
        common_vendor.index.showToast({
          title: "功能开发中",
          icon: "none"
        });
      }
    };
    const handleOtherClick = (item) => {
      if (item.url) {
        common_vendor.index.navigateTo({
          url: item.url
        });
      } else {
        common_vendor.index.showToast({
          title: "功能开发中",
          icon: "none"
        });
      }
    };
    const logout = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            try {
              common_vendor.index.removeStorageSync("isLoggedIn");
              common_vendor.index.removeStorageSync("userInfo");
            } catch (e) {
              common_vendor.index.__f__("log", "at pages/my/index.vue:222", "清除存储失败:", e);
            }
            userInfo.value = {
              avatar: "../../static/default-avatar.png",
              nickname: "未登录",
              phone: "点击登录",
              level: "",
              points: 0,
              coupons: 0,
              balance: "0.00"
            };
            isLoggedIn.value = false;
            unreadCount.value = 0;
            common_vendor.index.showToast({
              title: "退出成功",
              icon: "success"
            });
            setTimeout(() => {
              common_vendor.index.reLaunch({
                url: "/pages/login/index"
              });
            }, 1500);
          }
        }
      });
    };
    const checkLoginStatus = () => {
      try {
        const isLoggedInStorage = common_vendor.index.getStorageSync("isLoggedIn");
        const userInfoStorage = common_vendor.index.getStorageSync("userInfo");
        common_vendor.index.__f__("log", "at pages/my/index.vue:260", "存储的登录状态:", isLoggedInStorage);
        common_vendor.index.__f__("log", "at pages/my/index.vue:261", "存储的用户信息:", userInfoStorage);
        if (isLoggedInStorage && userInfoStorage) {
          isLoggedIn.value = true;
          userInfo.value = userInfoStorage;
          common_vendor.index.__f__("log", "at pages/my/index.vue:266", "设置登录状态为true，用户信息已更新");
        } else {
          isLoggedIn.value = false;
          userInfo.value = {
            avatar: "../../static/default-avatar.png",
            nickname: "未登录",
            phone: "点击登录",
            level: "",
            points: 0,
            coupons: 0,
            balance: "0.00"
          };
          common_vendor.index.__f__("log", "at pages/my/index.vue:278", "设置登录状态为false，使用默认用户信息");
        }
      } catch (e) {
        common_vendor.index.__f__("log", "at pages/my/index.vue:281", "检查登录状态失败:", e);
        isLoggedIn.value = false;
      }
    };
    common_vendor.onMounted(() => {
      common_vendor.index.__f__("log", "at pages/my/index.vue:287", "我的页面加载完成");
      checkLoginStatus();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: customNavBarHeight + "px",
        b: userInfo.value.avatar,
        c: common_assets._imports_0$3,
        d: common_vendor.o(goToProfile),
        e: common_vendor.t(userInfo.value.nickname || "宠物爱好者"),
        f: !isLoggedIn.value
      }, !isLoggedIn.value ? {
        g: common_vendor.t(userInfo.value.phone || "点击登录"),
        h: common_vendor.o(goToLogin)
      } : {
        i: common_vendor.t(userInfo.value.phone)
      }, {
        j: common_vendor.t(userInfo.value.level || "普通会员"),
        k: common_vendor.t(userInfo.value.points || 0),
        l: common_vendor.t(userInfo.value.coupons || 0),
        m: common_vendor.t(userInfo.value.balance || "0.00"),
        n: common_assets._imports_1,
        o: common_vendor.o(($event) => goToOrderList("all")),
        p: common_vendor.f(orderTabs.value, (tab, k0, i0) => {
          return common_vendor.e({
            a: tab.icon,
            b: common_vendor.t(tab.text),
            c: tab.count > 0
          }, tab.count > 0 ? {
            d: common_vendor.t(tab.count)
          } : {}, {
            e: tab.type,
            f: common_vendor.o(($event) => goToOrderList(tab.type), tab.type)
          });
        }),
        q: common_vendor.f(serviceList.value, (item, k0, i0) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.text),
            c: item.id,
            d: common_vendor.o(($event) => handleServiceClick(item), item.id)
          };
        }),
        r: common_vendor.f(otherList.value, (item, k0, i0) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.text),
            c: item.id,
            d: common_vendor.o(($event) => handleOtherClick(item), item.id)
          };
        }),
        s: common_assets._imports_1,
        t: isLoggedIn.value
      }, isLoggedIn.value ? {
        v: common_vendor.o(logout)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f97bc692"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/index.js.map
