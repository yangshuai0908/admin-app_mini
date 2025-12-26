"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "coupon",
  setup(__props) {
    const windowInfo = common_vendor.wx$1.getWindowInfo();
    const menuButtonInfo = common_vendor.wx$1.getMenuButtonBoundingClientRect();
    const customNavBarHeight = windowInfo.statusBarHeight + (menuButtonInfo.top - windowInfo.statusBarHeight);
    const activeTab = common_vendor.ref("available");
    const availableCoupons = common_vendor.ref([
      {
        id: 1,
        title: "新用户专享券",
        description: "满100元可用",
        amount: "20",
        condition: "满100元",
        expireDate: "2024-12-31",
        status: "available"
      },
      {
        id: 2,
        title: "满减优惠券",
        description: "满200元可用",
        amount: "50",
        condition: "满200元",
        expireDate: "2024-12-25",
        status: "available"
      },
      {
        id: 3,
        title: "宠物用品券",
        description: "全场通用",
        amount: "10",
        condition: "无门槛",
        expireDate: "2024-12-20",
        status: "available"
      }
    ]);
    const usedCoupons = common_vendor.ref([
      {
        id: 4,
        title: "双十一特惠券",
        description: "已使用",
        amount: "30",
        condition: "满150元",
        expireDate: "2024-11-15",
        status: "used"
      }
    ]);
    const expiredCoupons = common_vendor.ref([
      {
        id: 5,
        title: "过期优惠券",
        description: "已过期",
        amount: "15",
        condition: "满80元",
        expireDate: "2024-10-31",
        status: "expired"
      }
    ]);
    const currentCoupons = common_vendor.computed(() => {
      switch (activeTab.value) {
        case "available":
          return availableCoupons.value;
        case "used":
          return usedCoupons.value;
        case "expired":
          return expiredCoupons.value;
        default:
          return availableCoupons.value;
      }
    });
    const switchTab = (tab) => {
      activeTab.value = tab;
    };
    const getStatusText = (status) => {
      const statusMap = {
        available: "可使用",
        used: "已使用",
        expired: "已过期"
      };
      return statusMap[status] || "未知";
    };
    const getStatusClass = (status) => {
      return `status-${status}`;
    };
    const goBack = () => {
      common_vendor.index.navigateBack({
        delta: 1
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$4,
        b: common_vendor.o(goBack),
        c: customNavBarHeight + "px",
        d: common_vendor.t(availableCoupons.value.length),
        e: activeTab.value === "available" ? 1 : "",
        f: common_vendor.o(($event) => switchTab("available")),
        g: common_vendor.t(usedCoupons.value.length),
        h: activeTab.value === "used" ? 1 : "",
        i: common_vendor.o(($event) => switchTab("used")),
        j: common_vendor.t(expiredCoupons.value.length),
        k: activeTab.value === "expired" ? 1 : "",
        l: common_vendor.o(($event) => switchTab("expired")),
        m: currentCoupons.value.length === 0
      }, currentCoupons.value.length === 0 ? {} : {
        n: common_vendor.f(currentCoupons.value, (coupon, k0, i0) => {
          return {
            a: common_vendor.t(coupon.amount),
            b: common_vendor.t(coupon.condition),
            c: common_vendor.t(coupon.title),
            d: common_vendor.t(coupon.description),
            e: common_vendor.t(coupon.expireDate),
            f: common_vendor.t(getStatusText(coupon.status)),
            g: common_vendor.n(getStatusClass(coupon.status)),
            h: coupon.id,
            i: coupon.status !== "available" ? 1 : ""
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-329b9b67"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/subpkg/pages/user/coupon.js.map
