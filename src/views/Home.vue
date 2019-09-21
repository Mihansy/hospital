<template>
	<div>
		<div class="rightblock yy-news">
			<img class="leftfloat newsPic" :src="newsPic">
			<div class="leftfloat newsText" id="newsText">{{newsDetail}}<a :href="newsLinkId">[查看详情]</a></div>
			<div class="rightfloat newsList">
				<div class="parent rightblock-title title">
					<span class="leftfloat">新闻中心</span>
					<a class="rightfloat" onclick="toList('/listPage/getNewsPage', '','',28, 1)">更多</a>
				</div>
				<ul class="" id="newsList" style="height:236px;">
					<li v-for="(item, index) in newsList" :key="index">
						<a :id="item.value">{{item.title}}</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="rightblock yy-specialist">
			<div class="rightblock-title"><span>专家介绍</span></div>
			<div class="specialist" style="width: 911px; height: 284px;">
				<el-carousel height="282px" class="specialist-wrap">
					<el-carousel-item v-for="(arr, index) in speciaList" :key="index">
						<a :id="item.value" v-for="item in arr" :key="item.value">
							<img :src="item.picUrl" alt="">
							<span class="name">{{item.name}}</span>
							<span class="job">{{item.rank}}</span>
						</a>
					</el-carousel-item>
				</el-carousel>
			</div>
		</div>
		<div class="parent rightblock yy-listblock">
			<div class="parent rightblock-title">
				<span class="leftfloat">科研教学</span>
				<a class="leftfloat" style="margin-left: 330px;" onclick="toList('/listPage/getModelInfoPage', '','SRT',15, 1)">更多</a><span
				 class="leftfloat">科普知识</span><a class="rightfloat" style="margin-left: 330px;" onclick="toList('/listPage/getModelInfoPage', '','HE',15, 1)">更多</a></div>
			<ul class="leftfloat rightblock-list-left" id="research">
				<li v-for="(item, index) in columnSRT" :key="index"><a :id="item.value">{{item.title}}</a></li>
			</ul>
			<ul class="rightfloat rightblock-list-right" id="health">
				<li v-for="(item, index) in columnHE" :key="index"><a :id="item.value">{{item.title}}</a></li>
			</ul>
		</div>
		<div class="parent rightblock yy-listblock">
			<div class="parent rightblock-title"><span class="leftfloat">护理园地</span><a class="leftfloat" style="margin-left: 330px;"
				 onclick="toList('/listPage/getModelInfoPage', '','NG',15, 1)">更多</a><span class="leftfloat">党建园地</span><a class="rightfloat"
				 style="margin-left: 330px;" onclick="toList('/listPage/getModelInfoPage', '','PBG',15, 1)">更多</a></div>
			<ul class="leftfloat rightblock-list-left" id="tcm">
				<li v-for="(item, index) in columnNG" :key="index"><a :id="item.value">{{item.title}}</a></li>
			</ul>
			<ul class="rightfloat rightblock-list-right" id="nurse">
				<li v-for="(item, index) in columnPBG" :key="index"><a :id="item.value">{{item.title}}</a></li>
			</ul>
		</div>
		<div class="parent rightblock yy-listblock">
			<div class="parent rightblock-title"><span class="leftfloat">医保政策</span><a class="leftfloat" style="margin-left: 330px;"
				 onclick="toList('/listPage/getModelInfoPage', '','MIP',15, 1)">更多</a><span class="leftfloat">药事管理</span><a class="rightfloat"
				 style="margin-left: 330px;" onclick="toList('/listPage/getModelInfoPage', '','PA',15, 1)">更多</a></div>
			<ul class="leftfloat rightblock-list-left" id="partyBuild">
				<li v-for="(item, index) in columnMIP" :key="index"><a :id="item.value">{{item.title}}</a></li>
			</ul>
			<ul class="rightfloat rightblock-list-right" id="medicalInsurance">
				<li v-for="(item, index) in columnPA" :key="index"><a :id="item.value">{{item.title}}</a></li>
			</ul>
		</div>
		<div class="parent rightblock yy-listblock">
			<div class="parent rightblock-title"><span class="leftfloat">政策法规</span><a class="leftfloat" style="margin-left: 330px;"
				 onclick="toList('/listPage/getModelInfoPage', '','PR',15, 1)">更多</a><span class="leftfloat">对口帮扶</span><a class="rightfloat"
				 style="margin-left: 330px;" onclick="toList('/listPage/getModelInfoPage', '','KCM',15, 1)">更多</a></div>
			<ul class="leftfloat rightblock-list-left" id="pharmaceutical">
				<li v-for="(item, index) in columnPR" :key="index"><a :id="item.value">{{item.title}}</a></li>
			</ul>
			<ul class="rightfloat rightblock-list-right" id="policy">
				<li v-for="(item, index) in columnKCM" :key="index"><a :id="item.value">{{item.title}}</a></li>
			</ul>
		</div>
		<div class="rightblock yy-other-nav">
			<div class="rightblock-title"><span>其他网站导航</span></div>
			<div class="other-nav-list" id="friendlyLink">
				<a v-for="(item, index) in FriendList" :href="item.linkUrl" target="_blank" :key="index">
					<img :src="item.picUrl">
				</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'home',
		data() {
			return {
				newsPic: '',
				newsDetail: '',
				newsLinkId: '',
				newsList: [],
				columnSRT: [],
				columnHE: [],
				columnNG: [],
				columnPBG: [],
				columnMIP: [],
				columnPA: [],
				columnPR: [],
				columnKCM: [],
				FriendList: [],
				speciaList: [],
				specialistLen: 0
			}
		},
		methods: {
			getHomeData(requestUrl, len, modelName) {
				this.$http.getHome(requestUrl, len, modelName).then(res => {
					if (res.data.resultCode == 0) {
						const data = res.data.resultData
						if (requestUrl == 'getHospitalDesc') { //医院介绍
							this.getNewsDesc(data.pictures.url, data.value, data.content)

						} else if (requestUrl == 'getNewsList') { //新闻中心
							this.newsList = data.dataList

						} else if (requestUrl == 'getModelInfoList') { //科研教学等栏目
							this.showModelList(data.dataList, modelName)

						} else if (requestUrl == 'getFriendlyLinkList') { //友情链接
							this.FriendList = data

						} else { //专家列表 'getExpertDescList'
							this.showExpertDescList(data.dataList)
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getNewsDesc(picUrl, id, content) {
				this.newsPic = picUrl
				this.newsLinkId = id
				//将&nbsp;转换为空格
				this.newsDetail = encodeURI(content)
				this.newsDetail = this.newsDetail.replace(/&nbsp;/ig, "")
				this.newsDetail = decodeURI(this.newsDetail)
				//截取字符串，添加省略号
				if (this.newsDetail.length > 166) {
					this.newsDetail = this.newsDetail.substr(0, 166) + '…';
				}
			},
			showModelList(data, modelName) {
				if (modelName == 'SRT') {
					this.columnSRT = data
				}

				if (modelName == 'HE') {
					this.columnHE = data
				}

				if (modelName == 'KCM') {
					this.columnKCM = data
				}

				if (modelName == 'NG') {
					this.columnNG = data
				}

				if (modelName == 'PBG') {
					this.columnPBG = data
				}

				if (modelName == 'MIP') {
					this.columnMIP = data
				}

				if (modelName == 'PA') {
					this.columnPA = data
				}

				if (modelName == 'PR') {
					this.columnPR = data
				}
			},
			showExpertDescList(data) {
				this.specialistLen = Math.ceil(data.length/5)
				this.speciaList = this.chunk(data, 5) //按照一定长度将数组分割，得到新的数组
				console.log(this.speciaList)
			},
			chunk(array, size) {
				//获取数组的长度，如果你传入的不是数组，那么获取到的就是undefined
				var length = array.length;
				//判断不是数组，或者size没有设置，size小于1，就返回空数组
				if (!length || !size || size < 1) {
					return []
				}
				//核心部分
				var index = 0; //用来表示切割元素的范围start
				var resIndex = 0; //用来递增表示输出数组的下标 
			
				//根据length和size算出输出数组的长度，并且创建它。
				var result = new Array(Math.ceil(length / size));
				//进行循环
				while (index < length) {
					//循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
					result[resIndex++] = array.slice(index, (index += size));
				}
				//输出新数组
				return result;
			}
		},
		mounted() {
			this.getHomeData('getHospitalDesc')
			this.getHomeData('getNewsList', 6)
			this.getHomeData('getExpertDescList', 15); //专家介绍
			this.getHomeData('getModelInfoList', 7, 'SRT'); //科研教学
			this.getHomeData('getModelInfoList', 7, 'HE');
			this.getHomeData('getModelInfoList', 7, 'NG');
			this.getHomeData('getModelInfoList', 7, 'PBG');
			this.getHomeData('getModelInfoList', 7, 'MIP');
			this.getHomeData('getModelInfoList', 7, 'PA');
			this.getHomeData('getModelInfoList', 7, 'PR');
			this.getHomeData('getModelInfoList', 7, 'KCM');
			this.getHomeData('getFriendlyLinkList'); //友情链接
		}
	}
</script>

<style lang="scss">
	.rightblock {
		width: 948px;
		margin-bottom: 20px;
		border: 1px solid #dfdfdf;
		.rightblock-title {
			height: 46px;
			line-height: 46px;
			background-color: #f7f7f7;
			border-bottom: 1px solid #dfdfdf;
			span {
				color: #D00E05;
				font-size: 18px;
				font-weight: bold;
				margin-left: 22px;
			}
			a {
				color: #09f;
				margin-right: 16px;
				cursor: pointer;
			}
		}
	}
	.yy-news {
		height: 318px;
		.newsPic {
			display: block;
			width: 320px;
			height: 281px;
			margin-top: 18px;
			margin-left: 22px;
		}
		.newsText {
			width: 280px;
			height: 288px;
			line-height: 29px;
			margin-top: 13px;
			margin-left: 22px;
			overflow: hidden;
			a {
				color: #09f;
				cursor: pointer;
			}
		}
		.newsList {
			width: 288px;
			height: 318px;
			background: url(../assets/img/homeIcons.png) no-repeat;
			background-position: -307px -508px;
			.title {
				border-bottom: 0;
				background: url(../assets/img/homeIcons.png) no-repeat;
				background-position: -1209px -862px;
				a {
					color: #09f;
					margin-right: 20px;
				}
			}
			ul {
				margin: 16px 8px 0 22px;
				li {
					line-height: 40px;
					a {
						display: block;
						width: 98%;
						height: 40px;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
						cursor: pointer;
					}
				}
			}
		}
	}
	.yy-specialist {
		height: 370px;
		.specialist {
			position: relative;
			width: 911px;
			height: 265px;
			margin: 29px auto;
			background: transparent url(../assets/img/homeIcons.png) no-repeat;
			background-position: -641px -506px;
			.specialist-wrap {
				div {
					padding-top: 20px;
					height: 220px;
					a {
						float: left;
						display: block;
						width: 18%;
						margin-left: 1%;
						margin-right: 1%;
						text-align: center;
						cursor: pointer;
						img {
							display: block;
							width: 152px;
							height: 160px;
							margin-left: auto;
							margin-right: auto;
						}
						.name {
							display: block;
							font-size: 18px;
							margin-top: 12px;
						}
						.job {
							display: block;
							height: 22px;
							overflow: hidden;
						}
					}
				}
				ul.el-carousel__indicators--horizontal {
					position: relative;
					bottom: 32px;
					left: 50%;
					display: flex;
					justify-content: center;
					li.el-carousel__indicator--horizontal {
						padding: 8px 4px;
						button.el-carousel__button {
							width: 8px;
							height: 8px;
							background-color: #999;
							border-radius: 50%;
						}
					}
				}
			}
		}
	}
	.yy-listblock {
		height: 372px;
		.rightblock-list-left {
			width: 454px;
			padding-left: 20px;
		}
		.rightblock-list-right {
			width: 453px;
			padding-left: 20px;
			border-left: 1px dashed #dfdfdf;
		}
		ul {
			height: 295px;
			padding-top: 16px;
			padding-bottom: 14px;
			li {
				line-height: 42px;
				a {
					display: block;
					width: 98%;
					height: 42px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					cursor: pointer;
				}
			}
		}
	}
	.yy-other-nav {
		height: 256px;
		.other-nav-list {
			padding-top: 26px;
			padding-left: 22px;
			a {
				display: inline-block;
				width: 150px;
				height: 42px;
				margin-right: 76px;
				margin-bottom: 20px;
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.rightblock>ul,
	.newsList>ul,
	.yy-notice>ul {
		position: relative;
	}
	.yy-listblock>ul li:hover a,
	.newsList>ul li:hover a,
	.notice-list li:hover a,
	.department-list a:hover {
		color: #d00e05;
	}
</style>
