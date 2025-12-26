"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_up_empty2 = common_vendor.resolveComponent("up-empty");
  _easycom_up_empty2();
}
const _easycom_up_empty = () => "../../../node-modules/uview-plus/components/u-empty/u-empty.js";
if (!Math) {
  _easycom_up_empty();
}
const _sfc_main = {
  __name: "address",
  setup(__props) {
    const windowInfo = common_vendor.wx$1.getWindowInfo();
    const menuButtonInfo = common_vendor.wx$1.getMenuButtonBoundingClientRect();
    const customNavBarHeight = windowInfo.statusBarHeight + (menuButtonInfo.top - windowInfo.statusBarHeight);
    const addressList = common_vendor.ref([]);
    const getAddressList = () => {
      try {
        const savedAddresses = common_vendor.index.getStorageSync("addressList");
        if (savedAddresses) {
          addressList.value = savedAddresses;
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at subpkg/pages/user/address.vue:81", "获取地址列表失败:", e);
      }
    };
    const addAddress = () => {
      common_vendor.index.navigateTo({
        url: "/subpkg/pages/user/address-form?action=add"
      });
    };
    const editAddress = (address) => {
      common_vendor.index.navigateTo({
        url: `/subpkg/pages/user/address-form?action=edit&id=${address.id}`
      });
    };
    const selectAddress = (address) => {
      const pages = getCurrentPages();
      const prevPage = pages[pages.length - 2];
      if (prevPage) {
        prevPage.$vm.selectedAddress = address;
        common_vendor.index.navigateBack();
      }
    };
    const deleteAddress = (address, index) => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要删除这个地址吗？",
        success: (res) => {
          if (res.confirm) {
            addressList.value.splice(index, 1);
            saveAddressList();
            common_vendor.index.showToast({
              title: "删除成功",
              icon: "success"
            });
          }
        }
      });
    };
    const saveAddressList = () => {
      try {
        common_vendor.index.setStorageSync("addressList", addressList.value);
      } catch (e) {
        common_vendor.index.__f__("error", "at subpkg/pages/user/address.vue:134", "保存地址列表失败:", e);
      }
    };
    const goBack = () => {
      common_vendor.index.navigateBack({
        delta: 1
      });
    };
    common_vendor.onMounted(() => {
      getAddressList();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$3,
        b: common_vendor.o(goBack),
        c: customNavBarHeight + "px",
        d: addressList.value.length === 0
      }, addressList.value.length === 0 ? {
        e: common_vendor.p({
          mode: "address"
        }),
        f: common_vendor.o(addAddress)
      } : {
        g: common_vendor.f(addressList.value, (address, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(address.name),
            b: common_vendor.t(address.phone),
            c: address.isDefault
          }, address.isDefault ? {} : {}, {
            d: common_vendor.t(address.province),
            e: common_vendor.t(address.city),
            f: common_vendor.t(address.district),
            g: common_vendor.t(address.detail),
            h: common_vendor.o(($event) => selectAddress(address), address.id),
            i: common_vendor.o(($event) => editAddress(address), address.id),
            j: common_vendor.o(($event) => deleteAddress(address, index), address.id),
            k: address.id
          });
        }),
        h: common_assets._imports_1$2,
        i: common_assets._imports_2
      }, {
        j: common_vendor.o(addAddress)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ff5fc825"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/subpkg/pages/user/address.js.map
