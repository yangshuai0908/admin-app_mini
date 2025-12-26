<template>
	<view class="my-container">
		<up-sticky>
			<!-- 顶部导航栏 -->
			<view class="my-header" :style="{ paddingTop: customNavBarHeight + 'px' }">
				<text class="my-title">我的</text>
			</view>
		</up-sticky>

		<!-- 用户信息区域 -->
		<view class="user-info">
			<view class="user-main">
				<view class="user-avatar" @click="goToProfile">
					<image :src="userInfo.avatar" class="avatar-img" mode="aspectFit"></image>
					<view class="edit-icon">
						<img src="../../static/alter.png" alt="" srcset="" class="edit-icon-img" />
					</view>
				</view>
			<view class="user-details">
				<text class="username">{{ userInfo.nickname || '宠物爱好者' }}</text>
				<text v-if="!isLoggedIn" class="user-phone login-hint" @click="goToLogin">{{ userInfo.phone || '点击登录' }}</text>
				<text v-else class="user-phone">{{ userInfo.phone }}</text>
				<view class="user-level">
					<text class="level-text">{{ userInfo.level || '普通会员' }}</text>
				</view>
			</view>
			</view>
			<view class="user-stats">
				<view class="stat-item">
					<text class="stat-number">{{ userInfo.points || 0 }}</text>
					<text class="stat-label">积分</text>
				</view>
				<view class="stat-item">
					<text class="stat-number">{{ userInfo.coupons || 0 }}</text>
					<text class="stat-label">优惠券</text>
				</view>
				<view class="stat-item">
					<text class="stat-number">{{ userInfo.balance || '0.00' }}</text>
					<text class="stat-label">余额</text>
				</view>
			</view>
		</view>

		<!-- 订单管理 -->
		<view class="order-section">
			<view class="order-header" @click="goToOrderList('all')">
				<view class="order-title">我的订单</view>
				<view class="view-all">查看全部
					<img src="../../static/arrow.png" alt="" srcset="" class="arrow"></img>
				</view>
			</view>
			<view class="order-tabs">
				<view v-for="tab in orderTabs" :key="tab.type" class="order-tab" @click="goToOrderList(tab.type)">
					<view class="tab-icon">
						<img :src="tab.icon" alt="" srcset="" class="icon"></img>
					</view>
					<text class="tab-text">{{ tab.text }}</text>
					<view v-if="tab.count > 0" class="tab-badge">{{ tab.count }}</view>
				</view>
			</view>
		</view>

		<!-- 我的服务 -->
		<view class="service-section">
			<text class="section-title">我的服务</text>
			<view class="service-grid">
				<view v-for="item in serviceList" :key="item.id" class="service-item" @click="handleServiceClick(item)">
					<view class="service-icon">
						<img :src="item.icon" alt="" srcset="" class="icon"></img>
					</view>
					<text class="service-text">{{ item.text }}</text>
				</view>
			</view>
		</view>

		<!-- 其他功能 -->
		<view class="other-section">
			<view v-for="item in otherList" :key="item.id" class="other-item" @click="handleOtherClick(item)">
				<view class="other-left">
					<view class="other-icon">
						<img :src="item.icon" alt="" srcset="" class="icon"></img>
					</view>
					<text class="other-text">{{ item.text }}</text>
				</view>
				<img src="../../static/arrow.png" alt="" srcset="" class="arrow"></img>
			</view>
		</view>

		<!-- 退出登录 -->
		<view class="logout-btn" @click="logout" v-if="isLoggedIn">
			<text>退出登录</text>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 自定义导航栏高度
const systemInfo = wx.getSystemInfoSync()
const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
const customNavBarHeight = systemInfo.statusBarHeight + (menuButtonInfo.top - systemInfo.statusBarHeight)

// 用户信息
const userInfo = ref({
	avatar: '../../static/avatar.png',
	nickname: '宠物爱好者',
	phone: '138****8888',
	level: '黄金会员',
	points: 1280,
	coupons: 5,
	balance: '168.50'
})

// 是否已登录
const isLoggedIn = ref(true)

// 未读消息数
const unreadCount = ref(3)

// 订单标签页
const orderTabs = ref([
	{ type: 'unpaid', text: '待付款', icon: '../../static/my/代付款.png', count: 2 },
	{ type: 'unshipped', text: '待发货', icon: '../../static/my/代发货.png', count: 1 },
	{ type: 'shipped', text: '待收货', icon: '../../static/my/代收货.png', count: 3 },
	{ type: 'completed', text: '已完成', icon: '../../static/my/已完成.png', count: 0 },
	{ type: 'review', text: '待评价', icon: '../../static/my/待评价.png', count: 1 }
])

// 服务列表
const serviceList = ref([
	{ id: 1, text: '我的收藏', icon: '../../static/my/我的收藏.png', url: '/pages/my/favorites' },
	{ id: 2, text: '浏览历史', icon: '../../static/my/浏览历史.png', url: '/pages/my/history' },
	{ id: 3, text: '地址管理', icon: '../../static/my/地址管理.png', url: '/pages/my/address' },
	{ id: 4, text: '优惠券', icon: '../../static/my/优惠券.png', url: '/pages/my/coupons' },
	{ id: 5, text: '积分商城', icon: '../../static/my/积分商城.png', url: '/pages/my/points' },
	{ id: 6, text: '客服中心', icon: '../../static/my/客服中心.png', url: '/pages/my/service' },
	{ id: 7, text: '帮助中心', icon: '../../static/my/帮助中心.png', url: '/pages/my/help' },
	{ id: 8, text: '邀请好友', icon: '../../static/my/邀请好友.png', url: '/pages/my/invite' }
])

// 其他功能列表
const otherList = ref([
	{ id: 1, text: '关于我们', icon: '../../static/my/关于我们.png', url: '/pages/my/about' },
	{ id: 2, text: '隐私政策', icon: '../../static/my/隐私政策.png', url: '/pages/my/privacy' },
	{ id: 3, text: '用户协议', icon: '../../static/my/用户协议.png', url: '/pages/my/agreement' },
])

// 页面跳转方法
const goToProfile = () => {
	if (!isLoggedIn.value) {
		goToLogin()
		return
	}
	uni.navigateTo({
		url: '/pages/my/profile'
	})
}

const goToLogin = () => {
	console.log('点击登录被触发，当前登录状态:', isLoggedIn.value)
	
	// 直接跳转，不使用toast延迟
	uni.navigateTo({
		url: '/pages/login/index',
		success: () => {
			console.log('跳转成功')
		},
		fail: (err) => {
			console.log('跳转失败:', err)
			uni.showToast({
				title: '跳转失败',
				icon: 'none'
			})
		}
	})
}

const goToOrderList = (type) => {
	uni.navigateTo({
		url: `/pages/order/list?type=${type}`
	})
}

const handleServiceClick = (item) => {
	if (item.url) {
		uni.navigateTo({
			url: item.url
		})
	} else {
		uni.showToast({
			title: '功能开发中',
			icon: 'none'
		})
	}
}

const handleOtherClick = (item) => {
	if (item.url) {
		uni.navigateTo({
			url: item.url
		})
	} else {
		uni.showToast({
			title: '功能开发中',
			icon: 'none'
		})
	}
}

const logout = () => {
	uni.showModal({
		title: '提示',
		content: '确定要退出登录吗？',
		success: (res) => {
			if (res.confirm) {
				// 清除本地存储
				try {
					uni.removeStorageSync('isLoggedIn')
					uni.removeStorageSync('userInfo')
				} catch (e) {
					console.log('清除存储失败:', e)
				}

				// 清除页面状态
				userInfo.value = {
					avatar: '../../static/default-avatar.png',
					nickname: '未登录',
					phone: '点击登录',
					level: '',
					points: 0,
					coupons: 0,
					balance: '0.00'
				}
				isLoggedIn.value = false
				unreadCount.value = 0

				uni.showToast({
					title: '退出成功',
					icon: 'success'
				})

				// 跳转到登录页面
				setTimeout(() => {
					uni.reLaunch({
						url: '/pages/login/index'
					})
				}, 1500)
			}
		}
	})
}

// 检查登录状态
const checkLoginStatus = () => {
	try {
		const isLoggedInStorage = uni.getStorageSync('isLoggedIn')
		const userInfoStorage = uni.getStorageSync('userInfo')
		
		console.log('存储的登录状态:', isLoggedInStorage)
		console.log('存储的用户信息:', userInfoStorage)
		
		if (isLoggedInStorage && userInfoStorage) {
			isLoggedIn.value = true
			userInfo.value = userInfoStorage
			console.log('设置登录状态为true，用户信息已更新')
		} else {
			isLoggedIn.value = false
			userInfo.value = {
				avatar: '../../static/default-avatar.png',
				nickname: '未登录',
				phone: '点击登录',
				level: '',
				points: 0,
				coupons: 0,
				balance: '0.00'
			}
			console.log('设置登录状态为false，使用默认用户信息')
		}
	} catch (e) {
		console.log('检查登录状态失败:', e)
		isLoggedIn.value = false
	}
}

onMounted(() => {
	console.log('我的页面加载完成')
	checkLoginStatus()
})
</script>

<style lang="scss" scoped>
.my-container {
	min-height: 100vh;
	background: #f5f5f5;
}

// 顶部导航栏
.my-header {
	background: #fff;
	padding: 0 32rpx;
	padding-bottom: 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.my-title {
		font-size: 36rpx;
		font-weight: 600;
		color: #000;
	}
}

// 用户信息区域
.user-info {
	background: linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%);
	padding: 40rpx 32rpx 60rpx;
	margin-bottom: 20rpx;
	position: relative;
	margin: 0 32rpx 20rpx;
	border-radius: 20rpx;


	.user-main {
		display: flex;
		align-items: center;
		margin-bottom: 40rpx;

		.user-avatar {
			position: relative;
			margin-right: 30rpx;
			flex-shrink: 0;

			.avatar-img {
				width: 120rpx;
				height: 120rpx;
				border-radius: 60rpx;
				border: 4rpx solid #fff;
			}

			.edit-icon {
				position: absolute;
				bottom: 0;
				right: 0;
				background: #fff;
				width: 36rpx;
				height: 36rpx;
				border-radius: 18rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 20rpx;
				box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);

				.edit-icon-img {
					width: 20rpx;
					height: 20rpx;
				}
			}
		}

		.user-details {
			flex: 1;

			.username {
				font-size: 36rpx;
				font-weight: 600;
				color: #fff;
				margin-bottom: 10rpx;
				display: block;
			}

		.user-phone {
			font-size: 24rpx;
			color: rgba(255, 255, 255, 0.8);
			margin-bottom: 20rpx;
			display: block;

			&.login-hint {
				color: rgba(255, 255, 255, 0.9);
				text-decoration: underline;
				cursor: pointer;
			}
		}

			.user-level {
				display: inline-block;

				.level-text {
					background: rgba(255, 255, 255, 0.2);
					color: #fff;
					font-size: 24rpx;
					padding: 8rpx 20rpx;
					border-radius: 20rpx;
					border: 2rpx solid rgba(255, 255, 255, 0.3);
				}
			}
		}
	}

	.user-stats {
		display: flex;
		justify-content: space-around;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 20rpx;
		padding: 30rpx 20rpx;
		backdrop-filter: blur(10rpx);

		.stat-item {
			text-align: center;

			.stat-number {
				font-size: 32rpx;
				font-weight: 600;
				color: #fff;
				display: block;
				margin-bottom: 8rpx;
			}

			.stat-label {
				font-size: 24rpx;
				color: rgba(255, 255, 255, 0.8);
			}
		}
	}
}

// 订单管理
.order-section {
	background: #fff;
	margin: 0 32rpx 20rpx;
	border-radius: 20rpx;
	padding: 30rpx;

	.order-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;

		.order-title {
			font-size: 32rpx;
			font-weight: 600;
			color: #000;
		}

		.view-all {
			font-size: 24rpx;
			color: #999;
			display: flex;
			align-items: center;

			.arrow {
				width: 24rpx;
				height: 24rpx;
			}
		}
	}

	.order-tabs {
		display: flex;
		justify-content: space-between;

		.order-tab {
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;

			.tab-icon {
				font-size: 48rpx;
				margin-bottom: 10rpx;

				.icon {
					width: 48rpx;
					height: 48rpx;
				}
			}

			.tab-text {
				font-size: 24rpx;
				color: #333;
			}

			.tab-badge {
				position: absolute;
				top: -10rpx;
				right: 0rpx;
				background: #ff4757;
				color: #fff;
				font-size: 20rpx;
				padding: 4rpx 8rpx;
				border-radius: 20rpx;
				min-width: 20rpx;
				text-align: center;
			}
		}
	}
}

// 我的服务
.service-section {
	background: #fff;
	margin: 0 32rpx 20rpx;
	border-radius: 20rpx;
	padding: 30rpx;

	.section-title {
		font-size: 32rpx;
		font-weight: 600;
		color: #000;
		margin-bottom: 30rpx;
		display: block;
	}

	.service-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 30rpx;

		.service-item {
			display: flex;
			flex-direction: column;
			align-items: center;

			.service-icon {
				font-size: 48rpx;
				margin-bottom: 10rpx;

				.icon {
					width: 48rpx;
					height: 48rpx;
				}
			}

			.service-text {
				font-size: 24rpx;
				color: #333;
			}
		}
	}
}

// 其他功能
.other-section {
	background: #fff;
	margin: 0 32rpx 20rpx;
	border-radius: 20rpx;
	padding: 0 30rpx;

	.other-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 0;
		border-bottom: 1rpx solid #f0f0f0;

		&:last-child {
			border-bottom: none;
		}

		.other-left {
			display: flex;
			align-items: center;

			.other-icon {
				font-size: 32rpx;
				margin-right: 20rpx;

				.icon {
					width: 50rpx;
					height: 50rpx;
				}
			}

			.other-text {
				font-size: 28rpx;
				color: #333;
			}
		}

		.arrow {
			width: 24rpx;
			height: 24rpx;
		}
	}
}

// 退出登录按钮
.logout-btn {
	background: #fff;
	margin: 0 32rpx 40rpx;
	border-radius: 20rpx;
	padding: 30rpx;
	text-align: center;
	border: 2rpx solid #ff4757;

	text {
		font-size: 28rpx;
		color: #ff4757;
		font-weight: 500;
	}
}
</style>
