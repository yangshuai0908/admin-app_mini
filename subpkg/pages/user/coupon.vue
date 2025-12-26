<template>
	<view class="coupon-container">
		<!-- 顶部导航栏 -->
		<view class="coupon-header" :style="{ paddingTop: customNavBarHeight + 'px' }">
			<img src="../../../static/page_arrow.png" alt="" class="back-icon" @click="goBack">
			<text class="nav-title">优惠券</text>
			<view class="nav-placeholder"></view>
		</view>

		<!-- 优惠券切换标签 -->
		<view class="coupon-tabs">
			<view class="tab-item" :class="{ active: activeTab === 'available' }" @click="switchTab('available')">
				<text>可使用 ({{ availableCoupons.length }})</text>
			</view>
			<view class="tab-item" :class="{ active: activeTab === 'used' }" @click="switchTab('used')">
				<text>已使用 ({{ usedCoupons.length }})</text>
			</view>
			<view class="tab-item" :class="{ active: activeTab === 'expired' }" @click="switchTab('expired')">
				<text>已过期 ({{ expiredCoupons.length }})</text>
			</view>
		</view>

		<!-- 优惠券列表 -->
		<view class="coupon-list">
			<view v-if="currentCoupons.length === 0" class="empty-state">
				<text class="empty-text">暂无优惠券</text>
			</view>
			<view v-else>
				<view v-for="coupon in currentCoupons" :key="coupon.id" class="coupon-item"
					:class="{ disabled: coupon.status !== 'available' }">
					<view class="coupon-left">
						<view class="coupon-amount">
							<text class="currency">￥</text>
							<text class="amount">{{ coupon.amount }}</text>
						</view>
						<text class="coupon-condition">{{ coupon.condition }}</text>
					</view>
					<view class="coupon-divider">
						<view class="divider-circle divider-circle-top"></view>
						<view class="divider-line"></view>
						<view class="divider-circle divider-circle-bottom"></view>
					</view>
					<view class="coupon-right">
						<view class="coupon-info">
							<text class="coupon-title">{{ coupon.title }}</text>
							<text class="coupon-desc">{{ coupon.description }}</text>
							<text class="coupon-date">有效期至：{{ coupon.expireDate }}</text>
						</view>
						<view class="coupon-status">
							<text class="status-text" :class="getStatusClass(coupon.status)">
								{{ getStatusText(coupon.status) }}
							</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部提示 -->
		<view class="coupon-tips">
			<text>使用规则：请在有效期内使用，过期将自动失效</text>
		</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 自定义导航栏高度
const windowInfo = wx.getWindowInfo()
const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
const customNavBarHeight = windowInfo.statusBarHeight + (menuButtonInfo.top - windowInfo.statusBarHeight)

// 当前选中的标签
const activeTab = ref('available')

// 优惠券数据
const availableCoupons = ref([
	{
		id: 1,
		title: '新用户专享券',
		description: '满100元可用',
		amount: '20',
		condition: '满100元',
		expireDate: '2024-12-31',
		status: 'available'
	},
	{
		id: 2,
		title: '满减优惠券',
		description: '满200元可用',
		amount: '50',
		condition: '满200元',
		expireDate: '2024-12-25',
		status: 'available'
	},
	{
		id: 3,
		title: '宠物用品券',
		description: '全场通用',
		amount: '10',
		condition: '无门槛',
		expireDate: '2024-12-20',
		status: 'available'
	}
])

const usedCoupons = ref([
	{
		id: 4,
		title: '双十一特惠券',
		description: '已使用',
		amount: '30',
		condition: '满150元',
		expireDate: '2024-11-15',
		status: 'used'
	}
])

const expiredCoupons = ref([
	{
		id: 5,
		title: '过期优惠券',
		description: '已过期',
		amount: '15',
		condition: '满80元',
		expireDate: '2024-10-31',
		status: 'expired'
	}
])

// 当前显示的优惠券列表
const currentCoupons = computed(() => {
	switch (activeTab.value) {
		case 'available':
			return availableCoupons.value
		case 'used':
			return usedCoupons.value
		case 'expired':
			return expiredCoupons.value
		default:
			return availableCoupons.value
	}
})

// 切换标签
const switchTab = (tab) => {
	activeTab.value = tab
}

// 获取状态文字
const getStatusText = (status) => {
	const statusMap = {
		available: '可使用',
		used: '已使用',
		expired: '已过期'
	}
	return statusMap[status] || '未知'
}

// 获取状态样式类
const getStatusClass = (status) => {
	return `status-${status}`
}

// 返回上一页
const goBack = () => {
	uni.navigateBack({
		delta: 1
	})
}
</script>

<style lang="scss" scoped>
.coupon-container {
	min-height: 100vh;
	background: #f5f5f5;
}

// 顶部导航栏
.coupon-header {
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

	.back-icon {
		width: 36rpx;
		height: 36rpx;
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

// 标签切换
.coupon-tabs {
	display: flex;
	background: #fff;
	margin-bottom: 20rpx;

	.tab-item {
		flex: 1;
		text-align: center;
		padding: 30rpx 0;
		border-bottom: 4rpx solid transparent;

		text {
			font-size: 28rpx;
			color: #666;
		}

		&.active {
			border-bottom-color: #FF6B35;

			text {
				color: #FF6B35;
				font-weight: 600;
			}
		}
	}
}

// 优惠券列表
.coupon-list {
	padding: 0 32rpx;

	.empty-state {
		text-align: center;
		padding: 100rpx 0;

		.empty-text {
			font-size: 28rpx;
			color: #999;
		}
	}

	.coupon-item {
		display: flex;
		background: #fff;
		margin-bottom: 20rpx;
		border-radius: 16rpx;
		overflow: hidden;
		position: relative;

		&.disabled {
			opacity: 0.6;
		}

		.coupon-left {
			background: linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%);
			padding: 40rpx 30rpx;
			text-align: center;
			min-width: 180rpx;

			.coupon-amount {
				display: flex;
				align-items: baseline;
				justify-content: center;
				margin-bottom: 10rpx;

				.currency {
					font-size: 24rpx;
					color: #fff;
					margin-right: 4rpx;
				}

				.amount {
					font-size: 48rpx;
					color: #fff;
					font-weight: 700;
				}
			}

			.coupon-condition {
				font-size: 24rpx;
				color: rgba(255, 255, 255, 0.9);
			}
		}

		.coupon-divider {
			position: relative;
			width: 10rpx;
			background: #f5f5f5;

			.divider-circle {
				position: absolute;
				width: 20rpx;
				height: 20rpx;
				background: #f5f5f5;
				border-radius: 50%;
				left: 50%;
				transform: translateX(-50%);

				&.divider-circle-top {
					top: -10rpx;
				}

				&.divider-circle-bottom {
					bottom: -10rpx;
				}
			}

			.divider-line {
				position: absolute;
				top: 10rpx;
				bottom: 10rpx;
				left: 50%;
				width: 2rpx;
				background: #ddd;
				transform: translateX(-50%);
			}
		}

		.coupon-right {
			flex: 1;
			padding: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.coupon-info {
				flex: 1;

				.coupon-title {
					font-size: 32rpx;
					color: #333;
					font-weight: 600;
					margin-bottom: 10rpx;
					display: block;
				}

				.coupon-desc {
					font-size: 24rpx;
					color: #666;
					margin-bottom: 10rpx;
					display: block;
				}

				.coupon-date {
					font-size: 22rpx;
					color: #999;
					display: block;
				}
			}

			.coupon-status {
				.status-text {
					font-size: 24rpx;
					padding: 8rpx 16rpx;
					border-radius: 20rpx;
					border: 2rpx solid;

					&.status-available {
						color: #FF6B35;
						border-color: #FF6B35;
					}

					&.status-used {
						color: #999;
						border-color: #999;
					}

					&.status-expired {
						color: #ff4757;
						border-color: #ff4757;
					}
				}
			}
		}
	}
}

// 底部提示
.coupon-tips {
	padding: 30rpx 32rpx;
	text-align: center;

	text {
		font-size: 24rpx;
		color: #999;
	}
}
</style>