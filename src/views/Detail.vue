<template>
	<div class="detail-list-right">
		<div class="article">
			<h1 class="article-title" id="articleTitle">{{article.title}}</h1>
			<div class="article-info">
				<span>海口市中医医院:{{article.hospitalWebUrl}}</span>
				<span>文字来源:{{article.author}}</span>
				<span>时间:{{article.createTime}}</span>
			</div>
			<div class="article-content" v-html="article.content">{{article.content}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'detail',
		data() {
			return {
				article: {}
			}
		},
		methods: {
			getData(id) {
				this.$http.getDetail(id).then(res => {
					if(res.data.resultCode == 0){
						this.article = res.data.resultData
					}
				}).catch(err => {
					console.log(err)
				})
			}
		},
		watch: {
			'$route' (to, from) {  //解决vue路由参数变化，页面数据不刷新问题：watch监听路由是否变化
				const id = this.$route.params.id
				if(id){  //判断传递值的变化，获取文章数据
					this.getData(id)
				}
			}
		},
		mounted() {
			const id = this.$route.params.id
			this.getData(id)
		}
	}
</script>

<style lang="scss">
	.detail-list-right {
		width: 900px;
		min-height: 700px;
		padding: 18px 24px 36px;
		border: 1px solid #f4f0d7;
		box-shadow: 0 0 8px #f9f7eb;
		.article {
			text-align: center;
			.article-title {
				line-height: 2.5;
				font-size: 24px;
				font-weight: normal;
			}
			.article-info {
				line-height: 42px;
				border-bottom: 1px solid #f1e1bd;
				span {
					font-size: 16px;
					color: #666;
					margin-left: 20px;
					margin-right: 20px;
				}
			}
			.article-content {
				position: relative;
				width: 844px;
				min-height: 700px;
				padding: 16px 24px 16px 32px;
				text-align: left;
				p {
					text-indent: 2em;
					line-height: 28px;
					margin-top: 20px;
					margin-bottom: 20px;
					img {
						margin-left: -2em;
					}
				}
			}
		}
	}
</style>
