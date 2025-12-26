"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_up_poster2 = common_vendor.resolveComponent("up-poster");
  _easycom_up_poster2();
}
const _easycom_up_poster = () => "../../../node-modules/uview-plus/components/u-poster/u-poster.js";
if (!Math) {
  _easycom_up_poster();
}
const _sfc_main = {
  __name: "invite",
  setup(__props) {
    const poster = common_vendor.ref(null);
    const posterImageUrl = common_vendor.ref("");
    const windowInfo = common_vendor.wx$1.getWindowInfo();
    const menuButtonInfo = common_vendor.wx$1.getMenuButtonBoundingClientRect();
    const customNavBarHeight = windowInfo.statusBarHeight + (menuButtonInfo.top - windowInfo.statusBarHeight);
    const posterConfig = common_vendor.ref({
      css: {
        width: "600rpx",
        height: "800rpx",
        background: "#linear-gradient(45deg, #ff9a9e, #fecfef)",
        borderRadius: "16rpx"
      },
      views: [
        {
          type: "text",
          text: "探索宠物品质生活",
          css: {
            position: "absolute",
            color: "#fff",
            left: "40rpx",
            top: "80rpx",
            fontSize: "32rpx",
            fontWeight: "bold"
          }
        },
        {
          type: "text",
          text: "限时优惠",
          css: {
            position: "absolute",
            color: "#ff4d4f",
            left: "250rpx",
            top: "200rpx",
            fontSize: "48rpx",
            fontWeight: "bold"
          }
        },
        {
          type: "image",
          src: "https://picsum.photos/200/300",
          css: {
            position: "absolute",
            left: "75rpx",
            top: "160rpx",
            width: "450rpx",
            height: "450rpx",
            borderRadius: "8rpx"
          }
        },
        {
          type: "text",
          text: "立即抢购",
          css: {
            position: "absolute",
            color: "#fff",
            left: "240rpx",
            top: "650rpx",
            fontSize: "28rpx",
            fontWeight: "bold"
          }
        }
      ]
    });
    const generatePoster = async () => {
      try {
        common_vendor.index.showLoading({ title: "海报生成中..." });
        const result = await poster.value.exportImage();
        posterImageUrl.value = result.path;
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({ title: "海报生成成功", icon: "success" });
      } catch (error) {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({ title: "海报生成失败", icon: "none" });
      }
    };
    const goBack = () => {
      common_vendor.index.navigateBack({
        delta: 1
      });
    };
    common_vendor.onMounted(() => {
      generatePoster();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$3,
        b: common_vendor.o(goBack),
        c: customNavBarHeight + "px",
        d: posterImageUrl.value
      }, posterImageUrl.value ? {
        e: posterImageUrl.value
      } : {}, {
        f: common_vendor.sr(poster, "1b59a9a3-0", {
          "k": "poster"
        }),
        g: common_vendor.p({
          json: posterConfig.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1b59a9a3"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/subpkg/pages/user/invite.js.map
