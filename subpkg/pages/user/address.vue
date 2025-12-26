<template>
	<view class="address-container">
		<!-- 顶部导航栏 -->
		<view class="address-header" :style="{ paddingTop: customNavBarHeight + 'px' }">
			<view class="nav-back" @click="goBack">
				<img src="../../../static/arrow_logo.png" alt="" srcset="" class="back-icon" />
			</view>
			<text class="nav-title">地址管理</text>
			<view class="nav-placeholder"></view>
		</view>

		<!-- 地址列表 -->
		<view class="address-list">
			<view v-if="addressList.length === 0" class="empty-state">
				<up-empty mode="address" />
				<view class="add-first-btn" @click="addAddress">
					<text>添加第一个地址</text>
				</view>
			</view>
			
			<view v-else>
				<view v-for="(address, index) in addressList" :key="address.id" class="address-item">
					<view class="address-content" @click="selectAddress(address)">
						<view class="address-info">
							<view class="contact-info">
								<text class="name">{{ address.name }}</text>
								<text class="phone">{{ address.phone }}</text>
								<view v-if="address.isDefault" class="default-badge">
									<text>默认</text>
								</view>
							</view>
							<view class="location-info">
								<text class="region">{{ address.province }} {{ address.city }} {{ address.district }}</text>
								<text class="detail">{{ address.detail }}</text>
							</view>
						</view>
					</view>
					
					<view class="address-actions">
						<view class="action-btn" @click="editAddress(address)">
							<img src="../../../static/edit.png" alt="" class="edit-icon">
							<text>编辑</text>
						</view>
						<view class="action-btn delete" @click="deleteAddress(address, index)">
							<img src="../../../static/delete.png" alt="" class="delete-icon">
							<text>删除</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部添加按钮 -->
		<view class="bottom-action">
			<view class="add-address-btn" @click="addAddress">
				<text>+ 添加新地址</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 自定义导航栏高度
const windowInfo = wx.getWindowInfo()
const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
const customNavBarHeight = windowInfo.statusBarHeight + (menuButtonInfo.top - windowInfo.statusBarHeight)

// 地址列表数据
const addressList = ref([])

// 获取地址列表
const getAddressList = () => {
	try {
		const savedAddresses = uni.getStorageSync('addressList')
		if (savedAddresses) {
			addressList.value = savedAddresses
		}
	} catch (e) {
		console.error('获取地址列表失败:', e)
	}
}

// 添加地址
const addAddress = () => {
	uni.navigateTo({
		url: '/subpkg/pages/user/address-form?action=add'
	})
}

// 编辑地址
const editAddress = (address) => {
	uni.navigateTo({
		url: `/subpkg/pages/user/address-form?action=edit&id=${address.id}`
	})
}

// 选择地址（用于下单时选择）
const selectAddress = (address) => {
	const pages = getCurrentPages()
	const prevPage = pages[pages.length - 2]
	
	if (prevPage) {
		// 如果是从订单页面跳转过来的，选择地址后返回
		prevPage.$vm.selectedAddress = address
		uni.navigateBack()
	}
}

// 删除地址
const deleteAddress = (address, index) => {
	uni.showModal({
		title: '提示',
		content: '确定要删除这个地址吗？',
		success: (res) => {
			if (res.confirm) {
				addressList.value.splice(index, 1)
				saveAddressList()
				uni.showToast({
					title: '删除成功',
					icon: 'success'
				})
			}
		}
	})
}

// 保存地址列表到本地存储
const saveAddressList = () => {
	try {
		uni.setStorageSync('addressList', addressList.value)
	} catch (e) {
		console.error('保存地址列表失败:', e)
	}
}

// 返回上一页
const goBack = () => {
	uni.navigateBack({
		delta: 1
	})
}

// 页面加载时获取地址列表
onMounted(() => {
	getAddressList()
})
</script>

<style lang="scss" scoped>
.address-container {
	min-height: 100vh;
	background: #f5f5f5;
	padding-bottom: 120rpx;
}

// 顶部导航栏
.address-header {
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

// 地址列表
.address-list {
	padding: 20rpx 32rpx;

	.empty-state {
		text-align: center;
		padding: 100rpx 0;

		.add-first-btn {
			background: #FF6B35;
			color: #fff;
			padding: 20rpx 60rpx;
			border-radius: 50rpx;
			font-size: 28rpx;
			margin-top: 40rpx;
			display: inline-block;
		}
	}

	.address-item {
		background: #fff;
		border-radius: 16rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);

		.address-content {
			flex: 1;
		}

		.address-info {
			.contact-info {
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;

				.name {
					font-size: 32rpx;
					font-weight: 600;
					color: #333;
					margin-right: 20rpx;
				}

				.phone {
					font-size: 28rpx;
					color: #666;
					margin-right: 20rpx;
				}

				.default-badge {
					background: #FF6B35;
					color: #fff;
					font-size: 20rpx;
					padding: 4rpx 12rpx;
					border-radius: 12rpx;

					text {
						font-size: 20rpx;
					}
				}
			}

			.location-info {
				.region {
					font-size: 26rpx;
					color: #666;
					margin-bottom: 8rpx;
					display: block;
				}

				.detail {
					font-size: 28rpx;
					color: #333;
					line-height: 1.5;
					display: block;
				}
			}
		}

		.address-actions {
			display: flex;
			justify-content: flex-end;
			margin-top: 20rpx;
			padding-top: 20rpx;
			border-top: 1rpx solid #f0f0f0;

			.action-btn {
				display: flex;
				align-items: center;
				margin-left: 40rpx;

				.edit-icon, .delete-icon {
					width: 28rpx;
					height: 28rpx;
					margin-right: 8rpx;
				}

				text {
					font-size: 26rpx;
					color: #666;
				}

				&.delete {
					text {
						color: #ff4757;
					}
				}
			}
		}
	}
}

// 底部添加按钮
.bottom-action {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background: #fff;
	padding: 20rpx 32rpx;
	box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
	z-index: 100;

	.add-address-btn {
		width: 100%;
		background: #FF6B35;
		color: #fff;
		padding: 24rpx;
		border-radius: 50rpx;
		text-align: center;
		font-size: 28rpx;
		font-weight: 600;
	}
}
</style>