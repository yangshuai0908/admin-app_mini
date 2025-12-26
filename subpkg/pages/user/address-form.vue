<template>
	<view class="address-form-container">
		<!-- 顶部导航栏 -->
		<view class="form-header" :style="{ paddingTop: customNavBarHeight + 'px' }">
			<view class="nav-back" @click="goBack">
				<img src="../../../static/arrow_logo.png" alt="" srcset="" class="back-icon" />
			</view>
			<text class="nav-title">{{ isEdit ? '编辑地址' : '添加地址' }}</text>
			<view class="nav-save" @click="saveAddress">
				<text class="save-text">保存</text>
			</view>
		</view>

		<!-- 表单内容 -->
		<view class="form-content">
			<view class="form-item">
				<text class="form-label">收货人</text>
				<input 
					type="text" 
					v-model="addressData.name" 
					class="form-input" 
					placeholder="请输入收货人姓名"
					maxlength="20"
				/>
			</view>

			<view class="form-item">
				<text class="form-label">手机号码</text>
				<input 
					type="number" 
					v-model="addressData.phone" 
					class="form-input" 
					placeholder="请输入手机号码"
					maxlength="11"
				/>
			</view>

			<view class="form-item">
				<text class="form-label">省市区</text>
				<view class="region-selector" @click="showRegionPicker">
					<text class="region-text" :class="{ placeholder: !regionText }">
						{{ regionText || '请选择省市区' }}
					</text>
					<img src="../../../static/arrow.png" alt="" class="arrow-icon" />
				</view>
			</view>

			<view class="form-item">
				<text class="form-label">详细地址</text>
				<textarea 
					v-model="addressData.detail" 
					class="form-textarea" 
					placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等信息"
					maxlength="100"
					auto-height
				/>
			</view>

			<view class="form-item switch-item">
				<text class="form-label">设为默认地址</text>
				<switch 
					:checked="addressData.isDefault" 
					@change="onDefaultChange"
					color="#FF6B35"
				/>
			</view>
		</view>

		<!-- 保存按钮 -->
		<view class="bottom-action">
			<view class="save-btn" @click="saveAddress" :class="{ disabled: !canSave }">
				<text>{{ isEdit ? '保存修改' : '保存地址' }}</text>
			</view>
		</view>

		<!-- 省市区选择器 -->
		<up-picker 
			:show="showPicker" 
			:columns="regionColumns" 
			@confirm="onRegionConfirm"
			@cancel="onRegionCancel"
			keyName="name"
		></up-picker>
	</view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 自定义导航栏高度
const windowInfo = wx.getWindowInfo()
const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
const customNavBarHeight = windowInfo.statusBarHeight + (menuButtonInfo.top - windowInfo.statusBarHeight)

// 获取页面参数
const pages = getCurrentPages()
const currentPage = pages[pages.length - 1]
const options = currentPage.options || {}

// 判断是否为编辑模式
const isEdit = ref(options.action === 'edit')
const editId = ref(options.id || '')

// 地址数据
const addressData = ref({
	id: '',
	name: '',
	phone: '',
	province: '',
	city: '',
	district: '',
	detail: '',
	isDefault: false
})

// 显示选择器
const showPicker = ref(false)

// 省市区数据
const regionColumns = ref([
	// 省份数据
	[
		{ name: '北京市', code: '110000' },
		{ name: '上海市', code: '310000' },
		{ name: '广东省', code: '440000' },
		{ name: '浙江省', code: '330000' },
		{ name: '江苏省', code: '320000' }
	],
	// 城市数据
	[
		{ name: '北京市', code: '110100' },
		{ name: '上海市', code: '310100' },
		{ name: '广州市', code: '440100' },
		{ name: '深圳市', code: '440300' },
		{ name: '杭州市', code: '330100' }
	],
	// 区县数据
	[
		{ name: '朝阳区', code: '110105' },
		{ name: '海淀区', code: '110108' },
		{ name: '浦东新区', code: '310115' },
		{ name: '黄浦区', code: '310101' },
		{ name: '天河区', code: '440106' },
		{ name: '南山区', code: '440305' }
	]
])

// 计算显示的省市区文本
const regionText = computed(() => {
	if (addressData.value.province && addressData.value.city && addressData.value.district) {
		return `${addressData.value.province} ${addressData.value.city} ${addressData.value.district}`
	}
	return ''
})

// 是否可以保存
const canSave = computed(() => {
	return addressData.value.name.trim() &&
		   addressData.value.phone.trim() &&
		   addressData.value.province &&
		   addressData.value.city &&
		   addressData.value.district &&
		   addressData.value.detail.trim()
})

// 获取地址详情（编辑时使用）
const getAddressDetail = () => {
	if (!isEdit.value) return
	
	try {
		const addressList = uni.getStorageSync('addressList') || []
		const address = addressList.find(item => item.id === editId.value)
		
		if (address) {
			addressData.value = { ...address }
		}
	} catch (e) {
		console.error('获取地址详情失败:', e)
	}
}

// 显示省市区选择器
const showRegionPicker = () => {
	showPicker.value = true
}

// 确认选择省市区
const onRegionConfirm = (e) => {
	const [province, city, district] = e.value
	addressData.value.province = province.name
	addressData.value.city = city.name
	addressData.value.district = district.name
	showPicker.value = false
}

// 取消选择省市区
const onRegionCancel = () => {
	showPicker.value = false
}

// 切换默认地址
const onDefaultChange = (e) => {
	addressData.value.isDefault = e.detail.value
}

// 保存地址
const saveAddress = () => {
	if (!canSave.value) {
		uni.showToast({
			title: '请填写完整信息',
			icon: 'none'
		})
		return
	}

	// 验证手机号
	if (!/^1[3-9]\d{9}$/.test(addressData.value.phone)) {
		uni.showToast({
			title: '请输入正确的手机号',
			icon: 'none'
		})
		return
	}

	try {
		let addressList = uni.getStorageSync('addressList') || []
		
		if (isEdit.value) {
			// 编辑模式
			const index = addressList.findIndex(item => item.id === editId.value)
			if (index !== -1) {
				// 如果设为默认地址，先将其他地址设为非默认
				if (addressData.value.isDefault) {
					addressList.forEach(item => {
						item.isDefault = false
					})
				}
				addressList[index] = { ...addressData.value }
			}
		} else {
			// 添加模式
			const newAddress = {
				...addressData.value,
				id: Date.now().toString()
			}
			
			// 如果设为默认地址，先将其他地址设为非默认
			if (newAddress.isDefault) {
				addressList.forEach(item => {
					item.isDefault = false
				})
			}
			
			addressList.unshift(newAddress)
		}
		
		uni.setStorageSync('addressList', addressList)
		
		uni.showToast({
			title: isEdit.value ? '修改成功' : '添加成功',
			icon: 'success'
		})
		
		// 返回上一页
		setTimeout(() => {
			uni.navigateBack()
		}, 1500)
		
	} catch (e) {
		console.error('保存地址失败:', e)
		uni.showToast({
			title: '保存失败，请重试',
			icon: 'none'
		})
	}
}

// 返回上一页
const goBack = () => {
	uni.navigateBack({
		delta: 1
	})
}

// 页面加载时初始化数据
onMounted(() => {
	getAddressDetail()
})
</script>

<style lang="scss" scoped>
.address-form-container {
	min-height: 100vh;
	background: #f5f5f5;
	padding-bottom: 120rpx;
}

// 顶部导航栏
.form-header {
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

	.nav-save {
		.save-text {
			font-size: 32rpx;
			color: #FF6B35;
			font-weight: 600;
		}
	}
}

// 表单内容
.form-content {
	padding: 20rpx 32rpx;

	.form-item {
		background: #fff;
		padding: 30rpx;
		margin-bottom: 20rpx;
		border-radius: 16rpx;

		&.switch-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.form-label {
			font-size: 28rpx;
			color: #333;
			font-weight: 500;
			margin-bottom: 20rpx;
			display: block;
		}

		.form-input {
			width: 100%;
			height: 80rpx;
			background: #f8f8f8;
			border-radius: 12rpx;
			padding: 0 24rpx;
			font-size: 28rpx;
			color: #333;
			box-sizing: border-box;
		}

		.form-textarea {
			width: 100%;
			min-height: 120rpx;
			background: #f8f8f8;
			border-radius: 12rpx;
			padding: 24rpx;
			font-size: 28rpx;
			color: #333;
			line-height: 1.5;
			box-sizing: border-box;
		}

		.region-selector {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: #f8f8f8;
			border-radius: 12rpx;
			padding: 24rpx;
			min-height: 80rpx;

			.region-text {
				font-size: 28rpx;
				color: #333;
				flex: 1;

				&.placeholder {
					color: #999;
				}
			}

			.arrow-icon {
				width: 24rpx;
				height: 24rpx;
				opacity: 0.6;
			}
		}
	}
}

// 底部保存按钮
.bottom-action {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background: #fff;
	padding: 20rpx 32rpx;
	box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
	z-index: 100;

	.save-btn {
		width: 100%;
		background: #FF6B35;
		color: #fff;
		padding: 24rpx;
		border-radius: 50rpx;
		text-align: center;
		font-size: 28rpx;
		font-weight: 600;

		&.disabled {
			background: #ccc;
			color: #999;
		}
	}
}
</style>