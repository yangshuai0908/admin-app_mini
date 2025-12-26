<template>
	<view class="tabbar-container" :style="{ paddingTop: customNavBarHeight + 'px' }">
		<!-- 定位 -->
		<view class="location">
			<img src="../../static/location.png" alt="定位" srcset="" class="location-icon" />
			<span class="location-text">{{ currentAddress }}</span>
		</view>
		<!-- 搜索 -->
		<view class="search">
			<up-search placeholder="搜索宠物食品" v-model="keyword" :animation="true" />
		</view>
		<!-- 轮播图 -->
		<view class="swiper">
			<up-swiper :list="list" previousMargin="30" nextMargin="30" circular :autoplay="false" radius="5"
				bgColor="#ffffff" height="180" />
		</view>
		<!-- 分类 -->
		<view class="category">
			<view v-for="item in categoryList" :key="item.id" class="category-item" @click="categoryClick(item.id)">
				<img :src="item.icon" alt="" class="category-icon">
				<text>{{ item.name }}</text>
			</view>
		</view>
		<!-- 热门推荐 -->
		<view class="recommend">
			<view class="recommend-title">
				<text>热门推荐</text>
				<text>查看更多</text>
			</view>
			<scroll-view class="recommend-scroll" scroll-x="true" :show-scrollbar="false">
				<view class="recommend-item">
					<view v-for="item in recommendList" :key="item.id" class="recommend-item-box">
						<view>
							<img :src="item.img" alt="" class="recommend-item-img">
							<view class="recommend-item-info">
								<text class="recommend-item-title">{{ item.title }}</text>
								<text class="recommend-item-subtitle">{{ item.subtitle }}</text>
								<span class="recommend-item-price">
									￥{{ item.price }}
									<img src="../../static/goods/add.png" alt="" srcset="" class="recommend-item-icon">
								</span>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 瀑布流 -->
		<view class="waterfall">
			<up-waterfall v-model="flowList" ref="waterfall" columns="2">
				<template v-slot:column="{ colList, colIndex }">
					<view v-for="(item, index) in colList" :key="index" class="waterfall-item">
						<image :src="item.image" mode="widthFix" class="waterfall-image"></image>
						<view class="waterfall-tag">热品</view>
						<view class="waterfall-info">
							<text class="waterfall-title">{{ item.title }}</text>
							<text class="waterfall-sales">销量 {{ item.sales }}</text>
							<view class="waterfall-bottom">
								<text class="waterfall-price">￥{{ item.price }}</text>
								<view class="waterfall-item-add">
									<img src="../../static/goods/add.png" alt="" srcset="" class="waterfall-item-icon">
								</view>
							</view>
						</view>
					</view>
				</template>
			</up-waterfall>
		</view>
	</view>
</template>

<script setup>
import {
	ref,
	reactive,
	onMounted
} from 'vue';
// 自定义导航栏高度
const windowInfo = wx.getWindowInfo();
const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
console.log(windowInfo.statusBarHeight, '状态栏的高度');
console.log(menuButtonInfo.top - windowInfo.statusBarHeight, '胶囊顶部到状态栏的高度');
const customNavBarHeight = windowInfo.statusBarHeight + (menuButtonInfo.top - windowInfo.statusBarHeight)
// 定位
const currentAddress = ref('定位中...');
// 搜索
const keyword = ref();

// 轮播图
const list = reactive([
	'/static/swiper/swiper(1).png',
	'/static/swiper/swiper(2).png',
	'/static/swiper/swiper(3).png',
	'/static/swiper/swiper(4).png',
	'/static/swiper/swiper(5).png',
	'/static/swiper/swiper(6).png',
]);

// 轮播图事件处理


// 分类
const categoryList = ref([
	{
		id: 1,
		name: '狗粮专区',
		icon: '../../static/dogfood.png',
	},
	{
		id: 2,
		name: '猫粮专区',
		icon: '../../static/catfood.png',
	},
	{
		id: 3,
		name: '零食专区',
		icon: '../../static/pettreat.png',
	},
	{
		id: 4,
		name: '营养保健',
		icon: '../../static/nutrition.png',
	},
	{
		id: 5,
		name: '宠物玩具',
		icon: '../../static/pettoy.png',
	},
	{
		id: 6,
		name: '洗护用品',
		icon: '../../static/toiletries.png',
	},
	{
		id: 7,
		name: '宠物用品',
		icon: '../../static/petsupplies.png',
	},
	{
		id: 8,
		name: '水族专区',
		icon: '../../static/aquarium.png',
	}
])

// 瀑布流数据
const leftList = ref([
	{
		id: 1,
		image: '../../static/goods/热门(1).png',
		title: '皇家幼犬狗粮',
		price: '168'
	},
	{
		id: 2,
		image: '../../static/goods/热门(2).png',
		title: '喵星人猫粮',
		price: '199'
	},
	{
		id: 3,
		image: '../../static/goods/热门(3).png',
		title: '鸡肉干零食',
		price: '58'
	},
	{
		id: 4,
		image: '../../static/goods/热门(1).png',
		title: '金毛犬狗粮',
		price: '168'
	},
	{
		id: 5,
		image: '../../static/goods/热门(2).png',
		title: '英短猫粮',
		price: '220'
	},
	{
		id: 6,
		image: '../../static/goods/热门(3).png',
		title: '牛肉咬胶',
		price: '35'
	}
]);;
const categoryClick = (id) => {
	console.log('点击分类:', id)
	// 跳转到商品页面并传递分类ID
	uni.navigateTo({
		url: `/pages/goods/index?categoryId=${id}`
	})
}
// 热门推荐
const recommendList = ref([
	{
		id: 1,
		img: '../../static/goods/热门(1).png',
		title: '皇家幼犬狗粮',
		subtitle: '营养均衡配方',
		price: '168',
	},
	{
		id: 2,
		img: '../../static/goods/热门(2).png',
		title: '喵星人猫粮',
		subtitle: '添加牛磺酸',
		price: '199',
	},
	{
		id: 3,
		img: '../../static/goods/热门(3).png',
		title: '鸡肉干零食',
		subtitle: '无添加剂',
		price: '58',
	},
	{
		id: 4,
		img: '../../static/goods/热门(17).png',
		title: '金毛犬狗粮',
		subtitle: '营养均衡配方',
		price: '168',
	},
	{
		id: 5,
		img: '../../static/goods/热门(18).png',
		title: '金毛犬狗粮',
		subtitle: '营养均衡配方',
		price: '168',
	}
])

// 瀑布流数据
const flowList = ref([
	{
		id: 1,
		image: '../../static/goods/热门(29).png',
		title: '皇家幼犬狗粮',
		sales: '1.2万',
		tag: '新品',
		price: '168'
	},
	{
		id: 2,
		image: '../../static/goods/热门(30).png',
		title: '喵星人猫粮',
		sales: '1.2万',
		tag: '新品',
		price: '199'
	},
	{
		id: 3,
		image: '../../static/goods/热门(3).png',
		title: '鸡肉干零食',
		sales: '1.2万',
		tag: '热销',
		price: '58'
	},
	{
		id: 4,
		image: '../../static/goods/热门(1).png',
		title: '金毛犬狗粮',
		sales: '1.2万',
		tag: '热销',
		price: '168'
	},
	{
		id: 5,
		image: '../../static/goods/热门(2).png',
		title: '英短猫粮',
		sales: '1.2万',
		tag: '新品',
		price: '220'
	},
	{
		id: 6,
		image: '../../static/goods/热门(3).png',
		title: '牛肉咬胶',
		sales: '1.2万',
		tag: '爆品',
		price: '35'
	}
]);
// 定位
const getLocation = () => {
	uni.getLocation({
		type: 'wgs84',
		success: (res) => {
			console.log('获取位置成功:', res)
			currentAddress.value = res.address
		},
		fail: (err) => {
			console.log('获取位置失败:', err)
			// 拒绝授权
			if (err.errMsg.includes('auth deny') || err.errMsg.includes('unauthorized')) {
				handleAuthDeny()
			} else {
				err = '定位失败，请稍后重试';
			}
		}
	})
}
const handleAuthDeny = () => {
	uni.showModal({
		title: '提示',
		content: '请允许小程序获取您的位置信息',
		success: (res) => {
			if (res.confirm) {
				uni.openSetting({
					success: (res) => {
						console.log('打开设置成功:', res)
					},
					fail: (err) => {
						console.log('打开设置失败:', err)
					}
				})
			}
		}
	})
}
onMounted(() => {
	getLocation()
})
</script>

<style lang="scss" scoped>
.tabbar-container {
	// 定位
	.location {
		display: flex;
		align-items: center;
		padding: 0 16px;

		.location-icon {
			width: 28px;
			height: 28px;
		}

		.location-text {
			font-size: 14px;
			color: #374151;
		}
	}

	// 搜索
	.search {
		margin: 12px 16px;
	}

	// 轮播图
	.swiper {
		margin-bottom: 24px
	}

	// 分类
	.category {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		padding: 0 16px;
		margin-bottom: 24px;
		gap: 16px;

		.category-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: calc(25% - 12px);

			.category-icon {
				width: 64px;
				height: 64px;
			}

			text {
				font-size: 14px;
				color: #374151;
			}
		}
	}

	// 热门推荐
	.recommend {
		padding: 0 16px;
		margin-bottom: 24px;

		.recommend-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 16px;

			text {
				font-size: 18px;
				font-weight: 700;
				color: #000;
			}

			text:last-child {
				font-size: 14px;
				color: #FF6B35;
			}
		}

		.recommend-scroll {
			white-space: nowrap;
		}

		.recommend-item {
			display: flex;
			align-items: center;
			gap: 16px;
			padding-bottom: 10px;

			.recommend-item-box {
				display: flex;
				flex-direction: column;
				flex-shrink: 0;

				view {
					display: flex;
					flex-direction: column;
				}

				.recommend-item-img {
					width: 140px;
					height: 140px;
					border-radius: 18px 18px 0 0;
				}

				.recommend-item-info {
					box-sizing: border-box;
					width: 140px;
					height: 88px;
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					padding: 8px 8px 0 8px;
					border-radius: 0 0 18px 18px;
					box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

					.recommend-item-title {
						color: #000;
						font-weight: 600;
						font-size: 14px;
						margin-bottom: 4px;
					}

					.recommend-item-subtitle {
						color: #6B7280;
						font-weight: 600;
						font-size: 14px;
						margin-bottom: 10px;
					}

					.recommend-item-price {
						display: flex;
						align-items: center;
						justify-content: space-between;
						color: #FF6B35;
						font-weight: 700;
						font-size: 16px;

						.recommend-item-icon {
							width: 24px;
							height: 24px;
						}
					}
				}
			}
		}
	}

	// 瀑布流
	.waterfall {
		padding: 0 16px;

		.waterfall-item {
			width: calc((100vw - 48px) / 2);
			background: #fff;
			border-radius: 8px;
			margin-bottom: 16px;
			overflow: hidden;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
			position: relative;

			.waterfall-image {
				width: 100%;
				border-radius: 8px 8px 0 0;
			}

			.waterfall-tag {
				position: absolute;
				top: 8px;
				right: 8px;
				background: #fcede7;
				color: #FF6B35;
				font-size: 12px;
				padding: 4px 8px;
				border-radius: 20px;
				width: 40px;
				height: 24px;
				display: flex;
				font-weight: 500;
				align-items: center;
				justify-content: center;
			}

			.waterfall-info {
				padding: 12px;

				.waterfall-title {
					font-size: 14px;
					color: #333;
					font-weight: 600;
					display: block;
					margin-bottom: 4px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.waterfall-sales {
					font-size: 12px;
					color: #6B7280;
					font-weight: 600;
					display: block;
				}

				.waterfall-price {
					font-size: 16px;
					color: #FF6B35;
					font-weight: 700;
					display: block;
				}

				.waterfall-bottom {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 4px;

					.waterfall-item-add {
						.waterfall-item-icon {
							width: 24px;
							height: 24px;
						}
					}
				}

			}
		}
	}
}
</style>