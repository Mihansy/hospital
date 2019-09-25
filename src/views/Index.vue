<template>
  <div class="parent wrap" id="main">
    <Left></Left>
		<div class="rightfloat wrap-right">
			<div id="rightContent">
				<!--解决路由参数变化，页面不更新的方法：增加一个不同:key值，这样vue就会识别这是不同的router-view了 -->
				<!-- <router-view :key="random"/> -->
				<router-view/> 
			</div>
		</div>
  </div>
</template>

<script>
import Left from '@/components/Left.vue'

export default {
  name: 'index',
  components: {
    Left
  },
	computed: {
		random() {
			return this.$route.path + Math.random()
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
	}
</style>
