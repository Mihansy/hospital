<template>
	<div class="detail-list-right">
		<h1 class="download-title">{{listTitle}}</h1>
		<ul v-if="exportList.length !== 0" class="news-list-box">
			<li v-for="(itemArr, index) in exportList" :key="index">
				<span style="color: #333;">【{{itemArr.name}}】</span>
				<div style="float: left;">
					<router-link v-for="(item,index) in itemArr.expertList" 
						:key="index" 
						:to="{name: 'detail', params: {id: item.value}}">
						{{item.name}}
					</router-link>
					<!-- <a v-for="(item,index) in itemArr.expertList" :key="index" :id="item.value">{{item.name}}</a> -->
				</div>
			</li>
		</ul>
		<ul v-else class="news-list-box">
			<li v-for="(item, index) in modelList" :key="index">
				<!-- <a :id="item.value">{{item.title}}</a> -->
				<router-link :to="{name: 'detail', params: {id: item.value}}">{{item.title}}</router-link>
				<span>{{item.createTime}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'list',
		data() {
			return {
				listTitle: '',
				pageSize: 45,
				pageNo: 1,
				modelList: [],
				exportList: []
			}
		},
		methods: {
			getData(url, modelName) {
				this.$http.getList(url, this.pageSize, this.pageNo, modelName)
				.then(res => {
					if(res.data.resultCode==0){
						if(url == '/listPage/getAllDepartmentExpertList'){
							this.listTitle = '专家介绍'
							this.exportList = res.data.resultData
						}else{
							this.modelList = res.data.resultData.dataList
							if(url == '/listPage/getNoticePage'){
								this.listTitle = '医院公告'
							}else if(url == '/listPage/getNewsPage'){
								this.listTitle = '新闻中心'
							}
							
							if(modelName == 'SRT' || modelName == 'srt'){
								this.listTitle = '科研教学'
							}
							
							if(modelName == 'HE' || modelName == 'he'){
								this.listTitle = '科普知识'
							}
							
							if(modelName == 'KCM' || modelName == 'kcm'){
								this.listTitle = '对口帮扶'
							}
							
							if(modelName == 'NG' || modelName == 'ng'){
								this.listTitle = '护理园地'
							}
							
							if(modelName == 'PBG' || modelName == 'pbg'){
								this.listTitle = '党建园地'
							}
							
							if(modelName == 'MIP' || modelName == 'mip'){
								this.listTitle = '医保政策'
							}
							
							if(modelName == 'PA' || modelName == 'pa'){
								this.listTitle = '药事管理'
							}
							
							if(modelName == 'PR' || modelName == 'pr'){
								this.listTitle = '政策法规'
							}
						}
					}
				})
				.catch(err => {
					console.log(err)
				})
			}
		},
		watch: {
			'$route' (to, from) {
				const url = this.$route.params.url
				const modelName = this.$route.params.modelName
				if(modelName){
					this.getData(url, modelName)
				}
			}
		},
		mounted() {
			const url = this.$route.params.url
			const modelName = this.$route.params.modelName
			this.getData(url, modelName)
		}
	}
</script>

<style scoped lang="scss">
	.detail-list-right {
		width: 900px;
		min-height: 700px;
		padding: 18px 24px 36px;
		border: 1px solid #f4f0d7;
		box-shadow: 0 0 8px #f9f7eb;
		.download-title {
			font-weight: 400;
			text-align: center;
			margin-bottom: 32px;
			padding-top: 16px;
			padding-bottom: 36px;
			border-bottom: 1px solid #ddd;
		}
		.news-list-box {
			position: relative;
			min-height: 600px;
			li {
				height: 50px;
				line-height: 50px;
				font-size: 16px;
				overflow: hidden;
				border-bottom: 1px solid #f1e1bd;
				a {
					float: left;
					display: block;
					max-width: 75%;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					cursor: pointer;
					&:before {
						display: block;
						float: left;
						content: '';
						width: 8px;
						height: 8px;
						margin-top: 21px;
						margin-right: 10px;
						margin-left: 4px;
						border-radius: 50%;
						background-color: #96403f;
					}
				}
				span {
					display: block;
					float: right;
					color: #999;
					margin-right: 4px;
				}
				div {
					a {
						display: inline;
						max-width: initial;
						margin: 0 10px;
					}
				}
			}
		}
	}
</style>
