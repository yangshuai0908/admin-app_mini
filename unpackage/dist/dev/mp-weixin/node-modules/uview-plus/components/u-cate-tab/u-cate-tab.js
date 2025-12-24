"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "up-cate-tab",
  props: {
    mode: {
      type: String,
      default: "follow"
      // follo跟随联动, tab单一显示。
    },
    height: {
      type: String,
      default: "100%"
    },
    tabList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    tabKeyName: {
      type: String,
      default: "name"
    },
    itemKeyName: {
      type: String,
      default: "name"
    },
    current: {
      type: Number,
      default: 0
    }
  },
  watch: {
    tabList: {
      deep: true,
      handler(newVal, oldVal) {
        common_vendor.sleep(30);
        this.getMenuItemTop();
        this.leftMenuStatus(this.innerCurrent);
      }
    },
    current(nval) {
      this.innerCurrent = nval;
      this.leftMenuStatus(this.innerCurrent);
    },
    height() {
      this.getMenuItemTop();
      this.leftMenuStatus(this.innerCurrent);
    }
  },
  emits: ["update:current"],
  data() {
    return {
      scrollTop: 0,
      //tab标题的滚动条位置
      scrollIntoView: "",
      // 滚动至哪个元素
      oldScrollTop: 0,
      innerCurrent: 0,
      // 预设当前项的值
      menuHeight: 0,
      // 左边菜单的高度
      menuItemHeight: 0,
      // 左边菜单item的高度
      itemId: "",
      // 栏目右边scroll-view用于滚动的id
      menuItemPos: [],
      rects: [],
      arr: [],
      scrollRightTop: 0,
      // 右边栏目scroll-view的滚动条高度
      timer: null
      // 定时器
    };
  },
  mounted() {
    this.innerCurrent = this.current;
    this.leftMenuStatus(this.innerCurrent);
    this.getMenuItemTop();
  },
  methods: {
    addUnit: common_vendor.addUnit,
    // 点击左边的栏目切换
    async swichMenu(index) {
      if (this.mode == "follow") {
        if (this.arr.length == 0) {
          await this.getMenuItemTop();
        }
        this.scrollIntoView = "item" + index;
      }
      if (index == this.innerCurrent)
        return;
      this.$nextTick(function() {
        this.innerCurrent = index;
        this.$emit("update:current", index);
      });
    },
    // 获取一个目标元素的高度
    getElRect(elClass, dataVal) {
      return new Promise((resolve, reject) => {
        const query = common_vendor.index.createSelectorQuery().in(this);
        query.select("." + elClass).fields({
          size: true
        }, (res) => {
          if (!res) {
            setTimeout(() => {
              this.getElRect(elClass);
            }, 10);
            return;
          }
          this[dataVal] = res.height;
          resolve();
        }).exec();
      });
    },
    // 观测元素相交状态
    async observer() {
      await this.$nextTick();
      if (this._observerList) {
        this._observerList.forEach((observer) => {
          observer.disconnect();
        });
      }
      this._observerList = [];
      this.tabList.map((val, index) => {
        let observer = common_vendor.index.createIntersectionObserver(this);
        this._observerList.push(observer);
        observer.relativeTo(".u-cate-tab__right-box", {
          top: 10
        }).observe("#item" + index, (res) => {
          if (res.intersectionRatio > 0) {
            common_vendor.index.__f__("log", "at node_modules/uview-plus/components/u-cate-tab/u-cate-tab.vue:179", "res", res);
            let id = res.id ? res.id.substring(4) : index;
            this.leftMenuStatus(parseInt(id));
          }
        });
      });
    },
    // 设置左边菜单的滚动状态
    async leftMenuStatus(index) {
      this.innerCurrent = index;
      this.$emit("update:current", index);
      if (this.menuHeight == 0 || this.menuItemHeight == 0) {
        await this.getElRect("u-cate-tab__menu-scroll-view", "menuHeight");
        await this.getElRect("u-cate-tab__item", "menuItemHeight");
      }
      this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
    },
    // 获取右边菜单每个item到顶部的距离
    async getMenuItemTop() {
      return new Promise((resolve) => {
        let selectorQuery = common_vendor.index.createSelectorQuery().in(this);
        selectorQuery.selectAll(".u-cate-tab__page-item").boundingClientRect((rects) => {
          if (!rects.length) {
            setTimeout(() => {
              this.getMenuItemTop();
            }, 100);
            return;
          }
          this.rects = rects;
          this.arr = [];
          rects.forEach((rect) => {
            this.arr.push(rect.top - rects[0].top);
          });
          resolve();
        }).exec();
      });
    },
    // 右边菜单滚动
    async rightScroll(e) {
      if (this.mode !== "follow")
        return;
      this.oldScrollTop = e.detail.scrollTop;
      if (this.arr.length == 0) {
        await this.getMenuItemTop();
      }
      if (this.timer)
        return;
      if (!this.menuHeight) {
        await this.getElRect("u-cate-tab__menu-scroll-view", "menuHeight");
      }
      setTimeout(() => {
        this.timer = null;
        let scrollHeight = e.detail.scrollTop + 1;
        for (let i = 0; i < this.arr.length; i++) {
          let height1 = this.arr[i];
          let height2 = this.arr[i + 1];
          if (!height2 || scrollHeight >= height1 && scrollHeight <= height2) {
            this.leftMenuStatus(i);
            return;
          }
        }
      }, 100);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.tabList, (item, index, i0) => {
      return common_vendor.e({
        a: "tabItem-" + i0,
        b: common_vendor.r("tabItem", {
          item
        }, i0)
      }, !_ctx.$slots["tabItem"] ? {
        c: common_vendor.t(item[$props.tabKeyName])
      } : {}, {
        d: index,
        e: common_vendor.n($data.innerCurrent == index ? "u-cate-tab__item-active" : ""),
        f: common_vendor.o(($event) => $options.swichMenu(index), index)
      });
    }),
    b: !_ctx.$slots["tabItem"],
    c: $data.scrollTop,
    d: $data.itemId,
    e: common_vendor.r("rightTop", {
      tabList: $props.tabList
    }),
    f: common_vendor.f($props.tabList, (item, index, i0) => {
      return common_vendor.e({
        a: $props.mode == "follow" || $props.mode == "tab" && index == $data.innerCurrent
      }, $props.mode == "follow" || $props.mode == "tab" && index == $data.innerCurrent ? common_vendor.e({
        b: "itemList-" + i0,
        c: common_vendor.r("itemList", {
          item
        }, i0),
        d: !_ctx.$slots["itemList"]
      }, !_ctx.$slots["itemList"] ? {
        e: common_vendor.t(item[$props.tabKeyName]),
        f: common_vendor.f(item.children, (item1, index1, i1) => {
          return {
            a: item1.icon,
            b: common_vendor.t(item1[$props.itemKeyName]),
            c: "pageItem-" + i0 + "-" + i1,
            d: common_vendor.r("pageItem", {
              pageItem: item1
            }, i0 + "-" + i1),
            e: index1
          };
        })
      } : {}, {
        g: "item" + index
      }) : {}, {
        h: index
      });
    }),
    g: $data.scrollRightTop,
    h: $data.scrollIntoView,
    i: common_vendor.o((...args) => $options.rightScroll && $options.rightScroll(...args)),
    j: $options.addUnit($props.height)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f79fcdc0"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/node-modules/uview-plus/components/u-cate-tab/u-cate-tab.js.map
