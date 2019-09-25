<template>
	<div class="header-box">
		<div class="header">
			<a class="logo" href="index.html"></a>
		</div>
		<div class="nav">
			<ul>
				<li v-for="(item, index) in nav" :key="index" :class="{'current': currentA === index}">
					<a @click="toPage(index, item.pageType, item.value)">{{item.name}}</a>
					<!-- <router-link :to="{name: item.pageType, params:{id: item.value}}">{{item.name}}</router-link> -->
					<dl class="nav-item-child" v-if="item.childrenList">
						<dd v-for="child in item.childrenList" :key="child.value">
							<a @click="toPage(index, child.pageType, child.value)">{{child.name}}</a>
						</dd>
					</dl>
				</li>
			</ul> 
		</div>
	</div>
</template>

<script>
	export default{
		name: 'Header',
		data() {
			return {
				nav: [],
				currentA: 0
			}
		},
		methods: {
			getData() {
				this.$http.getNav().then(res => {
					if(res.data.resultCode == 0){
						this.nav = res.data.resultData
					}
				}).catch(err => {
					console.log(err)
				})
			},
			toPage(index, pageType, pageId) {
				this.currentA = index

				if(pageType !== 'listbtn'){
					if(pageType == 'home'){ //首页
						this.$router.push({
							path: '/'
						})
						
					}else if(pageType == 'list'){  //列表页
						if(pageId == 'news'){
							this.$router.push({
								name: 'list',
								params: {
									url: '/listPage/getNewsPage',
									modelName: pageId
								}
							})
							
						}else if(pageId == 'notice') {
							this.$router.push({
								name: 'list',
								params: {
									url: '/listPage/getNoticePage'
								}
							})
							
						}else if(pageId == 'export') {
							this.$router.push({
								name: 'list',
								params: {
									url: '/listPage/getAllDepartmentExpertList'
								}
							})
							
						}else{
							this.$router.push({
								name: 'list',
								params: {
									url: '/listPage/getModelInfoPage',
									modelName: pageId
								}
							})
						}
						
					}else if(pageType == 'details'){  //详情页
						if(pageId == '25803fe6a4064c21b0252c4225bc1161'){
							pageId = 'bd3964322d3f40d285de655d6a316992';
						}
						
						this.$router.push({
							name: 'detail',
							params: {
								id: pageId
							}
						})
					}
					
				}
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>

<style scoped lang="scss">
	.header-box {
		.header {
			position: relative;
			width: 100%;
			height: 173px;
			padding-top: 40px;
			background: url(../assets/img/headerbg.jpg) repeat-x;
			&:before,&:after {
				position: absolute;
				top: 0;
				content: '';
				width: 356px;
				height: 213px;
				background: url(../assets/img/homeIcons.png) no-repeat;
			}
			&:before {
				left: 0;
				background-position: 0 0;
			}
			&:after {
				right: 0;
				background-position: 0 -254px;
			}
			.logo {
				display: block;
				height: 124px;
				width: 840px;
				margin: 0 auto;
				background: url(../assets/img/homeIcons.png) no-repeat;
				background-position: 0 -872px;
			}
		}
		.nav {
			width: 100%;
			height: 60px;
			line-height: 60px;
			margin-bottom: 20px;
			background: #d00e05;
			ul {
				height: 100%;
				width: 1300px;
				margin-left: auto;
				margin-right: auto;
				li {
					position: relative;
					float: left;
					width: 100px;
					text-align: center;
					&.current {
						background: url(../assets/img/homeIcons.png) no-repeat;
						background-position: -8px -506px;
						a {
							color: #fcb103;
						}
					}
					&:hover {
						a {
							color: #fcb103;
						}
						.nav-item-child {
							display: block;
						}
					}
					a {
						color: #fff;
						font-size: 18px;
						cursor: pointer;
					}
					.nav-item-child {
						display: none;
						position: absolute;
						left: 0;
						top: 44px;
						z-index: 9;
						width: 100%;
						padding: 10px 0;
						background: #fff;
						border: 1px solid #dfdfdf;
						border-radius: 5px;
						dd {
							height: 30px;
							line-height: 30px;
							margin-left: 0;
							&:hover {
								color: #fff;
								background-color: #d00e05;
							}
							a {
								font-size: 16px;
							}
						}
					}
				}
			}
		}
	}
</style>
