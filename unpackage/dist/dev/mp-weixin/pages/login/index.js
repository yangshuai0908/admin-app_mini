"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const windowInfo = common_vendor.wx$1.getWindowInfo();
    const menuButtonInfo = common_vendor.wx$1.getMenuButtonBoundingClientRect();
    const customNavBarHeight = windowInfo.statusBarHeight + (menuButtonInfo.top - windowInfo.statusBarHeight);
    const loginType = common_vendor.ref("phone");
    const phone = common_vendor.ref("");
    const code = common_vendor.ref("");
    const canSendCode = common_vendor.computed(() => {
      return /^1[3-9]\d{9}$/.test(phone.value) && countdown.value === 0;
    });
    const countdown = common_vendor.ref(0);
    const codeText = common_vendor.computed(() => {
      return countdown.value > 0 ? `${countdown.value}s` : "获取验证码";
    });
    const canLogin = common_vendor.computed(() => {
      return phone.value.length === 11 && code.value.length === 6 && agreedToTerms.value;
    });
    const agreedToTerms = common_vendor.ref(false);
    const switchLoginType = (type) => {
      loginType.value = type;
    };
    const sendCode = () => {
      if (!canSendCode.value)
        return;
      common_vendor.index.showToast({
        title: "验证码已发送",
        icon: "success"
      });
      countdown.value = 60;
      const timer = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
          clearInterval(timer);
        }
      }, 1e3);
    };
    const phoneLogin = () => {
      if (!canLogin.value)
        return;
      common_vendor.index.showLoading({
        title: "登录中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "登录成功",
          icon: "success"
        });
        common_vendor.index.setStorageSync("isLoggedIn", true);
        common_vendor.index.setStorageSync("userInfo", {
          phone: phone.value,
          nickname: "宠物爱好者",
          avatar: "../../static/default-avatar.png"
        });
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/home/index"
          });
        }, 1500);
      }, 2e3);
    };
    const wechatLogin = () => {
      common_vendor.index.showLoading({
        title: "登录中..."
      });
      common_vendor.index.login({
        provider: "weixin",
        success: (loginRes) => {
          common_vendor.index.getUserInfo({
            provider: "weixin",
            success: (infoRes) => {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "登录成功",
                icon: "success"
              });
              common_vendor.index.setStorageSync("isLoggedIn", true);
              common_vendor.index.setStorageSync("userInfo", {
                nickname: infoRes.userInfo.nickName,
                avatar: infoRes.userInfo.avatarUrl,
                openid: loginRes.code
              });
              setTimeout(() => {
                common_vendor.index.switchTab({
                  url: "/pages/home/index"
                });
              }, 1500);
            },
            fail: () => {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "获取用户信息失败",
                icon: "none"
              });
            }
          });
        },
        fail: () => {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: "微信登录失败",
            icon: "none"
          });
        }
      });
    };
    const toggleAgreement = () => {
      agreedToTerms.value = !agreedToTerms.value;
    };
    const openUserAgreement = () => {
      common_vendor.index.navigateTo({
        url: "/pages/my/agreement"
      });
    };
    const openPrivacyPolicy = () => {
      common_vendor.index.navigateTo({
        url: "/pages/my/privacy"
      });
    };
    const goBack = () => {
      common_vendor.index.navigateBack({
        delta: 1
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$3,
        b: common_vendor.o(goBack),
        c: customNavBarHeight + "px",
        d: common_assets._imports_1$1,
        e: loginType.value === "phone" ? 1 : "",
        f: common_vendor.o(($event) => switchLoginType("phone")),
        g: loginType.value === "wechat" ? 1 : "",
        h: common_vendor.o(($event) => switchLoginType("wechat")),
        i: loginType.value === "phone"
      }, loginType.value === "phone" ? {
        j: phone.value,
        k: common_vendor.o(($event) => phone.value = $event.detail.value),
        l: code.value,
        m: common_vendor.o(($event) => code.value = $event.detail.value),
        n: common_vendor.t(codeText.value),
        o: !canSendCode.value ? 1 : "",
        p: common_vendor.o(sendCode),
        q: common_vendor.o(phoneLogin),
        r: !canLogin.value ? 1 : ""
      } : {}, {
        s: loginType.value === "wechat"
      }, loginType.value === "wechat" ? {
        t: common_vendor.o(wechatLogin)
      } : {}, {
        v: agreedToTerms.value
      }, agreedToTerms.value ? {} : {}, {
        w: agreedToTerms.value ? 1 : "",
        x: common_vendor.o(toggleAgreement),
        y: common_vendor.o(openUserAgreement),
        z: common_vendor.o(openPrivacyPolicy)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d08ef7d4"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/index.js.map
