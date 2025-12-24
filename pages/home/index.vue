<template>
	<view class="tabbar-container" :style="{ paddingTop: customNavBarHeight + 'px' }">
		<!-- 定位 -->
		<view class="location">
			<img src="../../static/location.png" alt="定位" srcset="" class="location-icon" />
			<span class="location-text">北京市朝阳区三里屯 SOHO</span>
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
			<up-waterfall v-model="flowList" columns="2">
				<template v-slot:column="{ colList, colIndex }">
					<view v-for="(item, index) in colList" :key="index">
						<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
						 <img src="../../static/goods/热门(29).png" alt="">
					</view>
				</template>
			</up-waterfall>
		</view>
	</view>
</template>

<script setup>
import {
	ref,
	reactive
} from 'vue';
// 自定义导航栏高度
const systemInfo = wx.getSystemInfoSync();
const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
console.log(systemInfo.statusBarHeight, '状态栏的高度');
console.log(menuButtonInfo.top - systemInfo.statusBarHeight, '胶囊顶部到状态栏的高度');
const customNavBarHeight = systemInfo.statusBarHeight + (menuButtonInfo.top - systemInfo.statusBarHeight)

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
]);
const categoryClick = (id) => {
	console.log('点击分类:', id)
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
}
</style>