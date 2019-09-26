<template>
  <div class="parent wrap">
    <Left></Left>
		<div class="rightfloat wrap-right">
			<div id="rightContent">
				<!--解决路由参数变化，页面不更新的方法：增加一个不同:key值，这样vue就会识别这是不同的router-view了 -->
				<!-- <router-view :key="random"/> -->
				<router-view/> 
			</div>
		</div>
		<div class="erweima" v-show="isClose">
			<span @click="closeEwm()">X</span>
			<img src="../assets/img/erweima.jpg">扫一扫&nbsp;&nbsp;&nbsp;&nbsp;关注我们
		</div>
		<div class="to-top-btn" @click="toTop()" title="返回顶部"></div>
  </div>
</template>

<script>
import Left from '@/components/Left.vue'

export default {
  name: 'index',
	data() {
		return {
			isClose: true
		}
	},
  components: {
    Left
  },
	computed: {
		random() {
			return this.$route.path + Math.random()
		}
	},
	methods: {
		toTop() {
		  document.body.scrollTop = 0
			document.documentElement.scrollTop = 0
		},
		closeEwm() {
			this.isClose = false
		}
	}
}
</script>

<style lang="scss">
	.wrap {
		width: 1300px;
		margin-left: auto;
		margin-right: auto;
		.wrap-right {
			width: 950px;
		}
		.erweima {
			position: fixed;
			top: 50%;
			right: 0;
			z-index: 9;
			text-align: center;
			font-size: 16px;
			padding: 10px;
			margin-top: -80px;
			background-color: #fff;
			border: 1px solid #ddd;
			box-shadow: 0 0 6px rgba(0,0,0,.25);
			span {
				position: absolute;
				top: 0;
				right: 0;
				color: #d00e05;
				font-size: 12px;
				font-weight: 700;
				font-family: arial;
				padding: 5px 8px;
				cursor: pointer;
			}
			img {
				display: block;
				width: 160px;
				height: 160px;
			}
		}
		.to-top-btn {
			position: fixed;
			bottom: 30px;
			right: 20px;
			z-index: 9;
			width: 44px;
			height: 44px;
			background: url(../assets/img/toTop.png) no-repeat;
			background-size: 100%;
			cursor: pointer;
		}
	}
</style>
