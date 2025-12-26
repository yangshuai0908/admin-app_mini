"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "up-poster",
  props: {
    json: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      canvasId: "u-poster-canvas-" + Date.now(),
      showCanvas: false,
      canvasWidth: 0,
      canvasHeight: 0,
      // 二维码相关数据
      qrCodeValue: "",
      qrCodeSize: 200,
      qrCodeShow: false,
      // 存储多个二维码的数据
      qrCodeMap: /* @__PURE__ */ new Map()
    };
  },
  computed: {
    // 根据传入的css生成文本样式
    getTextStyle() {
      return (css) => {
        const style = {};
        if (css.color)
          style.color = css.color;
        if (css.fontSize)
          style.fontSize = css.fontSize;
        if (css.fontWeight)
          style.fontWeight = css.fontWeight;
        if (css.lineHeight)
          style.lineHeight = css.lineHeight;
        if (css.textAlign)
          style.textAlign = css.textAlign;
        return style;
      };
    }
  },
  methods: {
    /**
     * 导出海报图片
     * @description 根据json配置生成海报并导出为临时图片路径
     * @returns {Promise<Object>} 返回包含图片信息的对象
     * @author jry ijry@qq.com
     */
    async exportImage() {
      return new Promise(async (resolve, reject) => {
        try {
          const posterSize = this.json.css;
          const width = this.convertRpxToPx(posterSize.width || "750rpx");
          const height = this.convertRpxToPx(posterSize.height || "1114rpx");
          this.canvasWidth = width;
          this.canvasHeight = height;
          this.showCanvas = true;
          await this.$nextTick();
          const ctx = common_vendor.index.createCanvasContext(this.canvasId, this);
          if (posterSize.background) {
            if (posterSize.background.includes("linear-gradient") || posterSize.background.includes("radial-gradient")) {
              this.drawGradientBackground(ctx, posterSize, 0, 0, width, height);
            } else {
              ctx.setFillStyle(posterSize.background);
              ctx.fillRect(0, 0, width, height);
            }
          }
          for (const item of this.json.views) {
            await this.drawItem(ctx, item, width, height);
          }
          ctx.draw(false, () => {
            setTimeout(() => {
              common_vendor.index.canvasToTempFilePath({
                canvasId: this.canvasId,
                success: (res) => {
                  this.showCanvas = false;
                  resolve({
                    width,
                    height,
                    path: res.tempFilePath,
                    // H5下添加blob格式
                    blob: this.dataURLToBlob(res.tempFilePath)
                  });
                },
                fail: (err) => {
                  this.showCanvas = false;
                  reject(new Error("导出图片失败: " + JSON.stringify(err)));
                }
              }, this);
            }, 300);
          });
          setTimeout(() => {
            this.showCanvas = false;
            reject(new Error("导出图片超时"));
          }, 1e4);
        } catch (error) {
          this.showCanvas = false;
          reject(error);
        }
      });
    },
    /**
     * 绘制单个元素
     * @description 根据元素类型绘制文本、图片、矩形或二维码到canvas
     * @param {Object} ctx canvas上下文
     * @param {Object} item 元素配置信息
     * @param {Number} canvasWidth canvas宽度
     * @param {Number} canvasHeight canvas高度
     * @returns {Promise} 绘制完成的Promise
     * @author jry ijry@qq.com
     */
    async drawItem(ctx, item, canvasWidth, canvasHeight) {
      const css = item.css || {};
      const left = this.convertRpxToPx(css.left || "0rpx");
      const top = this.convertRpxToPx(css.top || "0rpx");
      const width = this.convertRpxToPx(css.width || "0rpx");
      const height = this.convertRpxToPx(css.height || "0rpx");
      switch (item.type) {
        case "view":
          if (css.background) {
            if (css.background.includes("linear-gradient") || css.background.includes("radial-gradient")) {
              this.drawGradientBackground(ctx, css, left, top, width, height);
            } else {
              ctx.setFillStyle(css.background);
              if (css.radius) {
                const radius = this.convertRpxToPx(css.radius);
                this.drawRoundRect(ctx, left, top, width, height, radius, css.background);
              } else {
                ctx.fillRect(left, top, width, height);
              }
            }
          }
          break;
        case "text":
          if (css.color)
            ctx.setFillStyle(css.color);
          if (css.fontSize) {
            const fontSize = this.convertRpxToPx(css.fontSize);
            ctx.setFontSize(fontSize);
          }
          if (css.fontWeight) {
            ctx.setLineWidth(css.fontWeight === "bold" ? 2 : 1);
          }
          if (css.lineClamp) {
            this.drawTextWithLineClamp(ctx, item.text, left, top, width, css);
          } else {
            const textBaseLine = css.fontSize ? this.convertRpxToPx(css.fontSize) / 2 : 10;
            ctx.fillText(item.text, left, top + textBaseLine);
          }
          break;
        case "image":
          return new Promise((resolve) => {
            common_vendor.index.getImageInfo({
              src: item.src,
              success: (res) => {
                if (css.radius) {
                  const radius = this.convertRpxToPx(css.radius);
                  this.clipRoundRect(ctx, left, top, width, height, radius);
                }
                ctx.drawImage(res.path, left, top, width, height);
                ctx.restore();
                resolve();
              },
              fail: (e) => {
                ctx.setFillStyle("#f5f5f5");
                ctx.fillRect(left, top, width, height);
                common_vendor.index.__f__("log", "at node_modules/uview-plus/components/u-poster/u-poster.vue:244", "图片加载失败: " + item.src, e);
                resolve();
              }
            });
          });
        case "qrcode":
          if (item.text) {
            const qrCodeImageUrl = await this.generateQRCode(item.text, width, height);
            return new Promise((resolve) => {
              common_vendor.index.getImageInfo({
                src: qrCodeImageUrl,
                success: (res) => {
                  ctx.drawImage(res.path, left, top, width, height);
                  resolve();
                },
                fail: () => {
                  ctx.setFillStyle("#f5f5f5");
                  ctx.fillRect(left, top, width, height);
                  ctx.setFillStyle("#999");
                  ctx.setFontSize(12);
                  ctx.setTextAlign("center");
                  ctx.fillText("QR", left + width / 2, top + height / 2);
                  ctx.setTextAlign("left");
                  resolve();
                }
              });
            });
          } else {
            ctx.setFillStyle("#f5f5f5");
            ctx.fillRect(left, top, width, height);
            ctx.setFillStyle("#999");
            ctx.setFontSize(12);
            ctx.setTextAlign("center");
            ctx.fillText("QR", left + width / 2, top + height / 2);
            ctx.setTextAlign("left");
          }
          break;
      }
    },
    /**
     * 绘制圆角矩形
     * @description 绘制指定位置和尺寸的圆角矩形
     * @param {Object} ctx canvas上下文
     * @param {Number} x x坐标
     * @param {Number} y y坐标
     * @param {Number} width 宽度
     * @param {Number} height 高度
     * @param {Number} radius 圆角半径
     * @param {String} fillColor 填充颜色
     * @author jry ijry@qq.com
     */
    drawRoundRect(ctx, x, y, width, height, radius, fillColor) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      if (fillColor) {
        ctx.setFillStyle(fillColor);
        ctx.fill();
      }
      ctx.restore();
    },
    /**
     * 裁剪圆角矩形区域
     * @description 在canvas上创建圆角矩形裁剪区域
     * @param {Object} ctx canvas上下文
     * @param {Number} x x坐标
     * @param {Number} y y坐标
     * @param {Number} width 宽度
     * @param {Number} height 高度
     * @param {Number} radius 圆角半径
     * @author jry ijry@qq.com
     */
    clipRoundRect(ctx, x, y, width, height, radius) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5);
      ctx.lineTo(x + width - radius, y);
      ctx.arc(x + width - radius, y + radius, radius, Math.PI * 1.5, Math.PI * 2);
      ctx.lineTo(x + width, y + height - radius);
      ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI * 0.5);
      ctx.lineTo(x + radius, y + height);
      ctx.arc(x + radius, y + height - radius, radius, Math.PI * 0.5, Math.PI);
      ctx.closePath();
      ctx.clip();
    },
    /**
     * 绘制带行数限制的文本
     * @description 绘制可控制最大行数的文本，超出部分显示省略号
     * @param {Object} ctx canvas上下文
     * @param {String} text 文本内容
     * @param {Number} x x坐标
     * @param {Number} y y坐标
     * @param {Number} maxWidth 最大宽度
     * @param {Object} css 样式配置
     * @author jry ijry@qq.com
     */
    drawTextWithLineClamp(ctx, text, x, y, maxWidth, css) {
      const lineClamp = parseInt(css.lineClamp) || 1;
      const lineHeight = css.lineHeight ? this.convertRpxToPx(css.lineHeight) : 20;
      const lines = [];
      let currentLine = "";
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const testLine = currentLine + char;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && currentLine !== "") {
          lines.push(currentLine);
          currentLine = char;
          if (lines.length === lineClamp) {
            if (metrics.width > maxWidth) {
              let fitLine = currentLine.substring(0, currentLine.length - 1);
              while (ctx.measureText(fitLine + "...").width > maxWidth && fitLine.length > 0) {
                fitLine = fitLine.substring(0, fitLine.length - 1);
              }
              lines[lines.length - 1] = fitLine + "...";
            }
            break;
          }
        } else {
          currentLine = testLine;
        }
        if (i === text.length - 1 && lines.length < lineClamp) {
          lines.push(currentLine);
        }
      }
      for (let i = 0; i < lines.length; i++) {
        const textBaseLine = css.fontSize ? this.convertRpxToPx(css.fontSize) / 2 : 10;
        ctx.fillText(lines[i], x, y + i * lineHeight + textBaseLine);
      }
    },
    /**
     * 生成二维码图片
     * @description 根据文本内容生成二维码图片URL
     * @param {String} text 二维码内容
     * @param {Number} width 二维码宽度
     * @param {Number} height 二维码高度
     * @returns {Promise<String>} 二维码图片URL
     * @author jry ijry@qq.com
     */
    generateQRCode(text, width, height) {
      return new Promise((resolve) => {
        const qrCodeKey = `${text}_${width}_${height}`;
        if (this.qrCodeMap.has(qrCodeKey)) {
          resolve(this.qrCodeMap.get(qrCodeKey));
          return;
        }
        try {
          this.qrCodeValue = text;
          this.qrCodeSize = Math.max(width, height);
          this.qrCodeShow = true;
          this.$nextTick(() => {
            if (this.$refs.qrCode) {
              setTimeout(() => {
                this.$refs.qrCode.toTempFilePath({
                  success: (res) => {
                    this.qrCodeMap.set(qrCodeKey, res.tempFilePath);
                    this.qrCodeShow = false;
                    resolve(res.tempFilePath);
                  },
                  fail: (err) => {
                    common_vendor.index.__f__("error", "at node_modules/uview-plus/components/u-poster/u-poster.vue:444", "二维码生成失败:", err);
                    this.qrCodeShow = false;
                  }
                });
              }, 300);
            } else {
              this.qrCodeShow = false;
            }
          });
        } catch (error) {
          common_vendor.index.__f__("error", "at node_modules/uview-plus/components/u-poster/u-poster.vue:455", "生成二维码出错:", error);
          this.qrCodeShow = false;
        }
      });
    },
    /**
     * 将rpx单位转换为px
     * @description 根据屏幕密度将rpx单位转换为px单位
     * @param {String|Number} rpxValue rpx值
     * @returns {Number} 转换后的px值
     * @author jry ijry@qq.com
     */
    convertRpxToPx(rpxValue) {
      if (typeof rpxValue === "number")
        return rpxValue;
      if (typeof rpxValue === "string" && rpxValue.endsWith("rpx")) {
        const value = parseFloat(rpxValue);
        return common_vendor.rpx2px(value);
      }
      return parseFloat(rpxValue) || 0;
    },
    /**
     * 绘制渐变背景
     * @description 绘制线性渐变或径向渐变背景
     * @param {Object} ctx canvas上下文
     * @param {Object} css 样式配置
     * @param {Number} left 左边距
     * @param {Number} top 上边距
     * @param {Number} width 宽度
     * @param {Number} height 高度
     * @author jry ijry@qq.com
     */
    drawGradientBackground(ctx, css, left, top, width, height) {
      const background = css.background;
      let gradient = null;
      if (background.includes("linear-gradient")) {
        const angleMatch = background.match(/linear-gradient\((\d+)deg/);
        const angle = angleMatch ? parseInt(angleMatch[1]) : 135;
        let startX = left, startY = top, endX = left + width, endY = top + height;
        if (angle === 0) {
          startX = left;
          startY = top + height;
          endX = left;
          endY = top;
        } else if (angle === 90) {
          startX = left;
          startY = top;
          endX = left + width;
          endY = top;
        } else if (angle === 180) {
          startX = left;
          startY = top;
          endX = left;
          endY = top + height;
        } else if (angle === 270) {
          startX = left + width;
          startY = top;
          endX = left;
          endY = top;
        }
        gradient = ctx.createLinearGradient(startX, startY, endX, endY);
        const colorMatches = background.match(/#[0-9a-fA-F]+|rgba?\([^)]+\)/g);
        if (colorMatches && colorMatches.length >= 2) {
          colorMatches.forEach((color, index) => {
            const stop = index / (colorMatches.length - 1);
            gradient.addColorStop(stop, color);
          });
        }
      } else if (background.includes("radial-gradient")) {
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const radius = Math.min(width, height) / 2;
        gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        const colorMatches = background.match(/#[0-9a-fA-F]+|rgba?\([^)]+\)/g);
        if (colorMatches && colorMatches.length >= 2) {
          colorMatches.forEach((color, index) => {
            const stop = index / (colorMatches.length - 1);
            gradient.addColorStop(stop, color);
          });
        }
      }
      if (gradient) {
        ctx.setFillStyle(gradient);
        if (css.radius) {
          const radius = this.convertRpxToPx(css.radius);
          this.drawRoundRect(ctx, left, top, width, height, radius, gradient);
        } else {
          ctx.fillRect(left, top, width, height);
        }
      }
    },
    /**
     * 将dataURL转换为Blob
     * @description H5环境下将base64格式的dataURL转换为Blob对象
     * @param {String} dataURL base64格式的图片数据
     * @returns {Blob} Blob对象
     * @author jry ijry@qq.com
     */
    dataURLToBlob(dataURL) {
      return null;
    }
  }
};
if (!Array) {
  const _easycom_up_qrcode2 = common_vendor.resolveComponent("up-qrcode");
  _easycom_up_qrcode2();
}
const _easycom_up_qrcode = () => "../u-qrcode/u-qrcode.js";
if (!Math) {
  _easycom_up_qrcode();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.showCanvas
  }, $data.showCanvas ? {
    b: $data.canvasId,
    c: $data.canvasId,
    d: $data.canvasWidth + "px",
    e: $data.canvasHeight + "px"
  } : {}, {
    f: common_vendor.sr("qrCode", "78eb1c61-0"),
    g: common_vendor.n($data.qrCodeShow ? "" : "up-poster__hidden-qrcode--hidden"),
    h: common_vendor.p({
      val: $data.qrCodeValue,
      size: $data.qrCodeSize,
      margin: 0,
      loadMake: false,
      background: "#ffffff",
      foreground: "#000000"
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-78eb1c61"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/node-modules/uview-plus/components/u-poster/u-poster.js.map
