<template>
	<view class="cart-container">
		<!-- 顶部导航栏 -->
		<view class="cart-header" :style="{ paddingTop: customNavBarHeight + 'px' }">
			<text class="cart-title">购物车({{ cartList.length }})</text>
		</view>

		<!-- 购物车为空 -->
		<view v-if="cartList.length === 0" class="cart-empty">
			<up-empty mode="car" icon="http://cdn.uviewui.com/uview/empty/car.png" />
			<text class="empty-text">购物车还是空的</text>
			<view class="empty-button" @click="goToHome">
				<text>去逛逛</text>
			</view>
		</view>

		<!-- 购物车列表 -->
		<view v-else class="cart-content">
			<!-- 全选 -->
			<!-- <view class="select-all">
				<view class="select-item" @click="toggleSelectAll">
					<view class="checkbox" :class="{ checked: isAllSelected }">
						<text v-if="isAllSelected" class="check-icon">✓</text>
					</view>
					<text>全选</text>
				</view>
			</view> -->
			<view>
				<up-notice-bar :text="text" mode="closable"></up-notice-bar>
			</view>

			<!-- 商品列表 -->
			<view class="cart-list">
				<view v-for="(item, index) in cartList" :key="item.id" class="cart-item">
					<!-- 选择框 -->
					<view class="cart-item-select" @click="toggleSelect(index)">
						<view class="checkbox" :class="{ checked: item.selected }">
							<text v-if="item.selected" class="check-icon">✓</text>
						</view>
					</view>

					<!-- 商品信息 -->
					<view class="cart-item-content">
						<image :src="item.image" class="item-image" mode="aspectFit"></image>
						<view class="item-info">
							<text class="item-title">{{ item.title }}</text>
							<text class="item-spec">{{ item.spec }}</text>
							<view class="item-bottom">
								<text class="item-price">￥{{ item.price }}</text>
								<view class="quantity-control">
									<view class="quantity-btn minus" @click="decreaseQuantity(index)"
										:class="{ disabled: item.quantity <= 1 }">
										<text>-</text>
									</view>
									<input type="number" v-model="item.quantity" class="quantity-input"
										@input="onQuantityInput(index)" />
									<view class="quantity-btn plus" @click="increaseQuantity(index)">
										<text>+</text>
									</view>
								</view>
							</view>
						</view>
						<view class="delete-btn" @click="deleteItem(index)">
							<img src="../../static/delete.png" alt="" srcset="" class="delete-icon">
						</view>
					</view>
				</view>
			</view>

			<!-- 推荐商品 -->
			<view class="recommend-section">
				<view class="recommend-title">
					<text>为您推荐</text>
				</view>
				<view class="recommend-grid">
					<view v-for="item in recommendList" :key="item.id" class="recommend-item" @click="addToCart(item)">
						<image :src="item.image" class="recommend-image" mode="aspectFit"></image>
						<text class="recommend-title-text">{{ item.title }}</text>
						<view class="recommend-price">
							<text>￥{{ item.price }}</text>
							<view class="add-icon">+</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部结算栏 -->
		<view v-if="cartList.length > 0" class="cart-footer">
			<view class="footer-left">
				<view class="select-all-footer" @click="toggleSelectAll">
					<view class="checkbox" :class="{ checked: isAllSelected }">
						<text v-if="isAllSelected" class="check-icon">✓</text>
					</view>
					<text>全选</text>
				</view>
				<view class="total-price">
					<text>合计：</text>
					<text class="price">￥{{ totalPrice }}</text>
				</view>
			</view>
			<view class="settlement-btn" @click="settlement" :class="{ disabled: selectedCount === 0 }">
				<text>结算({{ selectedCount }})</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 自定义导航栏高度
const systemInfo = wx.getSystemInfoSync()
const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
const customNavBarHeight = systemInfo.statusBarHeight + (menuButtonInfo.top - systemInfo.statusBarHeight)


const text = ref('uview-plus UI众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让您快速集成，开箱即用');
// 购物车数据
const cartList = ref([
	{
		id: 1,
		title: '皇家幼犬狗粮',
		spec: '规格：2.5kg',
		price: '168',
		image: '../../static/goods/热门(1).png',
		quantity: 1,
		selected: true
	},
	{
		id: 2,
		title: '喵星人猫粮',
		spec: '规格：1.8kg',
		price: '199',
		image: '../../static/goods/热门(2).png',
		quantity: 2,
		selected: true
	},
	{
		id: 3,
		title: '鸡肉干零食',
		spec: '规格：500g',
		price: '58',
		image: '../../static/goods/热门(3).png',
		quantity: 1,
		selected: false
	}
])

// 推荐商品
const recommendList = ref([
	{
		id: 4,
		title: '金毛犬狗粮',
		price: '168',
		image: '../../static/goods/热门(1).png'
	},
	{
		id: 5,
		title: '英短猫粮',
		price: '220',
		image: '../../static/goods/热门(2).png'
	},
	{
		id: 6,
		title: '牛肉咬胶',
		price: '35',
		image: '../../static/goods/热门(3).png'
	},
	{
		id: 7,
		title: '营养膏',
		price: '88',
		image: '../../static/goods/热门(1).png'
	}
])

// 计算属性
const isAllSelected = computed(() => {
	return cartList.value.length > 0 && cartList.value.every(item => item.selected)
})

const selectedCount = computed(() => {
	return cartList.value.filter(item => item.selected).length
})

const totalPrice = computed(() => {
	return cartList.value
		.filter(item => item.selected)
		.reduce((total, item) => {
			return total + parseFloat(item.price) * item.quantity
		}, 0)
		.toFixed(2)
})

// 方法
const toggleSelectAll = () => {
	const newSelected = !isAllSelected.value
	cartList.value.forEach(item => {
		item.selected = newSelected
	})
}

const toggleSelect = (index) => {
	cartList.value[index].selected = !cartList.value[index].selected
}

const increaseQuantity = (index) => {
	cartList.value[index].quantity++
}

const decreaseQuantity = (index) => {
	if (cartList.value[index].quantity > 1) {
		cartList.value[index].quantity--
	}
}

const onQuantityInput = (index) => {
	let quantity = parseInt(cartList.value[index].quantity) || 1
	if (quantity < 1) quantity = 1
	if (quantity > 99) quantity = 99
	cartList.value[index].quantity = quantity
}

const deleteItem = (index) => uni.showModal({
	title: '提示',
	content: '确定要删除这个商品吗？',
	success: (res) => {
		if (res.confirm) {
			cartList.value.splice(index, 1)
			uni.showToast({
				title: '删除成功',
				icon: 'success'
			})
		}
	}
})

const addToCart = (item) => {
	const existingItem = cartList.value.find(cartItem => cartItem.id === item.id)
	if (existingItem) {
		existingItem.quantity++
	} else {
		cartList.value.push({
			...item,
			spec: '规格：默认',
			quantity: 1,
			selected: true
		})
	}
	uni.showToast({
		title: '已加入购物车',
		icon: 'success'
	})
}

const goToHome = () => {
	uni.switchTab({
		url: '/pages/home/index'
	})
}

const settlement = () => {
	if (selectedCount.value === 0) {
		uni.showToast({
			title: '请选择商品',
			icon: 'none'
		})
		return
	}

	uni.showModal({
		title: '确认结算',
		content: `共${selectedCount.value}件商品，总计￥${totalPrice.value}`,
		success: (res) => {
			if (res.confirm) {
				// 这里可以跳转到结算页面或调用支付接口
				uni.showToast({
					title: '正在跳转支付...',
					icon: 'loading'
				})
			}
		}
	})
}
onMounted(() => {
	console.log('购物车页面加载完成')
})
</script>

<style lang="scss" scoped>
.cart-container {
	padding-bottom: 120rpx;
}

// 顶部导航
.cart-header {
	background: #fff;
	padding: 0 32rpx;
	padding-bottom: 20rpx;
	position: sticky;
	top: 0;
	z-index: 100;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);

	.cart-title {
		font-size: 36rpx;
		font-weight: 600;
		color: #000;
	}
}

// 空购物车
.cart-empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-top: 200rpx;

	.empty-text {
		font-size: 28rpx;
		color: #999;
		margin-bottom: 40rpx;
	}

	.empty-button {
		background: #FF6B35;
		color: #fff;
		padding: 20rpx 60rpx;
		border-radius: 50rpx;
		font-size: 28rpx;
	}
}

// 购物车内容
.cart-content {
	padding: 0 32rpx;
}

// 全选
.select-all {
	background: #fff;
	padding: 30rpx 0;
	margin-bottom: 20rpx;
	border-radius: 16rpx;

	.select-item {
		display: flex;
		align-items: center;
		padding-left: 20rpx;

		.checkbox {
			width: 40rpx;
			height: 40rpx;
			border: 2rpx solid #ddd;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 20rpx;

			&.checked {
				background: #FF6B35;
				border-color: #FF6B35;

				.check-icon {
					color: #fff;
					font-size: 24rpx;
				}
			}
		}

		text {
			font-size: 28rpx;
			color: #333;
		}
	}
}

// 商品列表
.cart-list {
	.cart-item {
		background: #fff;
		padding: 30rpx 20rpx;
		margin-bottom: 20rpx;
		border-radius: 16rpx;
		display: flex;
		align-items: flex-start;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

		.cart-item-select {
			margin-right: 20rpx;

			.checkbox {
				width: 40rpx;
				height: 40rpx;
				border: 2rpx solid #ddd;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;

				&.checked {
					background: #FF6B35;
					border-color: #FF6B35;

					.check-icon {
						color: #fff;
						font-size: 24rpx;
					}
				}
			}
		}

		.cart-item-content {
			flex: 1;
			display: flex;

			.item-image {
				width: 160rpx;
				height: 160rpx;
				border-radius: 12rpx;
				margin-right: 20rpx;
				background: #f5f5f5;
			}

			.item-info {
				flex: 1;
				display: flex;
				flex-direction: column;

				.item-title {
					font-size: 28rpx;
					color: #333;
					font-weight: 500;
					margin-bottom: 10rpx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}

				.item-spec {
					font-size: 24rpx;
					color: #999;
					margin-bottom: 30rpx;
				}

				.item-bottom {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.item-price {
						font-size: 32rpx;
						color: #FF6B35;
						font-weight: 600;
					}

					.quantity-control {
						display: flex;
						align-items: center;

						.quantity-btn {
							width: 60rpx;
							height: 60rpx;
							border: 2rpx solid #ddd;
							display: flex;
							align-items: center;
							justify-content: center;
							font-size: 28rpx;
							color: #333;

							&.minus {
								border-radius: 8rpx 0 0 8rpx;

								&.disabled {
									color: #ccc;
									border-color: #eee;
								}
							}

							&.plus {
								border-radius: 0 8rpx 8rpx 0;
							}
						}

						.quantity-input {
							width: 80rpx;
							height: 60rpx;
							border-top: 2rpx solid #ddd;
							border-bottom: 2rpx solid #ddd;
							text-align: center;
							font-size: 28rpx;
							color: #333;
						}
					}
				}
			}

			.delete-btn {
				margin-left: 20rpx;
				padding: 10rpx;

				.delete-icon {
					width: 32rpx;
					height: 32rpx;
				}
			}
		}
	}
}

// 推荐商品
.recommend-section {
	margin-top: 40rpx;
	background: #fff;
	padding: 30rpx 20rpx;
	border-radius: 16rpx;

	.recommend-title {
		text {
			font-size: 32rpx;
			font-weight: 600;
			color: #000;
		}

		margin-bottom: 30rpx;
	}

	.recommend-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20rpx;

		.recommend-item {
			background: #f8f8f8;
			padding: 20rpx;
			border-radius: 12rpx;

			.recommend-image {
				width: 100%;
				height: 160rpx;
				border-radius: 8rpx;
				margin-bottom: 16rpx;
			}

			.recommend-title-text {
				font-size: 26rpx;
				color: #333;
				margin-bottom: 16rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}

			.recommend-price {
				display: flex;
				justify-content: space-between;
				align-items: center;

				text {
					font-size: 28rpx;
					color: #FF6B35;
					font-weight: 600;
				}

				.add-icon {
					width: 48rpx;
					height: 48rpx;
					background: #FF6B35;
					color: #fff;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 24rpx;
				}
			}
		}
	}
}

// 底部结算栏
.cart-footer {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background: #fff;
	padding: 20rpx 32rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
	z-index: 100;

	.footer-left {
		display: flex;
		align-items: center;
		flex: 1;

		.select-all-footer {
			display: flex;
			align-items: center;
			margin-right: 30rpx;

			.checkbox {
				width: 40rpx;
				height: 40rpx;
				border: 2rpx solid #ddd;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 20rpx;

				&.checked {
					background: #FF6B35;
					border-color: #FF6B35;

					.check-icon {
						color: #fff;
						font-size: 24rpx;
					}
				}
			}

			text {
				font-size: 28rpx;
				color: #333;
			}
		}

		.total-price {
			font-size: 28rpx;
			color: #333;

			.price {
				font-size: 36rpx;
				color: #FF6B35;
				font-weight: 600;
			}
		}
	}

	.settlement-btn {
		background: #FF6B35;
		color: #fff;
		padding: 20rpx 40rpx;
		border-radius: 50rpx;
		font-size: 28rpx;

		&.disabled {
			background: #ccc;
		}
	}
}
</style>