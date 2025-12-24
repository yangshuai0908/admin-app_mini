<template>
	<view class="goods">
		<!-- 搜索框 -->
		<up-sticky bgColor="#fff">
			<view class="search">
				<up-search placeholder="搜索宠物食品" v-model="keyword" :animation="true" />
			</view>
			<!-- 标签栏 -->
			<view class="tabs">
				<up-tabs :list="listTabs" :current="currentTab" lineColor="#ff6b35" :activeStyle="{
					color: '#ff6b35',
					fontWeight: 'bold',
					transform: 'scale(1.05)'
				}" :inactiveStyle="{
					color: '#8997aa',
					transform: 'scale(1)'
				}" @click="handleTabs"></up-tabs>
			</view>
		</up-sticky>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="goods-item" v-for="(item, index) in tabList[currentTab]?.children" :key="index">
				<view class="goods-image-container">
					<up-image :src="item.cover" width="100%" height="160px" radius="8px"></up-image>
				</view>
				<view class="goods-info">
					<text class="goods-title">{{ item.title }}</text>
					<view class="goods-bottom">
						<text class="goods-price">￥{{ item.price }}</text>
						<view class="goods-add">
							<img src="/static/goods/add.png" alt="" class="goods-add-icon">
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
// 搜索
const keyword = ref();
// 当前选中的标签索引
const currentTab = ref(0);
// 标签栏
const listTabs = ref([
	{ name: '狗粮专区' },
	{ name: '猫粮专区' },
	{ name: '零食专区' },
	{ name: '营养保健' },
	{ name: '宠物玩具' },
	{ name: '洗护用品' },
	{ name: '宠物用品' },
	{ name: '水族用品' },
]);
const tabList = ref([
	{
		title: '狗粮专区', children: [
			{ title: '皇家幼犬狗粮', cover: '/static/goods/热门(1).png', price: 168 },
			{ title: '金毛犬狗粮', cover: '/static/goods/热门(2).png', price: 168 },
			{ title: '金毛犬狗粮', cover: '/static/goods/热门(2).png', price: 168 },
			{ title: '金毛犬狗粮', cover: '/static/goods/热门(2).png', price: 168 },
			{ title: '金毛犬狗粮', cover: '/static/goods/热门(2).png', price: 168 },
			{ title: '金毛犬狗粮', cover: '/static/goods/热门(2).png', price: 168 },
		]
	},
	{
		title: '猫粮专区', children: [
			{ title: '喵星人猫粮', cover: '/static/goods/热门(3).png', price: 199 },
			{ title: '英短猫粮', cover: '/static/goods/热门(1).png', price: 220 }
		]
	},
	{
		title: '零食专区', children: [
			{ title: '鸡肉干零食', cover: '/static/goods/热门(2).png', price: 58 },
			{ title: '牛肉咬胶', cover: '/static/goods/热门(3).png', price: 35 }
		]
	},
	{
		title: '营养保健', children: [
			{ title: '营养膏', cover: '/static/goods/热门(1).png', price: 88 },
			{ title: '维生素片', cover: '/static/goods/热门(2).png', price: 99 }
		]
	},
	{
		title: '宠物玩具', children: [
			{ title: '磨牙玩具', cover: '/static/goods/热门(3).png', price: 38 },
			{ title: '互动球', cover: '/static/goods/热门(1).png', price: 45 }
		]
	},
	{
		title: '洗护用品', children: [
			{ title: '宠物洗发水', cover: '/static/goods/热门(2).png', price: 68 },
			{ title: '宠物梳子', cover: '/static/goods/热门(3).png', price: 25 }
		]
	},
	{
		title: '宠物用品', children: [
			{ title: '宠物窝', cover: '/static/goods/热门(1).png', price: 128 },
			{ title: '宠物碗', cover: '/static/goods/热门(2).png', price: 48 }
		]
	},
	{
		title: '水族用品', children: [
			{ title: '鱼缸', cover: '/static/goods/热门(3).png', price: 288 },
			{ title: '鱼食', cover: '/static/goods/热门(1).png', price: 58 }
		]
	},
]);

const handleTabs = (item) => {
	console.log('选中标签:', item);
	currentTab.value = item.index;
};
</script>

<style lang="scss" scoped>
.goods {
	padding: 0 16px;

	.tabs {
		margin-bottom: 16px;
	}

	.goods-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 8px;

		.goods-item {
			width: calc(50% - 4px);
			background: #fff;
			border-radius: 8px;
			margin-bottom: 16px;
			overflow: hidden;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

			.goods-image-container {
				width: 100%;
			}

			.goods-info {
				padding: 12px;

				.goods-title {
					font-size: 14px;
					color: #333;
					font-weight: 600;
					display: block;
					margin-bottom: 8px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.goods-bottom {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.goods-price {
						font-size: 16px;
						color: #FF6B35;
						font-weight: 700;
					}

					.goods-add {
						.goods-add-icon {
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