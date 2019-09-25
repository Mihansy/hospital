<template>
	<div class="leftfloat wrap-left">
		<div class="leftblock yy-notice">
			<div class="parent title">
				<span class="leftfloat">医院公告</span>
				<router-link class="rightfloat" :to="{name:'list', params: {url:'/listPage/getNoticePage'}}">更多</router-link>
			</div>
			<ul class="notice-list layui-icon-loading">
				<li v-for="(item, index) in noticeList" :key="index">
					<!-- <a href="item.value">{{item.title}}</a> -->
					<router-link :to="{name: 'detail', params: {id: item.value}}">{{item.title}}</router-link>
				</li>
			</ul>
		</div>
		<div class="leftblock yy-department">
			<div class="parent title">
				<span class="leftfloat">科室简介</span>
			</div>
			<div class="department-list">
				<!-- <a v-for="(item, index) in departmentList" :key="index">{{item.name}}</a> -->
				<router-link 
					v-for="(item, index) in departmentList" 
					:key="index" 
					:to="{name: 'detail', params: {id: item.value}}">
					{{item.name}}
				</router-link>
			</div>
		</div>
		<div class="leftblock yy-other">
			<div class="parent title">
				<span class="leftfloat">其他</span>
			</div>
			<div class="other-list">
				<a v-for="(item, index) in otherList" :key="index">{{item.name}}</a>
			</div>
		</div>
		<div class="leftblock yy-contact">
			<div class="parent title">
				<span class="leftfloat">联系我们</span>
			</div>
			<div class="contact-address">
				<img src="../assets/img/ditu.jpg"/>
				<p>医院地址：文明中路113号/金盘路45号<br/>医院电话：36608123<br/>急诊电话：36610366<br/>政风行风热线：36608123</p>
				<p>金盘总院：坡巷路2号<br/>电话：36608122</p>
				<p>文明中分院：文明中路113号<br/>电话：33203252</p>
				<p>琼山分院：琼州大道178号<br/>电话：36337687</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'Left',
		data() {
			return {
				noticeList: [],
				departmentList: [],
				otherList: []
			}
		},
		methods: {
			getLeftData(url, len) {
				this.$http.getLeftNav(url, len).then(res => {
					if(res.data.resultCode == 0){
						if(url == 'getNoticeList'){
							this.noticeList = res.data.resultData.dataList
						}else if(url == 'getDepartmentList'){
							this.departmentList = res.data.resultData.dataList
						}else{
							this.otherList = res.data.resultData
						}
					}
				}).catch(err => {
					console.log(err)
				})
			}
		},
		mounted() {
			this.getLeftData('getNoticeList', 6)
			this.getLeftData('getDepartmentList', 26)
			this.getLeftData('getLeftMenulist')
		}
	}
</script>

<style scoped lang="scss">
	.wrap-left {
		width: 330px;
		.leftblock {
			margin-bottom: 20px;
			background: url(../assets/img/leftBlockBg.jpg) repeat;
			.title {
				height: 49px;
				line-height: 48px;
				border-bottom: 1px solid #dfdfdf;
				background: url(../assets/img/homeIcons.png) no-repeat;
				background-position: 135px -620px;
				span {
					font-size: 18px;
					font-weight: bold;
					color: #d00e05;
					padding-left: 20px;
					padding-right: 18px;
					border-bottom: 3px solid #D00E05;
				}
				a {
					color: #09f;
					margin-right: 16px;
					cursor: pointer;
				}
			}
			.notice-list {
				height: 270px;
				margin-left: 20px;
				margin-right: 16px;
				li {
					line-height: 44px;
					border-bottom: 1px dashed #dfdfdf;
					&:last-child {
						border-bottom: 0;
					}
					a {
						display: block;
						width: 98%;
						height: 44px;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
						cursor: pointer;
					}
				}
			}
			.department-list {
				clear: both;
				height: 520px;
				margin-left: 20px;
				padding-top: 10px;
			  padding-bottom: 16px;
				a {
					float: left;
					display: block;
					width: 132px;
					height: 40px;
					line-height: 40px;
					padding-left: 20px;
					background: url(../assets/img/homeIcons.png) no-repeat;
					background-position: -1068px -798px;
					cursor: pointer;
				}
			}
			.other-list {
				height: 924px;
				width: 256px;
				padding-top: 18px;
				padding-bottom: 10px;
				margin-left: auto;
				margin-right: auto;
				a {
					display: block;
					width: 100%;
					height: 70px;
					text-align: center;
					line-height: 70px;
					font-size: 28px;
					font-family: "楷体";
					font-weight: bold;
					color: #9c3d3d;
					margin-bottom: 14px;
					background-image: url(../assets/img/homeIcons.png);
					background-repeat: no-repeat;
					background-position: -7px -715px;
					cursor: pointer;
					&:hover {
						color: #000;
						background-color: #fff;
					}
				}
				span {
				  display: block;
				  width: 150px;
				  text-align: left;
				  margin-left: 70px;
				}
			}
			.contact-address {
				padding-bottom: 12px;
				margin-left: 20px;
				img {
					width: 288px;
					height: 200px;
					margin-top: 20px;
					margin-bottom: 16px;
				}
				p {
					font-size: 16px;
					margin-bottom: 10px;
				  line-height: 1.6;
				}
			}
		}
		.yy-notice {
			height: 320px;
		}
	}
</style>
