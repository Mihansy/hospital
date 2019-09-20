<template>
  <div class="parent wrap" id="main">
    <Left></Left>
		<div class="rightfloat wrap-right">
			<div id="rightContent">右侧</div>
		</div>
  </div>
</template>

<script>
import Left from '@/components/Left.vue'

export default {
  name: 'home',
  components: {
    Left
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
