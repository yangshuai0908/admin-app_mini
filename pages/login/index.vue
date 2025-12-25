<template>
	<view class="login-container">
		<!-- 顶部导航栏 -->
		<view class="login-header" :style="{ paddingTop: customNavBarHeight + 'px' }">
			<view class="nav-back" @click="goBack">
				<text class="back-icon">←</text>
			</view>
			<text class="nav-title">登录</text>
			<view class="nav-placeholder"></view>
		</view>

		<!-- 登录内容区域 -->
		<view class="login-content">
			<!-- Logo和标题 -->
			<view class="login-logo">
				<image src="../../static/logo.png" class="logo-img" mode="aspectFit"></image>
				<text class="logo-title">宠物商城</text>
				<text class="logo-subtitle">为爱宠提供最好的生活</text>
			</view>

			<!-- 登录方式切换 -->
			<view class="login-tabs">
				<view 
					class="tab-item" 
					:class="{ active: loginType === 'phone' }" 
					@click="switchLoginType('phone')"
				>
					<text>手机号登录</text>
				</view>
				<view 
					class="tab-item" 
					:class="{ active: loginType === 'wechat' }" 
					@click="switchLoginType('wechat')"
				>
					<text>微信登录</text>
				</view>
			</view>

			<!-- 手机号登录表单 -->
			<view v-if="loginType === 'phone'" class="login-form">
				<view class="form-item">
					<text class="form-label">手机号</text>
					<input 
						type="number" 
						v-model="phone" 
						class="form-input" 
						placeholder="请输入手机号"
						maxlength="11"
					/>
				</view>
				
				<view class="form-item">
					<text class="form-label">验证码</text>
					<view class="code-input-wrapper">
						<input 
							type="number" 
							v-model="code" 
							class="form-input code-input" 
							placeholder="请输入验证码"
							maxlength="6"
						/>
						<view 
							class="code-btn" 
							:class="{ disabled: !canSendCode }" 
							@click="sendCode"
						>
							<text>{{ codeText }}</text>
						</view>
					</view>
				</view>

				<view class="login-btn" @click="phoneLogin" :class="{ disabled: !canLogin }">
					<text>登录</text>
				</view>
			</view>

			<!-- 微信登录 -->
			<view v-if="loginType === 'wechat'" class="wechat-login">
				<view class="wechat-btn" @click="wechatLogin">
					<text class="wechat-icon">🟢</text>
					<text>微信一键登录</text>
				</view>
			</view>


			<!-- 用户协议 -->
			<view class="agreement">
				<view class="checkbox-wrapper" @click="toggleAgreement">
					<view class="checkbox" :class="{ checked: agreedToTerms }">
						<text v-if="agreedToTerms" class="check-icon">✓</text>
					</view>
				</view>
				<text class="agreement-text">
					我已阅读并同意
					<text class="link" @click="openUserAgreement">《用户协议》</text>
					和
					<text class="link" @click="openPrivacyPolicy">《隐私政策》</text>
				</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 自定义导航栏高度
const systemInfo = wx.getSystemInfoSync()
const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
const customNavBarHeight = systemInfo.statusBarHeight + (menuButtonInfo.top - systemInfo.statusBarHeight)

// 登录类型
const loginType = ref('phone')

// 表单数据
const phone = ref('')
const code = ref('')

// 验证码相关
const canSendCode = computed(() => {
	return /^1[3-9]\d{9}$/.test(phone.value) && countdown.value === 0
})

const countdown = ref(0)
const codeText = computed(() => {
	return countdown.value > 0 ? `${countdown.value}s` : '获取验证码'
})

// 登录按钮状态
const canLogin = computed(() => {
	return phone.value.length === 11 && code.value.length === 6 && agreedToTerms.value
})

// 用户协议
const agreedToTerms = ref(false)

// 切换登录类型
const switchLoginType = (type) => {
	loginType.value = type
}

// 发送验证码
const sendCode = () => {
	if (!canSendCode.value) return
	
	uni.showToast({
		title: '验证码已发送',
		icon: 'success'
	})
	
	// 开始倒计时
	countdown.value = 60
	const timer = setInterval(() => {
		countdown.value--
		if (countdown.value <= 0) {
			clearInterval(timer)
		}
	}, 1000)
}

// 手机号登录
const phoneLogin = () => {
	if (!canLogin.value) return
	
	uni.showLoading({
		title: '登录中...'
	})
	
	// 模拟登录请求
	setTimeout(() => {
		uni.hideLoading()
		uni.showToast({
			title: '登录成功',
			icon: 'success'
		})
		
		// 存储用户信息
		uni.setStorageSync('isLoggedIn', true)
		uni.setStorageSync('userInfo', {
			phone: phone.value,
			nickname: '宠物爱好者',
			avatar: '../../static/default-avatar.png'
		})
		
		// 跳转到上一页或首页
		setTimeout(() => {
			uni.switchTab({
				url: '/pages/home/index'
			})
		}, 1500)
	}, 2000)
}

// 微信登录
const wechatLogin = () => {
	uni.showLoading({
		title: '登录中...'
	})
	
	// 调用微信登录
	uni.login({
		provider: 'weixin',
		success: (loginRes) => {
			// 获取用户信息
			uni.getUserInfo({
				provider: 'weixin',
				success: (infoRes) => {
					uni.hideLoading()
					uni.showToast({
						title: '登录成功',
						icon: 'success'
					})
					
					// 存储用户信息
					uni.setStorageSync('isLoggedIn', true)
					uni.setStorageSync('userInfo', {
						nickname: infoRes.userInfo.nickName,
						avatar: infoRes.userInfo.avatarUrl,
						openid: loginRes.code
					})
					
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/home/index'
						})
					}, 1500)
				},
				fail: () => {
					uni.hideLoading()
					uni.showToast({
						title: '获取用户信息失败',
						icon: 'none'
					})
				}
			})
		},
		fail: () => {
			uni.hideLoading()
			uni.showToast({
				title: '微信登录失败',
				icon: 'none'
			})
		}
	})
}

// 切换协议同意状态
const toggleAgreement = () => {
	agreedToTerms.value = !agreedToTerms.value
}

// 打开用户协议
const openUserAgreement = () => {
	uni.navigateTo({
		url: '/pages/my/agreement'
	})
}

// 打开隐私政策
const openPrivacyPolicy = () => {
	uni.navigateTo({
		url: '/pages/my/privacy'
	})
}

// 返回上一页
const goBack = () => {
	uni.navigateBack({
		delta: 1
	})
}
</script>

<style lang="scss" scoped>
.login-container {
	min-height: 100vh;
	background: linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%);
}

// 顶部导航栏
.login-header {
	background: transparent;
	padding: 0 32rpx;
	padding-bottom: 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.nav-back {
		width: 60rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 30rpx;

		.back-icon {
			font-size: 32rpx;
			color: #fff;
			font-weight: 600;
		}
	}

	.nav-title {
		font-size: 36rpx;
		font-weight: 600;
		color: #fff;
	}

	.nav-placeholder {
		width: 60rpx;
	}
}

// 登录内容区域
.login-content {
	padding: 60rpx 60rpx 0;
}

// Logo区域
.login-logo {
	text-align: center;
	margin-bottom: 80rpx;

	.logo-img {
		width: 120rpx;
		height: 120rpx;
		margin-bottom: 30rpx;
	}

	.logo-title {
		font-size: 48rpx;
		font-weight: 700;
		color: #fff;
		margin-bottom: 16rpx;
		display: block;
	}

	.logo-subtitle {
		font-size: 28rpx;
		color: rgba(255, 255, 255, 0.8);
		display: block;
	}
}

// 登录方式切换
.login-tabs {
	display: flex;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 50rpx;
	padding: 8rpx;
	margin-bottom: 60rpx;

	.tab-item {
		flex: 1;
		text-align: center;
		padding: 20rpx;
		border-radius: 40rpx;
		transition: all 0.3s;

		text {
			font-size: 28rpx;
			color: rgba(255, 255, 255, 0.8);
		}

		&.active {
			background: #fff;

			text {
				color: #FF6B35;
				font-weight: 600;
			}
		}
	}
}

// 登录表单
.login-form {
	.form-item {
		margin-bottom: 40rpx;

		.form-label {
			font-size: 28rpx;
			color: rgba(255, 255, 255, 0.9);
			margin-bottom: 16rpx;
			display: block;
		}

		.form-input {
			width: 100%;
			height: 100rpx;
			background: rgba(255, 255, 255, 0.9);
			border-radius: 50rpx;
			padding: 0 40rpx;
			font-size: 32rpx;
			color: #333;
			box-sizing: border-box;
		}

		.code-input-wrapper {
			display: flex;
			align-items: center;
			gap: 20rpx;

			.code-input {
				flex: 1;
			}

			.code-btn {
				width: 180rpx;
				height: 100rpx;
				background: rgba(255, 255, 255, 0.9);
				border-radius: 50rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-shrink: 0;

				text {
					font-size: 28rpx;
					color: #FF6B35;
					font-weight: 600;
				}

				&.disabled {
					text {
						color: #ccc;
					}
				}
			}
		}
	}

	.login-btn {
		width: 100%;
		height: 100rpx;
		background: #fff;
		border-radius: 50rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 40rpx;

		text {
			font-size: 32rpx;
			color: #FF6B35;
			font-weight: 600;
		}

		&.disabled {
			background: rgba(255, 255, 255, 0.5);

			text {
				color: rgba(255, 107, 53, 0.5);
			}
		}
	}
}

// 微信登录
.wechat-login {
	.wechat-btn {
		width: 100%;
		height: 100rpx;
		background: #07C160;
		border-radius: 50rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 20rpx;

		.wechat-icon {
			font-size: 32rpx;
		}

		text {
			font-size: 32rpx;
			color: #fff;
			font-weight: 600;
		}
	}
}

// 用户协议
.agreement {
	display: flex;
	align-items: flex-start;
	margin-top: 60rpx;
	padding: 0 20rpx;

	.checkbox-wrapper {
		margin-right: 16rpx;
		margin-top: 4rpx;

		.checkbox {
			width: 32rpx;
			height: 32rpx;
			border: 2rpx solid rgba(255, 255, 255, 0.6);
			border-radius: 6rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			&.checked {
				background: #fff;
				border-color: #fff;

				.check-icon {
					color: #FF6B35;
					font-size: 24rpx;
				}
			}
		}
	}

	.agreement-text {
		font-size: 24rpx;
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.5;

		.link {
			color: #fff;
			text-decoration: underline;
		}
	}
}
</style>