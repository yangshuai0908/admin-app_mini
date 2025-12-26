<template>
    <!-- 顶部导航栏 -->
    <view class="invite-header" :style="{ paddingTop: customNavBarHeight + 'px' }">
        <view class="nav-back" @click="goBack">
            <image src="/static/arrow_logo.png" class="back-icon" />
        </view>
        <text class="nav-title">邀请好友</text>
        <view class="nav-placeholder"></view>
    </view>
    <view class="invite-content">
        <!-- 海报预览区域 -->
        <view class="poster-preview" v-if="posterImageUrl">
            <image :src="posterImageUrl" class="poster-image" mode="widthFix"></image>
        </view>

        <!-- 海报组件 -->
        <up-poster ref="poster" :json="posterConfig"></up-poster>
    </view>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const poster = ref(null);
const posterImageUrl = ref('');

// 自定义导航栏高度
const windowInfo = wx.getWindowInfo()
const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
const customNavBarHeight = windowInfo.statusBarHeight + (menuButtonInfo.top - windowInfo.statusBarHeight)



const posterConfig = ref({
    css: {
        width: '600rpx',
        height: '800rpx',
        background: '#linear-gradient(45deg, #ff9a9e, #fecfef)',
        borderRadius: '16rpx'
    },
    views: [
        {
            type: 'text',
            text: '探索宠物品质生活',
            css: {
                position: 'absolute',
                color: '#fff',
                left: '40rpx',
                top: '80rpx',
                fontSize: '32rpx',
                fontWeight: 'bold'
            }
        },
        {
            type: 'text',
            text: '限时优惠',
            css: {
                position: 'absolute',
                color: '#ff4d4f',
                left: '250rpx',
                top: '200rpx',
                fontSize: '48rpx',
                fontWeight: 'bold'
            }
        },
        {
            type: 'image',
            src: 'https://picsum.photos/200/300',
            css: {
                position: 'absolute',
                left: '75rpx',
                top: '160rpx',
                width: '450rpx',
                height: '450rpx',
                borderRadius: '8rpx'
            }
        },
        {
            type: 'text',
            text: '立即抢购',
            css: {
                position: 'absolute',
                color: '#fff',
                left: '240rpx',
                top: '650rpx',
                fontSize: '28rpx',
                fontWeight: 'bold'
            }
        }
    ]
});

const generatePoster = async () => {
    try {
        uni.showLoading({ title: '海报生成中...' });
        const result = await poster.value.exportImage();
        posterImageUrl.value = result.path;
        uni.hideLoading();
        uni.showToast({ title: '海报生成成功', icon: 'success' });
    } catch (error) {
        uni.hideLoading();
        uni.showToast({ title: '海报生成失败', icon: 'none' });
    }
};

// 返回上一页
const goBack = () => {
    uni.navigateBack({
        delta: 1
    })
}
onMounted(() => {
    generatePoster()
})

</script>
<style scoped lang="scss">
.invite-content {
    background: #fff;
    padding: 20rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

// 顶部导航栏
.invite-header {
    background: #fff;
    padding: 0 32rpx;
    padding-bottom: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;

    .nav-back {
        width: 60rpx;
        height: 60rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 30rpx;

        .back-icon {
            width: 32rpx;
            height: 32rpx;
        }
    }

    .nav-title {
        font-size: 36rpx;
        font-weight: 600;
        color: #000;
    }

    .nav-placeholder {
        width: 60rpx;
    }
}

// 海报预览样式
.poster-preview {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .poster-image {
        width: 100%;
        height: 100%;
        border-radius: 16rpx;
        box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
    }
}
</style>