<template>
	<div class="download">
		<h1 class="download-title">下载专区</h1>
		<ul class="news-list-box download-list">
			<li v-for="(item, index) in downloadList" :key="index">
				<a href="javascript:;" @click="downloadFile(item.downloadUrl)">{{item.filename}}</a>
				<span>{{item.cteatedTime}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'download',
		data() {
			return {
				downloadList: [],
				pageSize: 28,
				pageNo: 1
			}
		},
		methods: {
			getData(pageSize, pageNo) {
				this.$http.getDownload(pageSize, pageNo)
				.then(res => {
					console.log(res)
					if(res.data.resultCode == 0){
						this.downloadList = res.data.resultData.dataList
					}
				}).catch(err => {
					console.log(err)
				})
			},
			downloadFile(fileUrl) {
				window.open(fileUrl)
			}
		},
		mounted() {
			this.getData(this.pageSize, this.pageNo)
		}
	}
</script>

<style lang="scss">
	.download {
	  background-color: #f7f7f7;
		width: 900px;
		min-height: 700px;
		padding: 18px 24px 36px;
		border: 1px solid #f4f0d7;
		box-shadow: 0 0 8px #f9f7eb;
		.download-title {
			font-weight: normal;
			text-align: center;
			margin-bottom: 32px;
			padding-top: 16px;
			padding-bottom: 36px;
			border-bottom: 1px solid #ddd;
		}
		.download-list {
			position: relative;
			min-height: 600px;
			li {
				height: 50px;
				line-height: 50px;
				font-size: 16px;
				overflow: hidden;
				padding-left:8px; 
				padding-right:14px;
				border-bottom: 1px solid #f1e1bd;
				a {
					float: left;
					display: block;
					max-width: 80%;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					cursor: pointer;
				}
				span {
					display: block;
					float: right;
					color: #999;
					margin-right: 4px;
				}
			}
		}
	}
</style>
