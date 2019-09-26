<template>
	<div class="download detail-list-right">
		<h1 class="download-title">新闻搜索</h1>
		<div class="search-condition">
			<el-form ref="searchForm" :model="searchForm" :rules="rules" label-width="80px">
				<el-form-item label="类型" prop="menuType">
					<el-select v-model="searchForm.menuType" placeholder="请选择">
						<el-option 
						  v-for="(item, index) in types"
							:key="index"
							:label="item.modelName" 
							:value="item.core">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="关键字" prop="keyword">
					<el-input v-model="searchForm.keyword"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit('searchForm')">搜&nbsp;&nbsp;&nbsp;&nbsp;索</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="search-result">搜索结果：<span v-if="hasList">为空</span></div>
		<ul class="news-list-box search-list">
			<li v-for="(item, index) in searchList" :key="index">
				<a @click="toDetail(item.value)">{{item.title}}</a>
			</li>
		</ul>
		
	</div>
</template>

<script>
	export default {
		name: 'searchNews',
		data() {
			return {
				searchForm: {
					menuType: '',
					keyword: ''
				},
				rules: {
					menuType: [{
						required: true,
						message: '请选择类型',
						trigger: 'change'
					}],
					keyword: [{
						required: true,
						message: '请输入关键字',
						trigger: 'blur'
					}]
				},
				pageSize: 30,
				pageNo: 1,
				types: [],
				searchList: [],
				hasList: false
			}
		},
		methods: {
			onSubmit(formName) {
				this.$refs[formName].validate((valid) => {
					let obj = {
						"keyword": this.searchForm.keyword,
						"modularCore": this.searchForm.menuType,
						"length": this.pageSize,
						"pageNo": this.pageNo
					}
					if (valid) {
						this.$http.getSearchNews(obj)
						.then(res => {
							if(res.data.resultCode == 0){
							  this.searchList = res.data.resultData.dataList
								if(this.searchList.length == 0){
									this.hasList = true
								}else {
									this.hasList = false
								}
							}
						}).catch(err => {
							console.log(err)
						})
					}else {
						return false;
					}
				});
			},
			toDetail(id) {
				this.$router.push({
					name: 'detail',
					params: {
						id: id
					}
				})
			}
		},
		mounted() {
			this.$http.getMenuType().then(res => {
				if(res.data.resultCode == 0){
					this.types = res.data.resultData
				}
			}).catch(err => {
				console.log(err)
			})
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
		background-color: #f7f7f7;

		.download-title {
			font-weight: normal;
			text-align: center;
			margin-bottom: 32px;
			padding-top: 16px;
			padding-bottom: 36px;
			border-bottom: 1px solid #ddd;
		}

		.search-condition {
			width: 500px;
			margin: 50px auto 100px;
      form {
				.el-select>.el-input,
				.el-input__inner,
				.el-button--primary {
					width: 390px;
				}
			}
		}

		.search-result {
			padding: 0 32px 20px;
			font-size: 18px;
			font-weight: bold;
		}

		.search-list {
			padding: 0 32px;

			li {
				height: 50px;
				line-height: 50px;
				font-size: 16px;
				overflow: hidden;
				border-bottom: 1px solid #f1e1bd;

				a {
					float: left;
					display: block;
					max-width: 80%;
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
			}
		}
	}

</style>
