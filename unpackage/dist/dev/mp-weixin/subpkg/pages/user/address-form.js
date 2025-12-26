"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_up_picker2 = common_vendor.resolveComponent("up-picker");
  _easycom_up_picker2();
}
const _easycom_up_picker = () => "../../../node-modules/uview-plus/components/u-picker/u-picker.js";
if (!Math) {
  _easycom_up_picker();
}
const _sfc_main = {
  __name: "address-form",
  setup(__props) {
    const windowInfo = common_vendor.wx$1.getWindowInfo();
    const menuButtonInfo = common_vendor.wx$1.getMenuButtonBoundingClientRect();
    const customNavBarHeight = windowInfo.statusBarHeight + (menuButtonInfo.top - windowInfo.statusBarHeight);
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const options = currentPage.options || {};
    const isEdit = common_vendor.ref(options.action === "edit");
    const editId = common_vendor.ref(options.id || "");
    const addressData = common_vendor.ref({
      id: "",
      name: "",
      phone: "",
      province: "",
      city: "",
      district: "",
      detail: "",
      isDefault: false
    });
    const showPicker = common_vendor.ref(false);
    const regionColumns = common_vendor.ref([
      // 省份数据
      [
        { name: "北京市", code: "110000" },
        { name: "上海市", code: "310000" },
        { name: "广东省", code: "440000" },
        { name: "浙江省", code: "330000" },
        { name: "江苏省", code: "320000" }
      ],
      // 城市数据
      [
        { name: "北京市", code: "110100" },
        { name: "上海市", code: "310100" },
        { name: "广州市", code: "440100" },
        { name: "深圳市", code: "440300" },
        { name: "杭州市", code: "330100" }
      ],
      // 区县数据
      [
        { name: "朝阳区", code: "110105" },
        { name: "海淀区", code: "110108" },
        { name: "浦东新区", code: "310115" },
        { name: "黄浦区", code: "310101" },
        { name: "天河区", code: "440106" },
        { name: "南山区", code: "440305" }
      ]
    ]);
    const regionText = common_vendor.computed(() => {
      if (addressData.value.province && addressData.value.city && addressData.value.district) {
        return `${addressData.value.province} ${addressData.value.city} ${addressData.value.district}`;
      }
      return "";
    });
    const canSave = common_vendor.computed(() => {
      return addressData.value.name.trim() && addressData.value.phone.trim() && addressData.value.province && addressData.value.city && addressData.value.district && addressData.value.detail.trim();
    });
    const getAddressDetail = () => {
      if (!isEdit.value)
        return;
      try {
        const addressList = common_vendor.index.getStorageSync("addressList") || [];
        const address = addressList.find((item) => item.id === editId.value);
        if (address) {
          addressData.value = { ...address };
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at subpkg/pages/user/address-form.vue:178", "获取地址详情失败:", e);
      }
    };
    const showRegionPicker = () => {
      showPicker.value = true;
    };
    const onRegionConfirm = (e) => {
      const [province, city, district] = e.value;
      addressData.value.province = province.name;
      addressData.value.city = city.name;
      addressData.value.district = district.name;
      showPicker.value = false;
    };
    const onRegionCancel = () => {
      showPicker.value = false;
    };
    const onDefaultChange = (e) => {
      addressData.value.isDefault = e.detail.value;
    };
    const saveAddress = () => {
      if (!canSave.value) {
        common_vendor.index.showToast({
          title: "请填写完整信息",
          icon: "none"
        });
        return;
      }
      if (!/^1[3-9]\d{9}$/.test(addressData.value.phone)) {
        common_vendor.index.showToast({
          title: "请输入正确的手机号",
          icon: "none"
        });
        return;
      }
      try {
        let addressList = common_vendor.index.getStorageSync("addressList") || [];
        if (isEdit.value) {
          const index = addressList.findIndex((item) => item.id === editId.value);
          if (index !== -1) {
            if (addressData.value.isDefault) {
              addressList.forEach((item) => {
                item.isDefault = false;
              });
            }
            addressList[index] = { ...addressData.value };
          }
        } else {
          const newAddress = {
            ...addressData.value,
            id: Date.now().toString()
          };
          if (newAddress.isDefault) {
            addressList.forEach((item) => {
              item.isDefault = false;
            });
          }
          addressList.unshift(newAddress);
        }
        common_vendor.index.setStorageSync("addressList", addressList);
        common_vendor.index.showToast({
          title: isEdit.value ? "修改成功" : "添加成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      } catch (e) {
        common_vendor.index.__f__("error", "at subpkg/pages/user/address-form.vue:270", "保存地址失败:", e);
        common_vendor.index.showToast({
          title: "保存失败，请重试",
          icon: "none"
        });
      }
    };
    const goBack = () => {
      common_vendor.index.navigateBack({
        delta: 1
      });
    };
    common_vendor.onMounted(() => {
      getAddressDetail();
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$3,
        b: common_vendor.o(goBack),
        c: common_vendor.t(isEdit.value ? "编辑地址" : "添加地址"),
        d: common_vendor.o(saveAddress),
        e: customNavBarHeight + "px",
        f: addressData.value.name,
        g: common_vendor.o(($event) => addressData.value.name = $event.detail.value),
        h: addressData.value.phone,
        i: common_vendor.o(($event) => addressData.value.phone = $event.detail.value),
        j: common_vendor.t(regionText.value || "请选择省市区"),
        k: !regionText.value ? 1 : "",
        l: common_assets._imports_1,
        m: common_vendor.o(showRegionPicker),
        n: addressData.value.detail,
        o: common_vendor.o(($event) => addressData.value.detail = $event.detail.value),
        p: addressData.value.isDefault,
        q: common_vendor.o(onDefaultChange),
        r: common_vendor.t(isEdit.value ? "保存修改" : "保存地址"),
        s: common_vendor.o(saveAddress),
        t: !canSave.value ? 1 : "",
        v: common_vendor.o(onRegionConfirm),
        w: common_vendor.o(onRegionCancel),
        x: common_vendor.p({
          show: showPicker.value,
          columns: regionColumns.value,
          keyName: "name"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2ddaeb5f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/subpkg/pages/user/address-form.js.map
